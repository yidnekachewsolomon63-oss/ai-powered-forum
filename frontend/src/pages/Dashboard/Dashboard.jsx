import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { questionService } from '../../services/questions/question.service';
import { getApiErrorMessage } from '../../services/core/api.client';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();

  const firstName = user?.firstName?.trim();

  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('keyword');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const welcomeLine = firstName
    ? `Good to see you, ${firstName}.`
    : 'Welcome to the forum.';

  const loadQuestions = async (query = '', mode = 'keyword') => {
    setIsLoading(true);
    setError('');

    try {
      let results;

      if (!query.trim()) {
        results = await questionService.getQuestions();
      } else if (mode === 'keyword') {
        results = await questionService.getQuestions({
          search: query.trim(),
        });
      } else {
        results = await questionService.searchQuestionsSemantic(
          query.trim()
        );
      }

      setQuestions(results || []);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (searchMode === 'semantic' && query.length < 5) {
      setError('Semantic search requires at least 5 characters.');
      return;
    }

    loadQuestions(query, searchMode);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadQuestions();
  };

  const formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString();
  };

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h2>{welcomeLine}</h2>
        <p>Recent questions from the forum.</p>
      </header>

      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchRow}>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search questions..."
            aria-label="Search questions"
          />

          <button type="submit">Search</button>

          {searchQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </div>

        <div className={styles.searchModes}>
          <label>
            <input
              type="radio"
              name="searchMode"
              value="keyword"
              checked={searchMode === 'keyword'}
              onChange={() => setSearchMode('keyword')}
            />
            Keyword
          </label>

          <label>
            <input
              type="radio"
              name="searchMode"
              value="semantic"
              checked={searchMode === 'semantic'}
              onChange={() => setSearchMode('semantic')}
            />
            Semantic
          </label>
        </div>
      </form>

      {isLoading && (
        <div className={styles.state} role="status">
          <div className={styles.spinner}></div>
          <p>Loading questions...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className={styles.error} role="alert">
          <strong>Something went wrong.</strong>
          <p>{error}</p>
          <button onClick={() => loadQuestions(searchQuery, searchMode)}>
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && questions.length === 0 && (
        <div className={styles.empty}>
          <h3>No questions found</h3>
          <p>
            {searchQuery
              ? 'Try a different search term.'
              : 'There are no questions yet.'}
          </p>
        </div>
      )}

      {!isLoading && !error && questions.length > 0 && (
        <section className={styles.questionList}>
          {questions.map((question) => (
            <article
              key={question.questionHash || question.id}
              className={styles.questionCard}
            >
              <Link
                to={`/question/${question.questionHash || question.id}`}
                className={styles.questionTitle}
              >
                <h3>{question.title}</h3>
              </Link>

              <p className={styles.questionContent}>
                {question.content}
              </p>

              <div className={styles.questionMeta}>
                <span>
                  Asked by{' '}
                  {question.author
                    ? `${question.author.firstName} ${question.author.lastName}`
                    : 'Unknown'}
                </span>

                <span>
                  {question.answerCount ?? 0}{' '}
                  {question.answerCount === 1 ? 'answer' : 'answers'}
                </span>

                <span>{formatDate(question.createdAt)}</span>

                {question.score !== undefined && (
                  <span>
                    Score: {Number(question.score).toFixed(2)}
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}