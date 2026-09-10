import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { questionService } from "../../services/questions/question.service";
import { getApiErrorMessage } from "../../services/core/api.client";
// styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    questionService
      .getQuestions()
      .then(setQuestions)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Good to see you, {user?.first_name || "there"}.</h2>
      <p>Recent questions from the forum.</p>
      {loading && <p>Loading questions…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && questions.length === 0 && <p>No questions yet.</p>}
      <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
        {questions.map((q) => (
          <article
            key={q.question_id}
            style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}
          >
            <Link to={`/question/${q.question_id}`}>
              <h3>{q.title}</h3>
            </Link>
            <p>{q.body}</p>
            <small>
              Asked by {q.first_name} {q.last_name}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
}
