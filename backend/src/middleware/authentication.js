import jwt from "jsonwebtoken";
import { UnauthenticatedError, ForbiddenError } from "../utils/errors/index.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role || "user",
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

/**
 * Route guard for admin-only endpoints updated. Must run after {@link authenticateUser}.
 */
export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    throw new ForbiddenError("Admin access required");
  }
  next();
};
