import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [editUsername, setEditUsername] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response && response.data) {
          setUser(response.data);
          setUsername(response.data.username);
          setAbout(response.data.about);
          setUserId(response.data.id);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("jwt");
        router.push("/login");
      }
    }

    fetchUser();
  }, [router]);

  const handleEditUsernameClick = () => {
    setEditUsername(true);
  };

  const handleEditAboutClick = () => {
    setEditAbout(true);
  };

  const handleSaveClick = async () => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        editUsername ? { username } : { about },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response && response.data) {
        setUser((prevUser) => ({
          ...prevUser,
          username: editUsername ? username : prevUser.username,
          about: editAbout ? about : prevUser.about,
        }));
        setEditUsername(false);
        setEditAbout(false);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setUsername(user.username);
    setAbout(user.about);
    setEditUsername(false);
    setEditAbout(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 bg-white shadow-xl rounded-md p-5">
      <h1 className="flex justify-center text-2xl font-bold mb-4">Profile</h1>
      {editUsername ? (
        <div className="mb-4">
          <label className="flex justify-center block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <p className="text-gray-700">
            Username: {username || user.username}
          </p>
        </div>
      )}
      <p className="flex justify-center text-gray-700 mb-4">Email: {user.email}</p>
      {editAbout ? (
        <div className="mb-4">
          <label className="flex justify-center block text-gray-700 text-sm font-bold mb-2">
            About
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <p className="text-gray-700">About: {about || user.about}</p>
        </div>
      )}

      {editUsername || editAbout ? (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-4 flex">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleEditUsernameClick}
    >
      Edit Username
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      onClick={handleEditAboutClick}
    >
      Edit About
    </button>
  </div>
)}
    </div>
  );
}
