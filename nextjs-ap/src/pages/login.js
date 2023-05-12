import React, { useState } from "react";
import { useRouter } from "next/router";
import { login, API_URL } from "./api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    const identifier = username;
    const userPassword = password;
    try {
      const response = await login(identifier, userPassword);
      console.log(response);
      if (response && response.data && response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        console.log("Check login");
        router.push("/profile");
      }
    } catch (error) {
      console.log("An error occurred:", error);
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
      <button type="submit">Log in</button>
    </form>
  );
}
