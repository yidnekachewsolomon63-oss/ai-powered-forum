import { param, body } from "express-validator";
import { validationErrorHandler } from "../../../middleware/validation-handler.js";

const idParam = (name, label) => [
  param(name)
    .notEmpty()
    .withMessage(`${label} is required`)
    .isInt({ min: 1 })
    .withMessage(`${label} must be a positive integer`),
];

export const userIdParamValidation = idParam("userId", "userId");
export const questionIdParamValidation = idParam("questionId", "questionId");
export const answerIdParamValidation = idParam("answerId", "answerId");
export const documentIdParamValidation = idParam("documentId", "documentId");

export const updateUserRoleValidation = [
  ...userIdParamValidation,
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isIn(["admin", "user"])
    .withMessage('role must be either "admin" or "user"'),
  validationErrorHandler,
];

export const updateUserStatusValidation = [
  ...userIdParamValidation,
  body("isActive")
    .notEmpty()
    .withMessage("isActive is required")
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  validationErrorHandler,
];

export const deleteQuestionValidation = [
  ...questionIdParamValidation,
  validationErrorHandler,
];

export const deleteAnswerValidation = [
  ...answerIdParamValidation,
  validationErrorHandler,
];

export const deleteDocumentValidation = [
  ...documentIdParamValidation,
  validationErrorHandler,
];

export const deleteUserValidation = [
  ...userIdParamValidation,
  validationErrorHandler,
];
