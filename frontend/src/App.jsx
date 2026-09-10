import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Landing from './pages/Landing/Landing';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import MyQuestions from './pages/MyQuestions/MyQuestions';
import QuestionDetail from './pages/QuestionDetail/QuestionDetail';

function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path='/' element={<Landing />} />
    <Route path='/auth' element={<Auth />} />
    <Route element={<Layout />}>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/questions/ask' element={<ProtectedRoute><AskQuestion /></ProtectedRoute>} />
      <Route path='/my-questions' element={<ProtectedRoute><MyQuestions /></ProtectedRoute>} />
      <Route path='/question/:id' element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
      <Route path='/rag-documents' element={<ProtectedRoute><div><h2>Knowledge Base</h2><p>The current backend does not expose document/RAG routes yet.</p></div></ProtectedRoute>} />
    </Route>
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes></AuthProvider></BrowserRouter>;
}
export default App;
