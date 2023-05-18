import React, { useState } from "react";
import { useRouter } from "next/router";
import { login } from "./api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(10); // Количество попыток
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Показывать сообщение об ошибке
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
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="username"
          name="identifier"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {showErrorMessage && <p>Invalid username or password.</p>}
      <button type="submit" disabled={loginAttempts === 0}>Log in</button>
    </form>
  );
}
