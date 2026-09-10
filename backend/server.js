import dotenv from "dotenv";
import app from "./src/app.js";
import pool from "./db/config.js";

//dotenv.config();

const PORT = process.env.PORT || 3777;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);

    process.exit(1);
  }
}

startServer();
