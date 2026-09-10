import pool from "../../db/config.js";

export async function createAnswer({ question_id, user_id, body }) {
  const [result] = await pool.query(
    `
    INSERT INTO answers
    (
      question_id,
      user_id,
      body,
      is_ai_generated
    )
    VALUES (?, ?, ?, FALSE)
    `,
    [question_id, user_id, body],
  );

  return result.insertId;
}

export async function getAnswersByQuestionId(questionId) {
  const [rows] = await pool.query(
    `
    SELECT
      a.answer_id,
      a.question_id,
      a.user_id,
      a.body,
      a.is_ai_generated,
      a.created_at,
      u.first_name,
      u.last_name
    FROM answers a
    LEFT JOIN users u
      ON a.user_id = u.user_id
    WHERE a.question_id = ?
    ORDER BY a.created_at ASC
    `,
    [questionId],
  );

  return rows;
}

export async function getAnswerById(answerId) {
  const [rows] = await pool.query(
    `
    SELECT
      a.answer_id,
      a.question_id,
      a.user_id,
      a.body,
      a.is_ai_generated,
      a.created_at,
      u.first_name,
      u.last_name
    FROM answers a
    LEFT JOIN users u
      ON a.user_id = u.user_id
    WHERE a.answer_id = ?
    LIMIT 1
    `,
    [answerId],
  );

  return rows[0] || null;
}

export async function updateAnswer(answerId, userId, body) {
  const [result] = await pool.query(
    `
    UPDATE answers
    SET body = ?
    WHERE answer_id = ?
      AND user_id = ?
    `,
    [body, answerId, userId],
  );

  return result;
}

export async function deleteAnswer(answerId, userId) {
  const [result] = await pool.query(
    `
    DELETE FROM answers
    WHERE answer_id = ?
      AND user_id = ?
    `,
    [answerId, userId],
  );

  return result;
}
