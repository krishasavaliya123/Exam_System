import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Feedback() {
  const [form, setForm] = useState({ rating: '', category: 'Examination Experience', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const { data } = await api.post('/feedback', form);
      setStatus({ loading: false, error: '', success: data.message });
      setForm({ rating: '', category: 'Examination Experience', message: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Unable to submit feedback.', success: '' });
    }
  };
  return (
    <main className="page">
      <section className="card feedbackPage">
        <div className="feedbackHeader">
          <p className="eyebrow">STUDENT FEEDBACK</p><h1>Share your feedback</h1>
          <p className="subtext">Tell us about your examination experience and how we can improve the system.</p>
        </div>
        {status.success ? (
          <div className="feedbackSuccess"><div className="resultIcon">✓</div><h2>Thank you for your feedback!</h2><p>{status.success}</p><Link className="primary" to="/dashboard">Back to Dashboard</Link></div>
        ) : (
          <form onSubmit={submit} className="feedbackForm">
            {status.error && <div className="formError">{status.error}</div>}
            <label className="field"><span>Feedback Category</span><select name="category" value={form.category} onChange={update}><option>Examination Experience</option><option>Dashboard</option><option>Results</option><option>Technical Issue</option><option>General Suggestion</option></select></label>
            <label className="field"><span>Rating</span><select name="rating" value={form.rating} onChange={update} required><option value="">Select a rating</option><option value="5">★★★★★ Excellent</option><option value="4">★★★★☆ Very Good</option><option value="3">★★★☆☆ Good</option><option value="2">★★☆☆☆ Needs Improvement</option><option value="1">★☆☆☆☆ Poor</option></select></label>
            <label className="field"><span>Your Feedback</span><textarea name="message" value={form.message} onChange={update} placeholder="Write your feedback or suggestion..." rows="6" required /></label>
            <button className="primary full" type="submit" disabled={status.loading}>{status.loading ? 'Submitting...' : 'Submit Feedback'}</button>
          </form>
        )}
      </section>
    </main>
  );
}
