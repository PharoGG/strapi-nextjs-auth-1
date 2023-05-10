import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "http://localhost:1337";

export async function login(username, password) {
  const { data } = await axios.post(`${API_URL}/auth/local`, {
    identifier: username,
    password,
  });

  const cookies = new Cookies();
  cookies.set("jwt", data.jwt);
}

export async function register(username, email, password) {
  const { data } = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email,
    password,
  });

  const cookies = new Cookies();
  cookies.set("jwt", data.jwt);
}

export function logout() {
  const cookies = new Cookies();
  cookies.remove("jwt");
}
