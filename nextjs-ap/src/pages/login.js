import React, { useState } from "react";
import { useRouter } from "next/router";
import { login } from "./api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(10); 
  const [showErrorMessage, setShowErrorMessage] = useState(false); 
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    const identifier = username;
    const userPassword = password;
    try {
      const response = await login(identifier, userPassword);
      console.log(response);
      if (response && response.jwt) {
        localStorage.setItem("jwt", response.jwt);
        console.log("Check login");
        router.push("/profile");
      } else {
        setLoginAttempts((prevAttempts) => prevAttempts - 1);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setLoginAttempts((prevAttempts) => prevAttempts - 1);
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="username"
            name="identifier"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {showErrorMessage && (
          <p className="text-red-500 mb-4">Invalid username or password.</p>
        )}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loginAttempts === 0}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
