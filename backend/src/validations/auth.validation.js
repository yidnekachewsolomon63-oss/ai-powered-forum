// import { body } from "express-validator";

// export const validationRegisterInput = [
//   body("firstName")
//     .notEmpty()
//     .withMessage("First name is required")
//     .isString()
//     .withMessage("First name must be a string")
//     .isLength({ min: 3 })
//     .withMessage("First name must be at least 3 characters long"),
//   body("lastName")
//     .notEmpty()
//     .withMessage("Last name is required")
//     .isString()
//     .withMessage("Last name must be a string")
//     .isLength({ min: 3 })
//     .withMessage("Last name must be at least 3 characters long"),
//   body("email")
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("A valid email address is required")
//     .normalizeEmail(),
//   body("password")
//     .notEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),

//   validationErrorHandler,
// ];

// export const validateLoginInput = [
//   body("email")
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("A valid email address is required")
//     .normalizeEmail(),
//   body("password").notEmpty().withMessage("Password is required"),

//   validationErrorHandler,
// ];

// the new sugested
export function validateRegisterInput(data) {
  const { first_name, last_name, email, password } = data;

  if (!first_name || !last_name || !email || !password) {
    return "First name, last name, email, and password are required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return null;
}

export function validateLoginInput(data) {
  const { email, password } = data;

  if (!email || !password) {
    return "Email and password are required";
  }

  return null;
}
