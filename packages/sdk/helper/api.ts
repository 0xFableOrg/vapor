import axios from "axios";

export async function post<T>(url: string, body?: any) {
  const res = await axios.post<T>(url, body);
  return res;
}

export async function get<T>(url: string) {
  const res = await axios.get<T>(url);
  return res;
}
