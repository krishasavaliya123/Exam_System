import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import { AuthContext } from '../App.jsx';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/exams'), api.get('/results')])
      .then(([e,r]) => { setExams(e.data); setResults(r.data); })
      .catch(err => setError(err.response?.data?.message || 'Unable to load dashboard data.'));
  }, []);

  return <main className="page">
    <section className="welcomeRow">
      <div><p className="eyebrow">STUDENT DASHBOARD</p><h1>Welcome, {user?.fullName || 'Student'}</h1><p className="subtext">Choose an examination and complete it at your own pace.</p></div>
      <div className="studentBadge"><small>Student ID</small><strong>{user?.studentId || 'STU1001'}</strong></div>
    </section>
    {error && <div className="message errorMessage">{error}</div>}
    <div className="statsGrid">
      <div className="miniStat"><span>Available Exams</span><strong>{exams.length}</strong></div>
      <div className="miniStat"><span>Completed Exams</span><strong>{results.length}</strong></div>
      <div className="miniStat"><span>Latest Score</span><strong>{results[0] ? `${Math.round(results[0].percentage)}%` : '—'}</strong></div>
    </div>
    <div className="sectionTitle"><div><p className="eyebrow">AVAILABLE EXAMINATIONS</p><h2>Select an examination</h2></div></div>
    <div className="examGrid">
      {exams.map(exam => <article className="examCard" key={exam.id}>
        <div className="subjectIcon">📚</div><h3>{exam.title}</h3><p>{exam.description}</p>
        <div className="examMeta"><span>⏱ {exam.duration_minutes} min</span><span>📝 {exam.total_questions} questions</span></div>
        <Link className="primary full" to={`/exam/${exam.id}`}>Start Examination</Link>
      </article>)}
    </div>
    {!exams.length && !error && <div className="empty card">No examinations are available yet. Run the backend seed command first.</div>}
    <div className="sectionTitle"><div><p className="eyebrow">EXAMINATION HISTORY</p><h2>Your recent results</h2></div></div>
    <section className="card resultList">
      {results.length ? results.slice(0,5).map(r => <div className="resultRow" key={r.id}><div><strong>{r.title}</strong><small>{r.subject}</small></div><span className="scorePill">{Math.round(r.percentage)}%</span><Link to={`/result/${r.id}`}>View Result →</Link></div>) : <div className="empty">No completed examinations yet.</div>}
    </section>
  </main>;
}
