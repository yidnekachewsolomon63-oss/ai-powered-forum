import pool from "../../db/config.js";

export async function createQuestion({ user_id, title, body }) {
  const [result] = await pool.query(
    `
    INSERT INTO questions
    (
      user_id,
      title,
      body
    )
    VALUES (?, ?, ?)
    `,
    [user_id, title, body],
  );

  return result.insertId;
}

export async function getAllQuestions() {
  const [rows] = await pool.query(
    `
    SELECT
      q.question_id,
      q.title,
      q.body,
      q.created_at,
      q.updated_at,
      q.user_id,
      u.first_name,
      u.last_name
    FROM questions q
    INNER JOIN users u
      ON q.user_id = u.user_id
    ORDER BY q.created_at DESC
    `,
  );

  return rows;
}

export async function getQuestionById(questionId) {
  const [rows] = await pool.query(
    `
    SELECT
      q.question_id,
      q.title,
      q.body,
      q.created_at,
      q.updated_at,
      q.user_id,
      u.first_name,
      u.last_name
    FROM questions q
    INNER JOIN users u
      ON q.user_id = u.user_id
    WHERE q.question_id = ?
    LIMIT 1
    `,
    [questionId],
  );

  return rows[0] || null;
}

export async function updateQuestion(questionId, userId, title, body) {
  const [result] = await pool.query(
    `
    UPDATE questions
    SET
      title = ?,
      body = ?
    WHERE question_id = ?
      AND user_id = ?
    `,
    [title, body, questionId, userId],
  );

  return result;
}

export async function deleteQuestion(questionId, userId) {
  const [result] = await pool.query(
    `
    DELETE FROM questions
    WHERE question_id = ?
      AND user_id = ?
    `,
    [questionId, userId],
  );

  return result;
}

export async function deleteQuestionByAdmin(questionId) {
  const [result] = await pool.query(
    `
    DELETE FROM questions
    WHERE question_id = ?
    `,
    [questionId],
  );

  return result;
}
