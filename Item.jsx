import React, { useEffect, useState } from "react";
import "./Item.css";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import TrustBanner from "../Banners/TrustBanner";
// import { useDispatch } from "react-redux";
// import { add } from "../../Store/cartSlice";

const Item = ({ name, desc, images, oldPrice, newPrice, id, item, state, dispatch }) => {
  const [Message, setMessage] = useState("");
  const [pincode, setpincode] = useState("");
  const [pincodeDB, setpincodeDB] = useState("");
  let { foodName } = useParams();
  const navigate = useNavigate();

  const changeQty = (id, qty) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id,
        qty,
      },
    });
  };
  const onChangeHandler = (e) => {
    setpincode(e.target.value);
  };
  useEffect(() => {
    const fetchPincodes = async () => {
      const response = await fetch("https://mosho.onrender.com/api/pincode");
      const data = await response.json();
      console.log("data", data);
      setpincodeDB(data);
    };
    fetchPincodes();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setMessage(" ");
    }, 5000);
  }, [Message]);
  return (
    <>
      {foodName === item.product_name && (
        <div>
          <div className="Item">
            <div className="product-left">
              {/* <div className="product-image-toggle ">
                <img src={images[0]} alt="" onClick={(e) => setImage(0)} />
                <img src={images[1]} alt="" onClick={(e) => setImage(1)} />
                <img src={images[0]} alt="" onClick={(e) => setImage(0)} />
                <img src={images[1]} alt="" onClick={(e) => setImage(1)} />
                <img src={images[0]} alt="" onClick={(e) => setImage(0)} />
                <img src={images[1]} alt="" onClick={(e) => setImage(1)} />
              </div> */}
              <div className="product-image">
                <img src={item.image} alt="" />
              </div>
            </div>
            <div className="product-right">
              <div className="product-name">
                <p>{item.product_name.toUpperCase()}</p>
              </div>
              <div className="product-price">
                <p className="new-price">
                  Price: <span> ₹{item.price}</span>{" "}
                </p>
              </div>
              <div className="check_location">
                {/* <label htmlFor="pincode">Check Delivery Availability</label> */}
                <input onChange={(e) => onChangeHandler(e)} value={pincode} required autoComplete="true" type="number" placeholder="Enter your pincode" className="pincode" id="pincode" name="pincode" />

                {pincodeDB.includes(pincode) ? pincode.length > 5 && <p style={{ color: "green" }}>Delivery Available</p> : pincode.length > 5 && <p style={{ color: "orangered" }}>Sorry! Delivery services is Not Available at your location.</p>}

                <p>{Message}</p>
              </div>
              <div className="product-add-to-cart">
                {state.cart.some((prod) => prod.id === item._id) ? (
                  <div
                    className="product-page-add-to-cart"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_TO_CART",
                        payload: item,
                      })
                    }
                  >
                    {" "}
                    <span>
                      <ShoppingCartOutlinedIcon />
                    </span>{" "}
                    Remove from cart
                  </div>
                ) : (
                  <div
                    className="product-page-add-to-cart"
                    onClick={() =>
                      pincode.length > 5 && pincodeDB.includes(pincode)
                        ? localStorage.getItem("token")
                          ? dispatch({
                              type: "ADD_TO_CART",
                              payload: {
                                id: item._id,
                                name: item.product_name,
                                price: item.price,
                                image: item.image,
                                qty: 1,
                              },
                            })
                          : toast.error("Please Login first") &&
                            setTimeout(() => {
                              navigate("/login");
                            }, 1000)
                        : toast.error("Please check your location first")
                    }
                  >
                    {" "}
                    <span>
                      <ShoppingCartOutlinedIcon />
                    </span>{" "}
                    Add to cart
                  </div>
                )}
              </div>
              <div className="product-description">
                <h2>PRODUCT DESCRIPTION</h2>
                <p className="desc">{item.description}</p>
              </div>
            </div>
          </div>
          {/* <TrustBanner /> */}
        </div>
      )}
    </>
  );
};

export default Item;
