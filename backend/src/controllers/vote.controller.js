import {
  voteOnQuestion,
  voteOnAnswer,
  removeQuestionVote,
  removeAnswerVote,
} from "../services/vote.service.js";

import { validateVoteInput } from "../validations/vote.validation.js";

export async function voteQuestionController(req, res, next) {
  try {
    const validationError = validateVoteInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const questionId = Number(req.params.questionId);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const counts = await voteOnQuestion({
      userId: req.user.user_id,
      questionId,
      voteType: req.body.vote_type,
    });

    res.status(200).json({
      success: true,
      message: "Question vote recorded successfully",
      data: counts,
    });
  } catch (error) {
    next(error);
  }
}
// Answer vote controller
export async function voteAnswerController(req, res, next) {
  try {
    const validationError = validateVoteInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const answerId = Number(req.params.answerId);

    if (!Number.isInteger(answerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer ID",
      });
    }

    const counts = await voteOnAnswer({
      userId: req.user.user_id,
      answerId,
      voteType: req.body.vote_type,
    });

    res.status(200).json({
      success: true,
      message: "Answer vote recorded successfully",
      data: counts,
    });
  } catch (error) {
    next(error);
  }
}
//delete vote controllers
export async function removeQuestionVoteController(req, res, next) {
  try {
    const questionId = Number(req.params.questionId);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const counts = await removeQuestionVote({
      userId: req.user.user_id,
      questionId,
    });

    res.status(200).json({
      success: true,
      message: "Question vote removed successfully",
      data: counts,
    });
  } catch (error) {
    next(error);
  }
}

// remove answer vote Controller
export async function removeAnswerVoteController(req, res, next) {
  try {
    const answerId = Number(req.params.answerId);

    if (!Number.isInteger(answerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer ID",
      });
    }

    const counts = await removeAnswerVote({
      userId: req.user.user_id,
      answerId,
    });

    res.status(200).json({
      success: true,
      message: "Answer vote removed successfully",
      data: counts,
    });
  } catch (error) {
    next(error);
  }
}