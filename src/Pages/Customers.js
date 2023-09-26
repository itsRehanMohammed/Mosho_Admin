import React, { useState } from 'react';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const users = [
        {
            id: "1903-653d-cved",
            name: 'John Doe',
            email: 'john@example.com',
            phone: '555-555-5555',
            date: '21-02-2023',
            payment: 'card'
        },
        {
            id: "1547-14at-lbwh",
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '555-555-5555',
            date: '22-02-2023',
            payment: 'upi'
        },
        {
            id: "3057-f5a2-pyrs",
            name: 'Bob Smith',
            email: 'bob@example.com',
            phone: '555-555-5555',
            date: '23-02-2023',
            payment: 'cash'
        },
    ];

    const filteredUsers = users.filter(user =>
        user.id.toString().includes(searchTerm)
    );

    return (
        <div className="ml-6 mt-2 mr-6">
            <h2 className="text-[40px] text-center font-bold mb-4">Customers</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by order ID"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="text-gray-700">
                                    <td className="px-4 py-3 border">{user.id}</td>
                                    <td className="px-4 py-3 border">{user.name}</td>
                                    <td className="px-4 py-3 border">{user.email}</td>
                                    <td className="px-4 py-3 border">{user.phone}</td>
                                    <td className="px-4 py-3 border">{user.date}</td>
                                    <td className={`px-4 py-3 border uppercase
                                     ${user.payment === 'card' && 'text-red-500'}
                                     ${user.payment === 'upi' && 'text-blue-500'}
                                     ${user.payment === 'cash' && 'text-green-500'}
                                    `}>
                                        {user.payment}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customers;
