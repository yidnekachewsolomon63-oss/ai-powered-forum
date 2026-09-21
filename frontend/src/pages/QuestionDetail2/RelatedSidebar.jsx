import React from "react";
import { Link } from "react-router-dom";
import styles from "./QuestionDetail.module.css";

export default function RelatedSidebar({ relatedQuestions }) {
  if (!relatedQuestions || relatedQuestions.length === 0) return null;

  return (
    <aside className={styles.relatedSidebar}>
      <h3 className={styles.relatedSidebarTitle}>Related Questions</h3>
      <ul className={styles.relatedSidebarList}>
        {relatedQuestions.map((item) => (
          <li key={item.id || item.hash} className={styles.relatedSidebarItem}>
            <Link
              to={`/questions/${item.hash || item.id}`}
              className={styles.relatedSidebarLink}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
