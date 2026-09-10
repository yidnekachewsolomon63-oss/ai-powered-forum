import { registerUser, loginUser } from "../services/auth.service.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../validations/auth.validation.js";

export async function registerController(req, res, next) {
  try {
    const validationError = validateRegisterInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const validationError = validateLoginInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);
    console.log("LOGIN RESULT:", result);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
