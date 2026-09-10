import express from "express";

import {
  getUsersController,
  getProfileController,
  getAdminController,
} from "../controllers/user.controller.js";

import authenticate from "../middleware/auth.middleware.js";

import { authorizeRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getUsersController);

router.get("/profile", authenticate, getProfileController);
router.get("/admin", authenticate, authorizeRole("admin"), getAdminController);

export default router;
