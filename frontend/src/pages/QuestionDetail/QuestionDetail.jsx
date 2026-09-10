import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { questionService } from '../../services/questions/question.service';
import { answerService } from '../../services/answers/answer.service';
import { voteService } from '../../services/votes/vote.service';
import { aiService } from '../../services/ai/ai.service';
import { useAuth } from '../../contexts/AuthContext';
import { getApiErrorMessage } from '../../services/core/api.client';

export default function QuestionDetail() {
  const { id } = useParams(); const { user } = useAuth();
  const [question, setQuestion] = useState(null); const [answers, setAnswers] = useState([]);
  const [body, setBody] = useState(''); const [ai, setAi] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function load() { const [q, a] = await Promise.all([questionService.getQuestion(id), answerService.getAnswers(id)]); setQuestion(q); setAnswers(a); }
  useEffect(() => { load().catch(e => setError(getApiErrorMessage(e))); }, [id]);
  async function addAnswer(e) { e.preventDefault(); if (body.trim().length < 2) return; setBusy(true); try { await answerService.createAnswer(id, body.trim()); setBody(''); await load(); } catch(e) { setError(getApiErrorMessage(e)); } finally { setBusy(false); } }
  async function vote(vote_type) { try { await voteService.voteQuestion(id, vote_type); } catch(e) { setError(getApiErrorMessage(e)); } }
  async function ask() { setBusy(true); try { setAi(await aiService.askAI('Explain this forum question and suggest a useful answer.', `${question?.title}\n${question?.body}`)); } catch(e) { setError(getApiErrorMessage(e)); } finally { setBusy(false); } }
  if (!question) return <p>{error || 'Loading…'}</p>;
  return <section style={{ maxWidth: 900 }}>
    <h1>{question.title}</h1><p>{question.body}</p><small>Asked by {question.first_name} {question.last_name}</small>
    <div style={{ display:'flex', gap:8, margin:'16px 0' }}><button onClick={() => vote('up')}>👍 Upvote</button><button onClick={() => vote('down')}>👎 Downvote</button><button onClick={ask} disabled={busy}>Ask AI</button></div>
    {ai && <div style={{ padding:16, border:'1px solid #ddd', borderRadius:10, whiteSpace:'pre-wrap' }}><strong>AI answer</strong><p>{ai}</p></div>}
    {error && <p role='alert'>{error}</p>}
    <h2>Answers ({answers.length})</h2>
    {answers.map(a => <article key={a.answer_id} style={{ padding:'16px 0', borderTop:'1px solid #ddd' }}><p>{a.body}</p><small>{a.first_name} {a.last_name}</small></article>)}
    <form onSubmit={addAnswer} style={{ display:'grid', gap:10, marginTop:20 }}><textarea rows={6} value={body} onChange={e=>setBody(e.target.value)} placeholder='Write an answer…' required/><button disabled={busy || !user}>{busy ? 'Saving…' : 'Post answer'}</button></form>
  </section>;
}
