import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        router.push("/login");
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:1337/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("jwt");
        router.push("/login");
      }
    }

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}