import React, { useEffect, useState } from "react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch("https://mosho.onrender.com/api/users");
    const data = await response.json();
    setCustomers(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("customers", customers);
  const users = [
    {
      id: "1903-653d-cved",
      name: "John Doe",
      email: "john@example.com",
      phone: "555-555-5555",
      date: "21-02-2023",
      payment: "card",
    },
    {
      id: "1547-14at-lbwh",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "555-555-5555",
      date: "22-02-2023",
      payment: "upi",
    },
    {
      id: "3057-f5a2-pyrs",
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      date: "23-02-2023",
      payment: "cash",
    },
  ];

  const filteredUsers = customers.filter((user) => user.email.toString().includes(searchTerm));

  return (
    <div className="ml-6 mt-2 mr-6">
      <h2 className="text-[40px] text-center font-bold mb-4">Users</h2>
      <div className="mb-4">
        <input type="text" placeholder="Search by email ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="text-gray-700">
                  <td className="px-4 py-3 border">{user.role}</td>
                  <td className="px-4 py-3 border">{user.name}</td>
                  <td className="px-4 py-3 border">{user.email}</td>
                  <td className="px-4 py-3 border">
                    {" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
