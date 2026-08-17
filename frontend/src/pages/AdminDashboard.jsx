import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

const emptyExam = {
  title: '',
  subject: '',
  duration_minutes: 30,
  total_questions: 0,
  description: '',
  is_active: true
};

const emptyQuestion = {
  exam_id: '',
  question_text: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  correct_option: 0
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [section, setSection] = useState('overview');
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);
  const [exams, setExams] = useState([]);

  const [editingExam, setEditingExam] = useState(null);
  const [editingQ, setEditingQ] = useState(null);

  const [examForm, setExamForm] = useState(emptyExam);
  const [qForm, setQForm] = useState(emptyQuestion);

  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(
    localStorage.getItem('adminUser') || '{}'
  );

  const sections = [
    ['overview', '⌂', 'Overview'],
    ['exams', '▣', 'Exams'],
    ['questions', '?', 'Questions'],
    ['students', '♙', 'Students'],
    ['results', '↗', 'Results'],
    ['contacts', '✉', 'Messages'],
    ['feedback', '★', 'Feedback']
  ];

  const flash = (message) => {
    setNotice(message);

    setTimeout(() => {
      setNotice('');
    }, 2500);
  };

  async function loadOverview() {
    const response = await api.get('/admin/overview');

    setStats({
      ...response.data.stats,
      recentResults: response.data.recentResults,
      recentContacts: response.data.recentContacts
    });
  }

  async function loadExams() {
    const response = await api.get('/admin/exams');
    setExams(response.data);
  }

  async function loadSection(name) {
    setLoading(true);

    try {
      if (name === 'overview') {
        await loadOverview();
      }

      else if (name === 'exams') {
        await loadExams();
      }

      else if (name === 'questions') {
        await loadExams();

        const response = await api.get('/admin/questions');
        setData(response.data);
      }

      else if (name === 'students') {
        const response = await api.get('/admin/students');
        setData(response.data);
      }

      else if (name === 'results') {
        const response = await api.get('/admin/results');
        setData(response.data);
      }

      else if (name === 'contacts') {
        const response = await api.get('/admin/contacts');
        setData(response.data);
      }

      else if (name === 'feedback') {
        const response = await api.get('/admin/feedback');
        setData(response.data);
      }
    }

    catch (error) {
      flash(
        error.response?.data?.message ||
        'Unable to load data.'
      );
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSection(section);
  }, [section]);

  function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');

    navigate('/admin/login');
  }

  async function saveExam(event) {
    event.preventDefault();

    try {
      if (editingExam) {
        await api.put(
          `/admin/exams/${editingExam.id}`,
          examForm
        );
      } else {
        await api.post(
          '/admin/exams',
          examForm
        );
      }

      const wasEditing = Boolean(editingExam);

      setEditingExam(null);
      setExamForm(emptyExam);

      await loadExams();

      flash(
        wasEditing
          ? 'Exam updated successfully.'
          : 'Exam created successfully.'
      );
    }

    catch (error) {
      flash(
        error.response?.data?.message ||
        'Could not save exam.'
      );
    }
  }

  async function removeExam(id) {
    if (
      !window.confirm(
        'Delete this exam and all its questions?'
      )
    ) {
      return;
    }

    try {
      await api.delete(`/admin/exams/${id}`);

      await loadExams();

      flash('Exam deleted.');
    }

    catch (error) {
      flash('Unable to delete exam.');
    }
  }

  async function saveQuestion(event) {
    event.preventDefault();

    try {
      if (editingQ) {
        await api.put(
          `/admin/questions/${editingQ.id}`,
          qForm
        );
      } else {
        await api.post(
          '/admin/questions',
          qForm
        );
      }

      const wasEditing = Boolean(editingQ);

      setEditingQ(null);
      setQForm(emptyQuestion);

      const response = await api.get(
        '/admin/questions'
      );

      setData(response.data);

      flash(
        wasEditing
          ? 'Question updated.'
          : 'Question added.'
      );
    }

    catch (error) {
      flash(
        error.response?.data?.message ||
        'Could not save question.'
      );
    }
  }

  async function removeQuestion(id) {
    if (
      !window.confirm(
        'Delete this question?'
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/admin/questions/${id}`
      );

      const response = await api.get(
        '/admin/questions'
      );

      setData(response.data);

      flash('Question deleted.');
    }

    catch (error) {
      flash('Unable to delete question.');
    }
  }

  async function removeRecord(type, id) {
    if (
      !window.confirm(
        'Delete this record?'
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/admin/${type}/${id}`
      );

      const response = await api.get(
        `/admin/${type}`
      );

      setData(response.data);

      flash('Record deleted.');
    }

    catch (error) {
      flash('Unable to delete record.');
    }
  }

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(keyword)
    );
  }, [data, search]);

  return (
    <div className="adminShell">

      {/* SIDEBAR */}
      <aside className="adminSidebar">

        <div className="adminBrand">

          <div className="brandMark">
            ⌘
          </div>

          <div>
            <strong>
              Exam<span>Admin</span>
            </strong>

            <small>
              Management Suite
            </small>
          </div>

        </div>

        <div className="sideLabel">
          WORKSPACE
        </div>

        <nav>

          {sections.map(
            ([id, icon, label]) => (
              <button
                key={id}
                className={
                  section === id
                    ? 'sideItem active'
                    : 'sideItem'
                }
                onClick={() => {
                  setSection(id);
                  setSearch('');
                }}
              >
                <i>{icon}</i>

                {label}

                {id === 'contacts' &&
                stats.contacts > 0 ? (
                  <b className="navCount">
                    {stats.contacts}
                  </b>
                ) : null}

              </button>
            )
          )}

        </nav>

        <div className="sidebarBottom">

          <div className="adminMini">

            <div>
              {admin.fullName
                ?.charAt(0)
                ?.toUpperCase() || 'A'}
            </div>

            <span>
              <strong>
                {admin.fullName ||
                  'Administrator'}
              </strong>

              <small>
                Administrator
              </small>
            </span>

          </div>

          <button
            className="sideLogout"
            onClick={logout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="adminMain">

        <header className="adminTop">

          <div>

            <p className="adminCrumb">
              ADMIN CONSOLE /{' '}
              {section.toUpperCase()}
            </p>

            <h1>
              {section === 'overview'
                ? 'Dashboard'
                : sections.find(
                    (item) =>
                      item[0] === section
                  )?.[2]}
            </h1>

          </div>

          <div className="adminTopRight">

            <div className="adminTopUser">

              <div>
                {admin.fullName
                  ?.charAt(0)
                  ?.toUpperCase() || 'A'}
              </div>

              <span>
                {admin.fullName ||
                  'Administrator'}
              </span>

            </div>

          </div>

        </header>

        {notice && (
          <div className="adminToast">
            ✓ {notice}
          </div>
        )}

        {loading ? (
          <div className="adminLoading">
            Loading workspace...
          </div>
        ) : (
          <>

            {section === 'overview' && (
              <Overview
                stats={stats}
                onNavigate={setSection}
              />
            )}

            {section === 'exams' && (
              <ExamManager
                exams={exams}
                form={examForm}
                setForm={setExamForm}
                editing={editingExam}
                setEditing={setEditingExam}
                onSave={saveExam}
                onDelete={removeExam}
              />
            )}

            {section === 'questions' && (
              <QuestionManager
                exams={exams}
                form={qForm}
                setForm={setQForm}
                editing={editingQ}
                setEditing={setEditingQ}
                onSave={saveQuestion}
                onDelete={removeQuestion}
                questions={filtered}
                search={search}
                setSearch={setSearch}
              />
            )}

            {[
              'students',
              'results',
              'contacts',
              'feedback'
            ].includes(section) && (
              <DataManager
                section={section}
                rows={filtered}
                search={search}
                setSearch={setSearch}
                onDelete={removeRecord}
              />
            )}

          </>
        )}

      </main>

    </div>
  );
}


