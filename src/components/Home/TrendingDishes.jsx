import React from "react";

const dishes = [
  {
    img: "/assets/burger.jpeg",
    name: "Classic Burger",
    orders: 50,
  },
  {
    img: "/assets/pizza.jpeg",
    name: "Margherita Pizza",
    orders: 42,
  },
  {
    img: "/assets/chicken-wings.jpeg",
    name: "Spicy Chicken Wings",
    orders: 36,
  },
  {
    img: "/assets/salad.jpeg",
    name: "Caesar Salad",
    orders: 28,
  },
  {
    img: "/assets/fries.jpeg",
    name: "Cheese Fries",
    orders: 22,
  },
];

const TrendingDishes = () => {
  return (
    <div className="bg-white rounded-md shadow-lg p-6 mt-2">
      <div className="flex flex-row justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Trending Dishes</h3>
        <button>View All</button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <li key={dish.name} className="flex flex-row items-center mb-4 mr-8">
            <span className="w-4 h-4 rounded-full mr-2 bg-[#ff020294]" />
            <img src={dish.img} alt="food" width="80px" height="50px" />
            <div className="flex flex-col items-start ml-2">
              <span className="text-[20px]">{dish.name}</span>
              <h2>
                Orders:
                <span className="text-gray-500 font-medium ml-5">
                  {dish.orders}
                </span>
              </h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingDishes;
