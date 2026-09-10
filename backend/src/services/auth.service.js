import { findUserByEmail, createUser } from "../models/auth.model.js";

import { hashPassword, comparePassword } from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";

export async function registerUser({ first_name, last_name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const password_hash = await hashPassword(password);

  const userId = await createUser({
    first_name,
    last_name,
    email,
    password_hash,
  });

  return {
    user_id: userId,
    first_name,
    last_name,
    email,
  };
}

export async function loginUser(email, password) {
  console.log("1. Finding user...");

  const user = await findUserByEmail(email);

  console.log("2. User found:", !!user);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  console.log("3. Checking password...");

  const passwordIsValid = await comparePassword(password, user.password_hash);

  console.log("4. Password valid:", passwordIsValid);

  if (!passwordIsValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  console.log("5. Generating JWT...");

  const token = generateToken({
    user_id: user.user_id,
    role: user.role,
  });

  console.log("6. JWT generated");

  return {
    token,
    user: {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  };
}
