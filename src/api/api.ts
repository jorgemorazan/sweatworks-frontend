import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL as string;

export async function getMembers(search) {
  let params = "";
  if (search.filter && search.input) {
    params = `?${search.filter}=${search.input}`;
  }
  const response = await axios.get(`${BASE_URL}/members${params}`);
  return response.data;
}

export async function getMemberById(id: string) {
  const response = await axios.get(`${BASE_URL}/members/${id}`);
  return response.data;
}

export async function createMember(body) {
  const response = await axios.post(`${BASE_URL}/members`, body);
  return response.data;
}

export async function getInactiveMembers() {
  const response = await axios.get(`${BASE_URL}/memberships/inactive/members`);
  return response.data;
}

export async function getPlans() {
  const response = await axios.get(`${BASE_URL}/plans`);
  return response.data;
}

export async function createMembership(body) {
  const response = await axios.post(`${BASE_URL}/memberships`, body);
  return response.data;
}

export async function getActiveMembers() {
  const response = await axios.get(`${BASE_URL}/memberships/active/members`);
  console.log(response);
  return response.data;
}

export async function cancelMembership(id: string) {
  const response = await axios.patch(`${BASE_URL}/memberships/${id}/cancel`);
  return response.data;
}
