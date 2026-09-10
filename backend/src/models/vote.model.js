import pool from "../../db/config.js";

export async function findQuestionVote(userId, questionId) {
  const [rows] = await pool.query(
    `
    SELECT
      vote_id,
      user_id,
      question_id,
      vote_type,
      created_at
    FROM votes
    WHERE user_id = ?
      AND question_id = ?
    LIMIT 1
    `,
    [userId, questionId],
  );

  return rows[0] || null;
}

export async function findAnswerVote(userId, answerId) {
  const [rows] = await pool.query(
    `
    SELECT
      vote_id,
      user_id,
      answer_id,
      vote_type,
      created_at
    FROM votes
    WHERE user_id = ?
      AND answer_id = ?
    LIMIT 1
    `,
    [userId, answerId],
  );

  return rows[0] || null;
}

export async function createQuestionVote({ userId, questionId, voteType }) {
  const [result] = await pool.query(
    `
    INSERT INTO votes
    (
      user_id,
      question_id,
      vote_type
    )
    VALUES (?, ?, ?)
    `,
    [userId, questionId, voteType],
  );

  return result.insertId;
}

export async function createAnswerVote({ userId, answerId, voteType }) {
  const [result] = await pool.query(
    `
    INSERT INTO votes
    (
      user_id,
      answer_id,
      vote_type
    )
    VALUES (?, ?, ?)
    `,
    [userId, answerId, voteType],
  );

  return result.insertId;
}

export async function updateVote(voteId, voteType) {
  const [result] = await pool.query(
    `
    UPDATE votes
    SET vote_type = ?
    WHERE vote_id = ?
    `,
    [voteType, voteId],
  );

  return result;
}

export async function deleteVote(voteId) {
  const [result] = await pool.query(
    `
    DELETE FROM votes
    WHERE vote_id = ?
    `,
    [voteId],
  );

  return result;
}
export async function getQuestionVoteCounts(questionId) {
  const [rows] = await pool.query(
    `
    SELECT
      SUM(vote_type = 'up') AS upvotes,
      SUM(vote_type = 'down') AS downvotes
    FROM votes
    WHERE question_id = ?
    `,
    [questionId],
  );

  return {
    upvotes: Number(rows[0].upvotes || 0),
    downvotes: Number(rows[0].downvotes || 0),
  };
}

export async function getAnswerVoteCounts(answerId) {
  const [rows] = await pool.query(
    `
    SELECT
      SUM(vote_type = 'up') AS upvotes,
      SUM(vote_type = 'down') AS downvotes
    FROM votes
    WHERE answer_id = ?
    `,
    [answerId],
  );

  return {
    upvotes: Number(rows[0].upvotes || 0),
    downvotes: Number(rows[0].downvotes || 0),
  };
}
