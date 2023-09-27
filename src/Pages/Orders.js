import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const initialOrders = [
  {
    id: "1903-653d-cved",
    name: "John Doe",
    table: "T2",
    price: "$30",
    type: "Dine-In",
    time: "11:00 am",
    status: "ongoing",
  },
  {
    id: "1547-14at-lbwh",
    name: "Jane Smith",
    table: "T5",
    price: "$25",
    type: "Takeaway",
    time: "7:00 pm",
    status: "completed",
  },
  {
    id: "8563-0j82-jopw",
    name: "Bob Johnson",
    table: "T1",
    price: "$19.32",
    type: "Takeaway",
    time: "4:30 pm",
    status: "ongoing",
  },
  {
    id: "3057-f5a2-pyrs",
    name: "Roland Donald",
    table: "T4",
    price: "$42.10",
    type: "Dine-In",
    time: "5:00 pm",
    status: "completed",
  },
];

const orderStatus = [
  { text: "preparing", value: "preparing" },
  { text: "out for delivery", value: "out for delivery" },
  { text: "delivered", value: "delivered" },
];
const OrderDetails = ({ selectedOrder, setActivePage }) => {
  const [Status, setStatus] = useState("");
  const handleChangeStatus = async (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if (Status !== "") {
      const updatedStatus = Status;

      async function updateStatus() {
        const response = await fetch(
          `https://mosho.onrender.com/api/order/${selectedOrder._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ delivery_status: updatedStatus }),
          }
        );

        const data = await response.json();
        if (data.success) {
          toast.success("Status updated successfully!");
          setActivePage("menu");
          setTimeout(() => {
            setActivePage("orders");
          }, 1);
        } else {
          toast.error(data.message);
        }

        setStatus("");
      }

      updateStatus();
    }
  }, [Status, selectedOrder]);

  return (
    <div className="h-screen w-[40%] border rounded-lg shadow-lg -my-4">
      <h1 className="text-[30px] font-bold text-center mb-2">ORDER SUMMARY</h1>
      {selectedOrder && (
        <div className="px-4">
          <div className="flex flex-row items-center justify-between">
            <p>
              <span className="text-[20px] font-bold">Order ID</span>
              <br />
              {selectedOrder._id}
            </p>
            {/* <p className="text-right">
              <span className="text-[20px] font-bold">Table</span>
              <br />
            </p> */}
          </div>
          <div className="flex flex-col mt-10 text-[20px]">
            <p className="flex flex-row items-center justify-between">
              <span> Name: </span>
              {selectedOrder.order_name}
            </p>
            <p className="flex flex-row items-center justify-between">
              <span> Time: </span>
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p className="flex flex-row items-center justify-between">
              <span> Type: </span>
              {/* {selectedOrder.type} */}
            </p>
            <p className="flex flex-row items-center justify-between">
              <span> Status: </span>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOrder.delivery_status}
                  label="Status"
                  onChange={handleChangeStatus}
                >
                  {orderStatus.map((item) => {
                    return <MenuItem value={item.value}>{item.text}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </p>
            <p className="flex flex-row items-center justify-between mt-4 text-[20px] font-bold">
              <span> Total Price: </span>₹{selectedOrder.order_price}
            </p>
            <p className="flex flex-row items-center justify-between mt-20">
              <span className="text-[20px] font-bold"> Customer Details: </span>
            </p>
            <p className="flex flex-row items-center justify-between mt-4">
              <span> Name: </span>
              {selectedOrder.customer_name}
            </p>
            <p className="flex flex-row items-center justify-between mt-4">
              <span> Phone: </span>
              {selectedOrder.contactNumber}
            </p>
            <p className="flex flex-row items-center justify-between mt-4">
              <span> Email: </span>
              {selectedOrder.customer_email}
            </p>
            <p className="flex flex-row items-center justify-between mt-4">
              <span className="text-[20px] font-bold"> Address: </span>
              {selectedOrder.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = ({ setActivePage }) => {
  const [localStatus, setLocalStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderClick, setOrderClick] = useState(false);
  const [Orders, setOrders] = useState([]);

  const filteredOrders =
    localStatus === ""
      ? Orders
      : Orders.filter((order) => order.delivery_status === localStatus);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("https://mosho.onrender.com/api/orders");
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container my-5 flex flex-row w-full">
      <div className="w-[90%] mx-auto">
        <h1 className="text-[35px] font-bold text-center mb-5">Orders</h1>
        <div className="flex flex-row justify-evenly items-center">
          <button
            onClick={() => setLocalStatus("preparing")}
            className="border py-2 px-4 text-[#ff0202] bg-gray-100 rounded-xl shadow hover:bg-gray-50"
          >
            Preparing
          </button>
          <button
            onClick={() => setLocalStatus("out for delivery")}
            className="border py-2 px-4 text-[#ff0202] bg-gray-100 rounded-xl shadow hover:bg-gray-50"
          >
            Out for Delivery
          </button>
          <button
            onClick={() => setLocalStatus("delivered")}
            className="border py-2 px-4 text-[#ff0202] bg-gray-100 rounded-xl shadow hover:bg-gray-50"
          >
            Delivered
          </button>
        </div>
        {filteredOrders.map((order, index) => (
          <div
            className={`flex flex-row items-center justify-between w-[90%] mx-auto border-2 
                            ${
                              localStatus === "ongoing"
                                ? "border-red-200"
                                : "border-green-200"
                            } 
                            my-4 p-3 rounded-xl shadow-lg cursor-pointer hover:scale-[101%] transform ease-in-out`}
            key={index}
            onClick={() => {
              handleOrderClick(order);
              setOrderClick(true);
            }}
          >
            <div className="flex flex-col items-start">
              <h1 className="text-[20px] font-bold">Order ID: {order._id} </h1>
              <span className="text-[18px]"> {order.order_name} </span>
              <span> quantity - {order.order_qty} </span>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-[20px] font-bold"> {order.order_price}₹ </h1>
              <span> {new Date(order.createdAt).toLocaleString()} </span>

              <span className="bg-blue-100 p-2 rounded-xl">
                {" "}
                {order.delivery_status}{" "}
              </span>
            </div>
          </div>
        ))}
      </div>
      {orderClick && (
        <OrderDetails
          setActivePage={setActivePage}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default Orders;
