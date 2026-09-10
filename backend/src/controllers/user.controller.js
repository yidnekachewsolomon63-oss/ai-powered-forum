import { getUsers } from "../services/user.service.js";

export async function getUsersController(req, res, next) {
  try {
    const users = await getUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfileController(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      data: {
        user_id: req.user.user_id,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function getAdminController(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      data: {
        user_id: req.user.user_id,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
