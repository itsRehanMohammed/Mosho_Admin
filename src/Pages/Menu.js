import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
const initialDishes = [
  {
    name: "Classic Burger",
    image: "/assets/burger.jpeg",
    price: "$14.99",
    description: "Delicious classic burgers made fresh daily.",
    category: "italian",
  },
  {
    name: "Margherita Pizza",
    image: "/assets/pizza.jpeg",
    price: "$9.99",
    description: "Crispy margherita pizza served with garlic aioli.",
    category: "chinese",
  },
  {
    name: "Caesar Salad",
    image: "/assets/salad.jpeg",
    price: "$18.99",
    description: "Healthy Caesar salad served with fresh veggies.",
    category: "indian",
  },
];

const initialCategories = ["Veg", "Non Veg", "Chinese"];

const Menu = () => {
  const [dishId, setdishId] = useState("");

  const [dishes, setDishes] = useState(initialDishes);
  const [categories, setCategories] = useState(initialCategories);
  const [allDishes, setAllDishes] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newDishMode, setNewDishMode] = useState(false);

  const handleEdit = async (index, dish) => {
    setSelectedDish(dish);
    setDishName(dish.product_name);
    setDishPrice(dish.price);
    setDishDescription(dish.description);
    setEditMode(true);
    setdishId(dish._id);
  };

  const handleSave = async (dish) => {
    const form_data = new FormData();
    form_data.append("product_name", dishName);
    form_data.append("price", dishPrice);
    form_data.append("description", dishDescription);
    const response = await fetch(`https://mosho.onrender.com/api/product/${dish}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: form_data,
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Product Updated successfully!");
    } else {
      toast.error(data.message);
    }
    setSelectedDish(null);
    setEditMode(false);
    setDishName("");
    setDishPrice("");
    setDishDescription("");
    setdishId("");
  };

  const handleNewDish = () => {
    setNewDishMode(true);
  };
  const [productFields, setproductFields] = useState({
    product_name: "",
    price: "",
    description: "",
    isPopularproduct: false, // Initialize isPopularproduct with false
    coupon_code: "MOSHO20",
    category: "",
  });
  const [image, setimage] = useState("");

  const onChangeHandler = (e) => {
    setproductFields({ ...productFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { product_name, price, description, isPopularproduct, coupon_code, category } = productFields;

    const form_data = new FormData();
    form_data.append("product_name", product_name);
    form_data.append("price", price);
    form_data.append("image", image);
    form_data.append("description", description);
    form_data.append("category", category);
    form_data.append("isPopularproduct", isPopularproduct);
    form_data.append("coupon_code", coupon_code);
    const response = await fetch("https://mosho.onrender.com/api/addProduct", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form_data,
    });
    const data = await response.json();
    if (data.message) {
      toast.error(data.message);
    } else {
      setproductFields({ product_name: "", price: "", description: "", coupon_code: "MOSHO20", category: "" });
      toast.success("New product Added Successfully!");
      setNewDishMode(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const newDish = {
      name: dishName,
      image: `/assets/${dishName}.jpeg`,
      price: dishPrice,
      description: dishDescription,
      category: selectedCategory,
    };
    setDishes([...dishes, newDish]);
    setNewDishMode(false);
    setDishName("");
    setDishPrice("");
    setDishDescription("");
    setSelectedCategory("");
    if (categories.includes(newDish.category)) {
      return null;
    } else {
      setCategories([...categories, newDish.category]);
    }
  };
  const deleteProduct = async (dish) => {
    const response = await fetch(`https://mosho.onrender.com/api/product/${dish._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Product deleted successfully!");
    } else {
      toast.error(data.message);
    }
  };
  const [category, setCategory] = useState("");

  const [menu, setMenu] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch("https://mosho.onrender.com/api/products");
    const data = await response.json();
    setMenu(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [menu]);

  const filteredDishes = menu.filter((dishes) => dishes.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="ml-6">
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[40px] font-extrabold text-gray-900">Our Menu</h2>
          <Button variant="primary" onClick={handleNewDish}>
            + Add New Dish
          </Button>
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <button onClick={() => setAllDishes(true)} className="border py-2 px-4 text-[#ff0202] bg-gray-100 rounded-xl shadow hover:bg-gray-50">
            All
          </button>
          {categories.map((data, index) => (
            <button
              key={index}
              onClick={() => {
                setCategory(data);
                setAllDishes(false);
              }}
              className="border py-2 px-4 text-[#ff0202] bg-gray-100 rounded-xl shadow hover:bg-gray-50"
            >
              {data}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {allDishes
            ? menu.map((dish, index) => (
                <div key={dish._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={dish.image} alt={dish.product_name} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{dish.product_name}</h3>
                        <span className="text-lg font-medium text-gray-900">₹{dish.price}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-500">{dish.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="primary" onClick={() => handleEdit(index, dish)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => deleteProduct(dish)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : filteredDishes.map((dish, index) => (
                <div key={dish._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={dish.image} alt={dish.name} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{dish.name}</h3>
                        <span className="text-lg font-medium text-gray-900">{dish.price}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-500">{dish.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="primary" onClick={() => handleEdit(index, dish)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => deleteProduct(dish)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          {newDishMode ? (
            <div>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[30rem] mt-20 mx-auto">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex justify-end text-left mt-5 mr-5">
                      <button className="text-[#FF0202] font-bold text-2xl" onClick={() => setNewDishMode(false)}>
                        x
                      </button>
                    </div>
                    <h1 className="text-center text-[30px] uppercase">Add a Dish</h1>
                    <div className="relative w-full p-5">
                      <Form className="p-4" onSubmit={handleSubmit}>
                        <Form.Group className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Add a Category</Form.Label>
                          {/* <Form.Control type="text" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-black shadow-lg p-1" /> */}
                          <Form.Control type="text" name="category" value={productFields.category} onChange={onChangeHandler} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                        <Form.Group controlId="formIsPopularProduct" className="my-4 text-[18px] font-bold">
                          <Form.Check
                            type="checkbox"
                            label="Top Pick"
                            name="isPopularproduct"
                            checked={productFields.isPopularproduct}
                            onChange={(e) =>
                              setproductFields({
                                ...productFields,
                                isPopularproduct: e.target.checked,
                              })
                            }
                          />
                        </Form.Group>

                        <Form.Group className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Name</Form.Label>
                          <Form.Control type="text" name="product_name" value={productFields.product_name} onChange={onChangeHandler} className="border border-black shadow-lg p-1" />
                        </Form.Group>

                        <Form.Group className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Price</Form.Label>
                          <Form.Control type="text" name="price" value={productFields.price} onChange={onChangeHandler} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                        <Form.Group className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Coupon Code</Form.Label>
                          <Form.Control type="text" optional={true} name="coupon_code" value={productFields.coupon_code} onChange={onChangeHandler} className="border border-black shadow-lg p-1" />
                        </Form.Group>

                        <div className="image_link">
                          <label style={{ marginBottom: "6px" }} htmlFor="input-image">
                            Image*
                          </label>
                          <TextField onChange={(e) => setimage(e.target.files[0])} required autoComplete="true" className="input-image" id="input-image" name="image" type="file" />
                        </div>
                        <Form.Group className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Description</Form.Label>
                          <Form.Control as="textarea" rows={3} name="description" value={productFields.description} onChange={onChangeHandler} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Create
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          ) : null}
          {editMode ? (
            <div>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[30rem] my-6 mx-auto">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex justify-end text-left mt-5 mr-5">
                      <button className="text-[#FF0202] font-bold text-2xl" onClick={() => setEditMode(false)}>
                        x
                      </button>
                    </div>
                    <h1 className="text-center text-[30px] uppercase">Edit Dish</h1>
                    <div className="relative w-full p-10">
                      <Form>
                        <Form.Group controlId="formDishName" className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Dish Name:</Form.Label>
                          <Form.Control type="text" placeholder="Enter dish name" value={dishName} onChange={(e) => setDishName(e.target.value)} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                        <Form.Group controlId="formDishPrice" className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Dish Price:</Form.Label>
                          <Form.Control type="text" placeholder="Enter dish price" value={dishPrice} onChange={(e) => setDishPrice(e.target.value)} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                        <Form.Group controlId="formDishDescription" className="flex flex-col mb-2">
                          <Form.Label className="text-[18px] font-bold">Dish Description:</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter dish description" value={dishDescription} onChange={(e) => setDishDescription(e.target.value)} className="border border-black shadow-lg p-1" />
                        </Form.Group>
                      </Form>
                      <div className="flex flex-row items-center justify-around w-full">
                        <Button variant="secondary" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleSave(dishId)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Menu;