/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  stats,
  onNavigate
}) {
  return (
    <div>

      <div className="heroAdmin">

        <div>

          <span className="heroKicker">
            GOOD MORNING, ADMIN
          </span>

          <h2>
            Everything under control.
          </h2>

          <p>
            Manage your examination ecosystem
            from one focused workspace.
          </p>

        </div>

        <button
          className="adminPrimary"
          onClick={() =>
            onNavigate('exams')
          }
        >
          ＋ Create new exam
        </button>

      </div>

      <div className="adminStats">

        <Stat
          icon="♙"
          label="Students"
          value={stats.students}
        />

        <Stat
          icon="▣"
          label="Exams"
          value={stats.exams}
        />

        <Stat
          icon="?"
          label="Questions"
          value={stats.questions}
        />

        <Stat
          icon="↗"
          label="Results"
          value={stats.results}
        />

        <Stat
          icon="✉"
          label="Messages"
          value={stats.contacts}
        />

        <Stat
          icon="★"
          label="Feedback"
          value={stats.feedback}
        />

      </div>

      <div className="adminTwoCol">

        {/* RESULTS */}
        <div className="adminPanel">

          <div className="panelHead">

            <div>

              <span>
                ACTIVITY
              </span>

              <h3>
                Recent results
              </h3>

            </div>

            <button
              onClick={() =>
                onNavigate('results')
              }
            >
              View all →
            </button>

          </div>

          <div className="activityList">

            {stats.recentResults?.length ? (

              stats.recentResults.map(
                (result) => (
                  <div
                    className="activityRow"
                    key={result.id}
                  >

                    <div className="activityAvatar">
                      {result.student
                        ?.charAt(0) || 'S'}
                    </div>

                    <div>
                      <strong>
                        {result.student}
                      </strong>

                      <small>
                        {result.title}
                      </small>
                    </div>

                    <b>
                      {Math.round(
                        result.percentage
                      )}
                      %
                    </b>

                  </div>
                )
              )

            ) : (
              <div className="emptyAdmin">
                No results yet.
              </div>
            )}

          </div>

        </div>


        {/* MESSAGES */}
        <div className="adminPanel">

          <div className="panelHead">

            <div>

              <span>
                INBOX
              </span>

              <h3>
                Recent messages
              </h3>

            </div>

            <button
              onClick={() =>
                onNavigate('contacts')
              }
            >
              View all →
            </button>

          </div>

          <div className="activityList">

            {stats.recentContacts?.length ? (

              stats.recentContacts.map(
                (message) => (
                  <div
                    className="messageRow"
                    key={message.id}
                  >

                    <div>

                      <strong>
                        {message.name}
                      </strong>

                      <small>
                        {message.subject}
                      </small>

                    </div>

                    <span>
                      {new Date(
                        message.created_at
                      ).toLocaleDateString()}
                    </span>

                  </div>
                )
              )

            ) : (
              <div className="emptyAdmin">
                No messages yet.
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  icon,
  label,
  value
}) {
  return (
    <div className="adminStat">

      <div className="statIcon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value ?? 0}
        </strong>

      </div>

    </div>
  );
}


/* =========================================================
   EXAM MANAGER
========================================================= */

function ExamManager({
  exams,
  form,
  setForm,
  editing,
  setEditing,
  onSave,
  onDelete
}) {
  return (
    <div className="managerGrid">

      <div className="adminPanel formPanel">

        <div className="panelHead">

          <div>

            <span>
              {editing
                ? 'EDIT EXAM'
                : 'NEW EXAM'}
            </span>

            <h3>
              {editing
                ? 'Update exam'
                : 'Create an examination'}
            </h3>

          </div>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(emptyExam);
              }}
            >
              Cancel
            </button>
          )}

        </div>

        <form
          className="adminForm"
          onSubmit={onSave}
        >

          <div className="twoFields">

            <Field
              label="Exam title"
              value={form.title}
              onChange={(value) =>
                setForm({
                  ...form,
                  title: value
                })
              }
            />

            <Field
              label="Subject"
              value={form.subject}
              onChange={(value) =>
                setForm({
                  ...form,
                  subject: value
                })
              }
            />

          </div>


          <div className="threeFields">

            <Field
              label="Duration (minutes)"
              type="number"
              value={form.duration_minutes}
              onChange={(value) =>
                setForm({
                  ...form,
                  duration_minutes: value
                })
              }
            />

            <Field
              label="Question target"
              type="number"
              value={form.total_questions}
              onChange={(value) =>
                setForm({
                  ...form,
                  total_questions: value
                })
              }
            />

            <label className="checkField">

              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) =>
                  setForm({
                    ...form,
                    is_active:
                      event.target.checked
                  })
                }
              />

              Active exam

            </label>

          </div>


          <Field
            label="Description"
            textarea
            value={form.description}
            onChange={(value) =>
              setForm({
                ...form,
                description: value
              })
            }
          />


          <button
            className="adminPrimary full"
            type="submit"
          >
            {editing
              ? 'Save changes'
              : 'Create exam'}
          </button>

        </form>

      </div>


      {/* EXAM LIBRARY */}
      <div>

        <div className="sectionMiniHead">

          <span>
            EXAM LIBRARY
          </span>

          <strong>
            {exams.length} examinations
          </strong>

        </div>

        <div className="examAdminList">

          {exams.length ? (

            exams.map((exam) => (

              <div
                className="examAdminCard"
                key={exam.id}
              >

                <div className="examAdminIcon">
                  ▣
                </div>

                <div className="examAdminInfo">

                  <div className="examTitleLine">

                    <strong>
                      {exam.title}
                    </strong>

                    <em
                      className={
                        exam.is_active
                          ? 'status active'
                          : 'status'
                      }
                    >
                      {exam.is_active
                        ? 'Active'
                        : 'Draft'}
                    </em>

                  </div>

                  <span>
                    {exam.subject}
                    {' · '}
                    {exam.duration_minutes}
                    {' min · '}
                    {exam.question_count}
                    {' questions'}
                  </span>

                  <p>
                    {exam.description ||
                      'No description added.'}
                  </p>

                </div>


                <div className="rowActions">

                  <button
                    type="button"
                    onClick={() => {
                      setEditing(exam);

                      setForm({
                        title: exam.title,
                        subject: exam.subject,
                        duration_minutes:
                          exam.duration_minutes,
                        total_questions:
                          exam.total_questions,
                        description:
                          exam.description || '',
                        is_active:
                          !!exam.is_active
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="dangerText"
                    onClick={() =>
                      onDelete(exam.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (
            <div className="emptyAdmin">
              No examinations available.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   QUESTION MANAGER
========================================================= */

function QuestionManager({
  exams,
  form,
  setForm,
  editing,
  setEditing,
  onSave,
  onDelete,
  questions,
  search,
  setSearch
}) {
  return (
    <div className="managerGrid">

      <div className="adminPanel formPanel">

        <div className="panelHead">

          <div>

            <span>
              {editing
                ? 'EDIT QUESTION'
                : 'NEW QUESTION'}
            </span>

            <h3>
              {editing
                ? 'Update question'
                : 'Add question'}
            </h3>

          </div>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(emptyQuestion);
              }}
            >
              Cancel
            </button>
          )}

        </div>


        <form
          className="adminForm"
          onSubmit={onSave}
        >

          <label className="adminField">

            <span>
              Exam
            </span>

            <select
              value={form.exam_id}
              onChange={(event) =>
                setForm({
                  ...form,
                  exam_id:
                    event.target.value
                })
              }
              required
            >

              <option value="">
                Select exam
              </option>

              {exams.map((exam) => (
                <option
                  value={exam.id}
                  key={exam.id}
                >
                  {exam.title}
                </option>
              ))}

            </select>

          </label>


          <Field
            label="Question"
            textarea
            value={form.question_text}
            onChange={(value) =>
              setForm({
                ...form,
                question_text: value
              })
            }
          />


          <div className="twoFields">

            <Field
              label="Option A"
              value={form.option_a}
              onChange={(value) =>
                setForm({
                  ...form,
                  option_a: value
                })
              }
            />

            <Field
              label="Option B"
              value={form.option_b}
              onChange={(value) =>
                setForm({
                  ...form,
                  option_b: value
                })
              }
            />

            <Field
              label="Option C"
              value={form.option_c}
              onChange={(value) =>
                setForm({
                  ...form,
                  option_c: value
                })
              }
            />

            <Field
              label="Option D"
              value={form.option_d}
              onChange={(value) =>
                setForm({
                  ...form,
                  option_d: value
                })
              }
            />

          </div>


          <label className="adminField">

            <span>
              Correct answer
            </span>

            <select
              value={form.correct_option}
              onChange={(event) =>
                setForm({
                  ...form,
                  correct_option:
                    Number(
                      event.target.value
                    )
                })
              }
            >

              <option value={0}>
                A
              </option>

              <option value={1}>
                B
              </option>

              <option value={2}>
                C
              </option>

              <option value={3}>
                D
              </option>

            </select>

          </label>


          <button
            className="adminPrimary full"
            type="submit"
          >
            {editing
              ? 'Save question'
              : 'Add question'}
          </button>

        </form>

      </div>


      {/* QUESTION BANK */}
      <div className="adminPanel tablePanel">

        <div className="panelHead">

          <div>

            <span>
              QUESTION BANK
            </span>

            <h3>
              Manage questions
            </h3>

          </div>

          <input
            className="tableSearch"
            placeholder="Search questions..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        <div className="questionList">

          {questions.length ? (

            questions.map((question) => (

              <div
                className="questionAdminRow"
                key={question.id}
              >

                <div className="qBadge">
                  Q
                </div>

                <div>

                  <strong>
                    {question.question_text}
                  </strong>

                  <small>
                    {question.exam_title}
                    {' · Correct: '}
                    {
                      ['A', 'B', 'C', 'D'][
                        question.correct_option
                      ]
                    }
                  </small>

                </div>


                <div className="rowActions">

                  <button
                    type="button"
                    onClick={() => {

                      setEditing(question);

                      setForm({
                        exam_id:
                          question.exam_id,
                        question_text:
                          question.question_text,
                        option_a:
                          question.option_a,
                        option_b:
                          question.option_b,
                        option_c:
                          question.option_c,
                        option_d:
                          question.option_d,
                        correct_option:
                          question.correct_option
                      });

                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="dangerText"
                    onClick={() =>
                      onDelete(question.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (
            <div className="emptyAdmin">
              No questions found.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   DATA MANAGER
========================================================= */

function DataManager({
  section,
  rows,
  search,
  setSearch,
  onDelete
}) {

  const labels = {
    students: [
      'STUDENT DIRECTORY',
      'Registered students'
    ],

    results: [
      'RESULTS CENTER',
      'Examination submissions'
    ],

    contacts: [
      'MESSAGE CENTER',
      'Contact submissions'
    ],

    feedback: [
      'FEEDBACK HUB',
      'Student feedback'
    ]
  };


  function renderTableHeaders() {

    if (section === 'students') {
      return (
        <tr>
          <th>Student</th>
          <th>Student ID</th>
          <th>Email</th>
          <th>Joined</th>
          <th>Action</th>
        </tr>
      );
    }


    if (section === 'results') {
      return (
        <tr>
          <th>Student</th>
          <th>Exam</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Submitted</th>
        </tr>
      );
    }


    if (section === 'contacts') {
      return (
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      );
    }


    return (
      <tr>
        <th>Student</th>
        <th>Rating</th>
        <th>Category</th>
        <th>Feedback</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    );
  }


  function renderStudentRow(row) {

    return (
      <tr key={row.id}>

        <td>
          <strong>
            {row.full_name}
          </strong>
        </td>

        <td>
          {row.student_id}
        </td>

        <td>
          {row.email}
        </td>

        <td>
          {formatDate(row.created_at)}
        </td>

        <td>
          <button
            className="tableDanger"
            onClick={() =>
              onDelete(
                'students',
                row.id
              )
            }
          >
            Delete
          </button>
        </td>

      </tr>
    );
  }


  function renderResultRow(row) {

    return (
      <tr key={row.id}>

        <td>
          {row.student}
        </td>

        <td>
          {row.title}
        </td>

        <td>
          {row.score}/{row.total_questions}
        </td>

        <td>
          <b className="percentBadge">
            {Math.round(
              row.percentage
            )}
            %
          </b>
        </td>

        <td>
          {formatDate(
            row.submitted_at
          )}
        </td>

      </tr>
    );
  }


  function renderContactRow(row) {

    return (
      <tr key={row.id}>

        <td>
          {row.name}
        </td>

        <td>
          {row.email}
        </td>

        <td>
          {row.subject}
        </td>

        <td className="truncate">
          {row.message}
        </td>

        <td>
          {formatDate(
            row.created_at
          )}
        </td>

        <td>
          <button
            className="tableDanger"
            onClick={() =>
              onDelete(
                'contacts',
                row.id
              )
            }
          >
            Delete
          </button>
        </td>

      </tr>
    );
  }


  function renderFeedbackRow(row) {

    return (
      <tr key={row.id}>

        <td>
          {row.student}
        </td>

        <td>
          <b className="ratingBadge">
            ★ {row.rating}/5
          </b>
        </td>

        <td>
          {row.category}
        </td>

        <td className="truncate">
          {row.message}
        </td>

        <td>
          {formatDate(
            row.created_at
          )}
        </td>

        <td>
          <button
            className="tableDanger"
            onClick={() =>
              onDelete(
                'feedback',
                row.id
              )
            }
          >
            Delete
          </button>
        </td>

      </tr>
    );
  }


  function renderRow(row) {

    if (section === 'students') {
      return renderStudentRow(row);
    }

    if (section === 'results') {
      return renderResultRow(row);
    }

    if (section === 'contacts') {
      return renderContactRow(row);
    }

    return renderFeedbackRow(row);
  }


  return (
    <div className="adminPanel tablePanel widePanel">

      <div className="panelHead">

        <div>

          <span>
            {labels[section][0]}
          </span>

          <h3>
            {labels[section][1]}
          </h3>

        </div>

        <input
          className="tableSearch"
          placeholder="Search..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

      </div>


      <div className="responsiveTable">

        <table>

          <thead>
            {renderTableHeaders()}
          </thead>

          <tbody>

            {rows.map((row) =>
              renderRow(row)
            )}

          </tbody>

        </table>


        {!rows.length && (
          <div className="emptyAdmin">
            No records found.
          </div>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  type = 'text',
  textarea = false
}) {
  return (
    <label className="adminField">

      <span>
        {label}
      </span>

      {textarea ? (

        <textarea
          rows="4"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          required
        />

      ) : (

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          required
        />

      )}

    </label>
  );
}


/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString();
}