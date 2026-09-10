import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
// import questionRouter from "./routes/question.routes.js";
// import answerRouter from "./routes/answer.routes.js";
// import voteRouter from "./routes/vote.routes.js";
// import aiRoutes from "./routes/ai.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// ================================
// Global Middleware
// ================================

app.use(cors());

app.use(express.json());

// ================================
// Health Check
// ================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Forum API is running",
  });
});

// ================================
// API Routes
// ================================

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
// app.use("/api/questions", questionRouter);
// app.use("/api/answers", answerRouter);
// app.use("/api/votes", voteRouter);
// app.use("/api/ai", aiRoutes);

// ================================
// Error Handler
// ================================

app.use(errorHandler);

export default app;
