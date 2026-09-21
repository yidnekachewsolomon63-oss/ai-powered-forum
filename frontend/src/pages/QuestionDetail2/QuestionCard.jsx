import React from "react";
import { User, Clock, MessageSquare, Flag } from "lucide-react";
import { timeAgo } from "../../lib/utils";
import RagAnswerBody from "../../components/RagAnswerBody/RagAnswerBody.jsx";
import styles from "./QuestionDetail.module.css";

export default function QuestionCard({
  question,
  answersCount,
  isOwnQuestion,
}) {
  return (
    <article className={styles.questionDetailCard}>
      <div className={styles.questionDetailHeader}>
        <div className={styles.questionDetailMeta}>
          <span className={styles.questionDetailMetaItem}>
            <User size={14} aria-hidden />
            {question.author?.firstName} {question.author?.lastName}
          </span>
          {question.createdAt && (
            <span className={styles.questionDetailMetaItem}>
              <Clock size={14} aria-hidden />
              {timeAgo(question.createdAt)}
            </span>
          )}
          <span className={styles.questionDetailMetaItem}>
            <MessageSquare size={14} aria-hidden />
            {answersCount} {answersCount === 1 ? "answer" : "answers"}
          </span>
        </div>

        {isOwnQuestion && (
          <span className={styles.questionDetailOwnBadge}>
            <Flag size={13} aria-hidden />
            Your question
          </span>
        )}
      </div>

      <h2 className={styles.questionDetailTitle}>{question.title}</h2>

      <div className={styles.questionDetailBody}>
        <RagAnswerBody>{question.content}</RagAnswerBody>
      </div>
    </article>
  );
}
