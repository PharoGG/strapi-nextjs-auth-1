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
      <nav>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Log out
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;