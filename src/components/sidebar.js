import React from 'react';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white p-6">
    <h2 className="text-2xl font-bold mb-6">CMS Sidebar</h2>
    <ul>
      <li className="mb-2"><a href="#" className="hover:underline">Dashboard</a></li>
      <li className="mb-2"><a href="#" className="hover:underline">Posts</a></li>
      <li className="mb-2"><a href="#" className="hover:underline">Settings</a></li>
    </ul>
  </div>
);

export default Sidebar;