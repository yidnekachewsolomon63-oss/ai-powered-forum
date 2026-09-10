import pool from "../../db/config.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT
      user_id,
      first_name,
      last_name,
      email,
      password_hash,
      role,
      created_at
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email],
  );

  return rows[0] || null;
}

export async function createUser({
  first_name,
  last_name,
  email,
  password_hash,
}) {
  const [result] = await pool.query(
    `
    INSERT INTO users
    (
      first_name,
      last_name,
      email,
      password_hash
    )
    VALUES (?, ?, ?, ?)
    `,
    [first_name, last_name, email, password_hash],
  );

  return result.insertId;
}
