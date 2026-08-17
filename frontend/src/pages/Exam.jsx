import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api.js';

export default function Exam() {
  const { id } = useParams(); const navigate = useNavigate();
  const [exam,setExam] = useState(null); const [answers,setAnswers] = useState({}); const [current,setCurrent]=useState(0); const [seconds,setSeconds]=useState(0); const [loading,setLoading]=useState(true); const [submitting,setSubmitting]=useState(false); const [error,setError]=useState('');
  const [startedAt] = useState(() => new Date().toISOString());

  useEffect(()=>{ api.get(`/exams/${id}`).then(r=>{setExam(r.data);setSeconds(r.data.duration_minutes*60)}).catch(e=>setError(e.response?.data?.message||'Unable to load examination.')).finally(()=>setLoading(false)); },[id]);
  useEffect(()=>{ if(!exam || submitting) return; const t=setInterval(()=>setSeconds(s=>{ if(s<=1){clearInterval(t);return 0;} return s-1;}),1000); return()=>clearInterval(t); },[exam,submitting]);
  useEffect(()=>{ if(exam && seconds===0 && !submitting) submitExam(true); },[seconds]);

  const answered = useMemo(()=>Object.keys(answers).length,[answers]);
  const formatTime = `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  const choose = (option)=>setAnswers({...answers,[String(exam.questions[current].id)]:option});
  async function submitExam(auto=false){
    if(!exam || submitting) return; if(!auto && !window.confirm('Submit this examination now?')) return;
    setSubmitting(true); setError('');
    try { const {data}=await api.post(`/exams/${id}/submit`,{answers,startedAt}); navigate(`/result/${data.resultId}`); }
    catch(e){setError(e.response?.data?.message||'Unable to submit examination.');setSubmitting(false);}
  }
  if(loading) return <main className="page"><div className="card center loading">Loading examination...</div></main>;
  if(error && !exam) return <main className="page"><div className="card center"><h2>{error}</h2><button className="primary" onClick={()=>navigate('/dashboard')}>Back to Dashboard</button></div></main>;
  const q=exam.questions[current]; const progress=((current+1)/exam.questions.length)*100;
  return <main className="page">
    <div className="examTop"><div><p className="eyebrow">{exam.subject.toUpperCase()}</p><h1>{exam.title}</h1><p>{answered} of {exam.questions.length} questions answered</p></div><div className={`timer ${seconds<=60?'warning':''}`}>⏱ {formatTime}</div></div>
    <div className="progressInfo"><span>Question {current+1} of {exam.questions.length}</span><span>{Math.round(progress)}%</span></div><div className="progress"><span style={{width:`${progress}%`}}/></div>
    {error && <div className="message errorMessage">{error}</div>}
    <section className="card questionCard"><span className="questionNo">QUESTION {current+1}</span><h2>{q.question}</h2><div className="options">{q.options.map((option,i)=><button key={i} className={`option ${answers[String(q.id)]===i?'selected':''}`} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div></section>
    <div className="navigation"><button className="secondary" disabled={current===0} onClick={()=>setCurrent(current-1)}>← Previous</button><div className="questionNav">{exam.questions.map((item,i)=><button key={item.id} className={`${answers[String(item.id)]!==undefined?'answered ':''}${i===current?'current':''}`} onClick={()=>setCurrent(i)}>{i+1}</button>)}</div>{current===exam.questions.length-1?<button className="success" disabled={submitting} onClick={()=>submitExam(false)}>{submitting?'Submitting...':'Submit Examination'}</button>:<button className="primary" onClick={()=>setCurrent(current+1)}>Next →</button>}</div>
  </main>;
}
