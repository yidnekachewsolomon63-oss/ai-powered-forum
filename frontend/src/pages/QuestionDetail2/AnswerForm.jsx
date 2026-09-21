import React from "react";
import { AlertCircle, Send, Sparkles, CheckCircle2 } from "lucide-react";
import styles from "./QuestionDetail.module.css";

const FIT_LEVEL_LABELS = {
  strong: { label: "Strong fit", className: "fitStrong" },
  partial: { label: "Partial fit", className: "fitPartial" },
  weak: { label: "Weak fit", className: "fitWeak" },
};

export default function AnswerForm({
  answerText,
  setAnswerText,
  setPostError,
  setPostSuccess,
  setFitResult,
  handlePostAnswer,
  handleCheckFit,
  isPosting,
  isFitChecking,
  postError,
  postSuccess,
  fitError,
  fitResult,
}) {
  const fitConfig = fitResult
    ? FIT_LEVEL_LABELS[fitResult.level] || FIT_LEVEL_LABELS.partial
    : null;

  return (
    <section className={styles.questionDetailSection}>
      <h3 className={styles.questionDetailSectionTitle}>Post an answer</h3>
      <form className={styles.answerForm} onSubmit={handlePostAnswer}>
        <textarea
          className={styles.answerFormTextarea}
          placeholder="Write a helpful answer (min 20 characters)… Markdown is supported."
          value={answerText}
          onChange={(e) => {
            setAnswerText(e.target.value);
            setPostError(null);
            setPostSuccess(null);
            setFitResult(null);
          }}
          rows={7}
        />

        {postError && (
          <div className={styles.answerFormError} role="alert">
            <AlertCircle size={16} aria-hidden />
            <span>{postError}</span>
          </div>
        )}

        {postSuccess && (
          <div className={styles.answerFormSuccess} role="status">
            <CheckCircle2 size={16} aria-hidden />
            <span>{postSuccess}</span>
          </div>
        )}

        {fitError && (
          <div className={styles.answerFormError} role="alert">
            <AlertCircle size={16} aria-hidden />
            <span>{fitError}</span>
          </div>
        )}

        <div className={styles.answerFormActions}>
          <button
            type="button"
            className={styles.answerFormFit}
            onClick={handleCheckFit}
            disabled={isFitChecking || isPosting}
          >
            {isFitChecking ? (
              <>
                <span className={styles.answerFormSpinner} aria-hidden />
                Checking fit…
              </>
            ) : (
              <>
                <Sparkles size={16} aria-hidden />
                Check answer fit
              </>
            )}
          </button>

          <button
            type="submit"
            className={styles.answerFormSubmit}
            disabled={isPosting || isFitChecking}
          >
            {isPosting ? "Posting…" : "Post answer"}
            {!isPosting && <Send size={16} aria-hidden />}
          </button>
        </div>
      </form>

      {fitResult && fitConfig && (
        <div
          className={`${styles.fitPanel} ${styles[fitConfig.className]}`}
          role="status"
        >
          <div className={styles.fitPanelHeader}>
            <Sparkles size={16} aria-hidden />
            <span className={styles.fitPanelLevel}>{fitConfig.label}</span>
          </div>
          {fitResult.note && (
            <p className={styles.fitPanelNote}>{fitResult.note}</p>
          )}
        </div>
      )}
    </section>
  );
}
