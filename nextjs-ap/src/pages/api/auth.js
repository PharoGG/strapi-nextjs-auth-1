import axios from "axios";
import Cookies from "universal-cookie";

export const API_URL = "http://localhost:1337";

export async function login(identifier, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/local`, {
    identifier,
    password,
  });

  const cookies = new Cookies();
  cookies.set("jwt", data.jwt);

  return data;
}

export async function register(username, email, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/local/register`, {
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
