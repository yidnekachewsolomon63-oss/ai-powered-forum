import React from "react";
import { timeAgo } from "../../lib/utils";
import RagAnswerBody from "../../components/RagAnswerBody/RagAnswerBody.jsx";
import ui from "../../styles/pageStates.module.css";
import styles from "./QuestionDetail.module.css";

export default function AnswerList({ answers }) {
  return (
    <section className={styles.questionDetailSection}>
      <h3 className={styles.questionDetailSectionTitle}>
        Answers ({answers.length})
      </h3>

      {answers.length === 0 && (
        <div
          className={`${ui.pageStates__message} ${ui["pageStates__message--empty"]}`}
        >
          <p>No answers yet. If you can help, post the first one below.</p>
        </div>
      )}

      <div className={styles.questionDetailAnswers}>
        {answers.map((answer) => (
          <article key={answer.id} className={styles.answerCard}>
            <div className={styles.answerCardMeta}>
              <span className={styles.answerCardAuthor}>
                {answer.author?.firstName} {answer.author?.lastName}
              </span>
              {answer.createdAt && (
                <span className={styles.answerCardTime}>
                  {timeAgo(answer.createdAt)}
                </span>
              )}
            </div>
            <div className={styles.answerCardBody}>
              <RagAnswerBody>{answer.content}</RagAnswerBody>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
