import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let isAuthenticated = false;
  if (typeof window !== "undefined") {
    isAuthenticated = !!localStorage.getItem("jwt");
  }

  async function handleLogout(event) {
    event.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    router.push("/");
  }

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-100 p-4">
        <div>
          <Link href="/">
            <div className="text-2xl font-bold">Home</div>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/profile">
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      <div className="sr-only">Profile</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    href="#"
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Log out
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Log in
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Register
                    </div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
