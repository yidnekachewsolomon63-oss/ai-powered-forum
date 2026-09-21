import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { userQuestionDetail } from "./userQuestionDetail";
import QuestionCard from "./QuestionCard";
import AnswerList from "./AnswerList";
import AnswerForm from "./AnswerForm";
import RelatedSidebar from "./RelatedSidebar";
import ui from "../../styles/pageStates.module.css";
import styles from "./QuestionDetail.module.css";

export default function QuestionDetail() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
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
  } = userQuestionDetail(user);

  return (
    <div className={styles.questionDetailLayoutContainer}>
      <div className={styles.questionDetailMainColumn}>
        <button
          type="button"
          className={styles.questionDetailBack}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={16} aria-hidden />
          Back to questions
        </button>

        {isLoading && (
          <div
            className={`${ui.pageStates__message} ${ui["pageStates__message--loading"]}`}
            role="status"
          >
            <div className={styles.questionDetailSpinner} aria-hidden />
            Loading thread…
          </div>
        )}

        {!isLoading && error && (
          <div
            className={`${ui.pageStates__message} ${ui["pageStates__message--error"]}`}
            role="alert"
          >
            <div className={styles.questionDetailErrorInner}>
              <AlertCircle size={18} aria-hidden />
              <span>{error}</span>
            </div>
          </div>
        )}

        {!isLoading && !error && question && (
          <>
            <QuestionCard
              question={question}
              answersCount={answers.length}
              isOwnQuestion={isOwnQuestion}
            />

            <AnswerList answers={answers} />

            {!isOwnQuestion ? (
              <AnswerForm
                answerText={answerText}
                setAnswerText={setAnswerText}
                setPostError={() => {}}
                setPostSuccess={() => {}}
                setFitResult={() => {}}
                handlePostAnswer={handlePostAnswer}
                handleCheckFit={handleCheckFit}
                isPosting={isPosting}
                isFitChecking={isFitChecking}
                postError={postError}
                postSuccess={postSuccess}
                fitError={fitError}
                fitResult={fitResult}
              />
            ) : (
              <div
                className={`${ui.pageStates__message} ${ui["pageStates__message--empty"]}`}
              >
                <p>This is your question — you can't answer your own thread.</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.questionDetailSidebarColumn}>
        <RelatedSidebar relatedQuestions={relatedQuestions} />
      </div>
    </div>
  );
}
