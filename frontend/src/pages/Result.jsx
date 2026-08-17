import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function Result(){
  const {id}=useParams(); const [result,setResult]=useState(null); const [error,setError]=useState('');
  useEffect(()=>{api.get(`/results/${id}`).then(r=>setResult(r.data)).catch(e=>setError(e.response?.data?.message||'Unable to load result.'));},[id]);
  if(error) return <main className="page"><div className="card center"><h2>{error}</h2><Link className="primary" to="/dashboard">Back to Dashboard</Link></div></main>;
  if(!result) return <main className="page"><div className="card center loading">Loading result...</div></main>;
  const correct=result.answers.filter(a=>a.is_correct).length; const unanswered=result.answers.filter(a=>a.selected_option===null).length;
  return <main className="page"><section className="card resultPage"><div className="resultIcon">✓</div><p className="eyebrow">EXAMINATION COMPLETED</p><h1>{result.title}</h1><p className="subtext">Your examination result has been recorded successfully.</p><div className="scoreCircle"><strong>{Math.round(result.percentage)}%</strong><span>{result.score} / {result.total_questions}</span></div><div className="stats"><div><strong>{correct}</strong><span>Correct</span></div><div><strong>{result.total_questions-correct-unanswered}</strong><span>Incorrect</span></div><div><strong>{unanswered}</strong><span>Unanswered</span></div></div><div className="review"><h3>Answer Review</h3>{result.answers.map((a,i)=><div className="reviewRow" key={a.question_id}><div><strong>Q{i+1}. {a.question_text}</strong><div className="muted">Your answer: {a.selected_option===null?'Not answered':[a.option_a,a.option_b,a.option_c,a.option_d][a.selected_option]}</div></div><strong className={a.is_correct?'correct':'wrong'}>{a.is_correct?'Correct':'Incorrect'}</strong></div>)}</div><div className="actions"><Link className="secondary" to="/dashboard">Dashboard</Link></div></section></main>;
}
