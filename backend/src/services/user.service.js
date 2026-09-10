import { getAllUsers } from "../models/user.model.js";

export async function getUsers() {
  const users = await getAllUsers();

  return users;
}
