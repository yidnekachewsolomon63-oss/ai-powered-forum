import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionService } from '../../services/questions/question.service';
import { getApiErrorMessage } from '../../services/core/api.client';

export default function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError('');
    if (title.trim().length < 5) return setError('Title must be at least 5 characters.');
    if (body.trim().length < 10) return setError('Question body must be at least 10 characters.');
    setSaving(true);
    try { const q = await questionService.createQuestion({ title: title.trim(), body: body.trim() }); navigate(`/question/${q.question_id}`); }
    catch (err) { setError(getApiErrorMessage(err)); }
    finally { setSaving(false); }
  }

  return <form onSubmit={submit} style={{ maxWidth: 800, display: 'grid', gap: 16 }}>
    <h2>Ask a question</h2>
    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Question title' required />
    <textarea value={body} onChange={e => setBody(e.target.value)} placeholder='Describe your question' rows={10} required />
    {error && <p role='alert'>{error}</p>}
    <button disabled={saving}>{saving ? 'Posting…' : 'Post question'}</button>
  </form>;
}
