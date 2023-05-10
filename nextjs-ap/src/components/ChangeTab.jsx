import React, { useState } from "react";

function ChangeTab() {
  const [activeTab, setActiveTab] = useState("sign-up");

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-white shadow-md rounded-md">
      <div className="flex justify-between bg-gray-300">
        <div
          onClick={() => handleTabClick("sign-up")}
          className={`w-1/2 py-2 text-center cursor-pointer ${
            activeTab === "sign-up" ? "bg-white text-black" : "bg-gray-300 text-gray-500"
          }`}
        >
          Sign Up
        </div>
        <div
          onClick={() => handleTabClick("sign-in")}
          className={`w-1/2 py-2 text-center cursor-pointer ${
            activeTab === "sign-in" ? "bg-white text-black" : "bg-gray-300 text-gray-500"
          }`}
        >
          Sign In
        </div>
      </div>
      <div className="p-4">
        {activeTab === "sign-up" && (
          <form>
            <div className="form-element mb-4">
              <input type="text" placeholder="Email" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>
            <div className="form-element mb-4">
              <input type="text" placeholder="Username" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>
            <div className="form-element mb-4">
              <input type="password" placeholder="Password" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>
            <div className="form-element mb-4">
              <input type="password" placeholder="Confirm password" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>
            <div className="form-element">
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
            </div>
          </form>
        )}
        {activeTab === "sign-in" && (
          <form>
            <div className="form-element mb-4">
              <input type="text" placeholder="Email / Username" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>                
            <div className="form-element mb-4">
              <input type="password" placeholder="Password" className="w-full p-2 border rounded-lg bg-gray-100 border-gray-600" />
            </div>         
            <div className="form-element mb-4">
              <input type="checkbox" className="mr-2" />
              <label htmlFor="remember_me">Remember me</label>
            </div>       
            <div className="form-element">
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Sign In</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default ChangeTab;

