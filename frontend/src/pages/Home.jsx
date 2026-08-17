import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';


function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setStatus({ loading: true, error: '', success: '' });
    try {
      const { data } = await api.post('/contact', form);
      setStatus({ loading: false, error: '', success: data.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Unable to submit your message.', success: '' });
    }
  };
  return <div className="contactFormWrap">
    <form className="contactForm" onSubmit={submit}>
      {status.error && <div className="formError">{status.error}</div>}
      {status.success && <div className="formSuccess">✓ {status.success}</div>}
      <div className="formRow">
        <label className="field"><span>Name</span><input name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label>
        <label className="field"><span>Email</span><input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label>
      </div>
      <label className="field"><span>Subject</span><input name="subject" value={form.subject} onChange={update} placeholder="How can we help?" required /></label>
      <label className="field"><span>Message</span><textarea name="message" value={form.message} onChange={update} placeholder="Write your message..." rows="6" required /></label>
      <button className="primary full" type="submit" disabled={status.loading}>{status.loading ? 'Sending...' : 'Send Message'}</button>
    </form>
  </div>;
}

export default function Home() {
  return (
    <main className="homePage">
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">STUDENT EXAMINATION SYSTEM</p>
          <h1>Examinations made <span>simple, secure and organized.</span></h1>
          <p className="heroText">
            A modern online examination platform for students to attend exams,
            manage their time, submit answers and view results from one place.
          </p>
          <div className="heroActions">
            <Link to="/login" className="primary heroButton">Login to System →</Link>
            <a href="#features" className="secondary heroButton">Explore Features</a>
          </div>
          <div className="trustRow">
            <span>✓ Secure student access</span>
            <span>✓ Timed examinations</span>
            <span>✓ Instant results</span>
          </div>
        </div>
        <div className="heroVisual">
          <div className="portalPreview">
            <div className="previewTop">
              <div className="previewBrand"><span>🎓</span> Student Dashboard</div>
              <span className="previewDot">● Online</span>
            </div>
            <div className="previewWelcome">Good morning, Student</div>
            <p className="previewMuted">Continue your examination journey</p>
            <div className="previewStats">
              <div><strong>03</strong><span>Exams</span></div>
              <div><strong>82%</strong><span>Average</span></div>
              <div><strong>12</strong><span>Results</span></div>
            </div>
            <div className="previewExam">
              <div><span className="previewIcon">📚</span><div><strong>Computer Science</strong><small>20 Questions · 30 Minutes</small></div></div>
              <span className="previewArrow">→</span>
            </div>
            <div className="previewProgress"><span style={{width:'68%'}} /></div>
            <div className="previewBottom"><span>Exam Progress</span><strong>68%</strong></div>
          </div>
        </div>
      </section>

      <section className="featureSection" id="features">
        <div className="sectionHeading centerHeading">
          <p className="eyebrow">WHY USE THE PORTAL</p>
          <h2>Everything students need for online examinations</h2>
          <p>Designed for a focused, reliable and comfortable examination experience.</p>
        </div>
        <div className="featureGrid">
          <article className="featureCard"><div className="featureIcon">🔐</div><h3>Secure Access</h3><p>Student accounts are protected with authenticated login and secure sessions.</p></article>
          <article className="featureCard"><div className="featureIcon">⏱</div><h3>Timed Exams</h3><p>Stay aware of the remaining time with a clear examination timer and progress bar.</p></article>
          <article className="featureCard"><div className="featureIcon">📝</div><h3>Easy Answering</h3><p>Move between questions, review answers and submit your examination with ease.</p></article>
          <article className="featureCard"><div className="featureIcon">📊</div><h3>Instant Results</h3><p>View your score, percentage and detailed answer review after submission.</p></article>
          <article className="featureCard"><div className="featureIcon">📚</div><h3>Exam Dashboard</h3><p>See available examinations and your previous examination performance in one place.</p></article>
          <article className="featureCard"><div className="featureIcon">💻</div><h3>Responsive Design</h3><p>Access the examination portal comfortably on desktop, tablet and mobile screens.</p></article>
        </div>
      </section>

      <section className="stepsSection">
        <div className="sectionHeading centerHeading"><p className="eyebrow">HOW IT WORKS</p><h2>Complete your examination in four steps</h2></div>
        <div className="stepsGrid">
          <div className="step"><span>01</span><h3>Login</h3><p>Sign in with your student account.</p></div>
          <div className="step"><span>02</span><h3>Choose Exam</h3><p>Select an available examination.</p></div>
          <div className="step"><span>03</span><h3>Take Exam</h3><p>Answer questions before the timer ends.</p></div>
          <div className="step"><span>04</span><h3>View Result</h3><p>See your score and answer review.</p></div>
        </div>
      </section>

      <section className="contactSection" id="contact">
        <center><h1>Contact Us</h1>
         <p className="eyebrow"><h3>Fill in the form and your message will be saved for the support team.</h3></p></center>
        <ContactForm />
      </section>

      <section className="ctaSection">
        <div><p className="eyebrow">READY TO BEGIN?</p><h2>Start your examination journey today.</h2><p>Login to access your student examination dashboard.</p></div>
        <Link to="/login" className="primary heroButton">Login to System →</Link>
      </section>

      <footer className="siteFooter">
        <div><strong>🎓 Student Examination System</strong><span>Online Examination Platform</span></div>
        <span>© 2026 Student Examination System</span>
      </footer>
    </main>
  );
}
