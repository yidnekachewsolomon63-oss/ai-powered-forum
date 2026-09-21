import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { questionService } from "../../services/question/question.service.js";
import { answerService } from "../../services/answer/answer.service.js";
import { timeAgo, isAuthoredByUser, getErrorMessage } from "../../lib/utils";

export const userQuestionDetail = (user) => {
  const { questionHash } = useParams(); // Extracted directly here
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answerText, setAnswerText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);

  const [isFitChecking, setIsFitChecking] = useState(false);
  const [fitResult, setFitResult] = useState(null);
  const [fitError, setFitError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!questionHash) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await questionService.getSingleQuestion(questionHash);
        if (!mounted) return;
        setQuestion(result.question || null);
        setAnswers(result.answers || []);
        setRelatedQuestions(result.relatedQuestions || []);
      } catch (err) {
        if (mounted)
          setError(getErrorMessage(err, "Failed to load the question."));
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [questionHash]);

  const isOwnQuestion = isAuthoredByUser(question, user);

  const handleCheckFit = async () => {
    const trimmed = answerText.trim();
    if (trimmed.length < 20) {
      setFitError("Answer must be at least 20 characters before checking fit.");
      return;
    }
    setFitError(null);
    setFitResult(null);
    setIsFitChecking(true);
    try {
      const result = await questionService.assessAnswerFit(
        questionHash,
        trimmed,
      );
      setFitResult(result.data);
    } catch (err) {
      setFitError(
        getErrorMessage(err, "AI fit check is unavailable right now."),
      );
    } finally {
      setIsFitChecking(false);
    }
  };

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    const trimmed = answerText.trim();
    if (trimmed.length < 20) {
      setPostError("Answer must be at least 20 characters long.");
      return;
    }

    setPostError(null);
    setPostSuccess(null);
    setIsPosting(true);
    try {
      const result = await answerService.postAnswer(question.id, trimmed);
      setAnswers((prev) => [...prev, result.data]);
      setAnswerText("");
      setPostSuccess("Answer posted successfully.");
      setFitResult(null);
    } catch (err) {
      setPostError(getErrorMessage(err, "Failed to post the answer."));
    } finally {
      setIsPosting(false);
    }
  };

  return {
    question,
    answers,
    relatedQuestions,
    isLoading,
    error,
    isOwnQuestion,
    answerText,
    setAnswerText,
    isPosting,
    postError,
    postSuccess,
    isFitChecking,
    fitResult,
    fitError,
    handleCheckFit,
    handlePostAnswer,
  };
};
