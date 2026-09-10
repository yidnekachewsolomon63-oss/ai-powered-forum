// user Model
// user model
import pool from "../../db/config.js";

export async function getAllUsers() {
  const [rows] = await pool.query(`
    SELECT
      user_id,
      first_name,
      last_name,
      email,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return rows;
}
