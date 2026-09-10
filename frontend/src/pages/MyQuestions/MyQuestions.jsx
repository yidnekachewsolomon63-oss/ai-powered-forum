import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { questionService } from '../../services/questions/question.service';

export default function MyQuestions() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  useEffect(() => { questionService.getQuestions().then(all => setQuestions(all.filter(q => q.user_id === user?.user_id))); }, [user]);
  return <section><h2>Your topics</h2>{questions.length === 0 ? <p>You have not posted any questions yet.</p> : questions.map(q => <article key={q.question_id}><Link to={`/question/${q.question_id}`}><h3>{q.title}</h3></Link><p>{q.body}</p></article>)}</section>;
}
