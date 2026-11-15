import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// Deliberately empty: the demo only displays data created through the API.
const store = {
  students: [],
  companies: [],
  jobs: [],
  applications: [],
  interviews: []
};

app.use(cors());
app.use(express.json());

const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const created = (body) => ({ id: id(), createdAt: new Date().toISOString(), ...body });
const findOr404 = (collection, value, res) => {
  const item = collection.find((entry) => entry.id === value);
  if (!item) { res.status(404).json({ error: 'Record not found' }); return null; }
  return item;
};

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/state', (_req, res) => res.json(store));

app.post('/api/students', (req, res) => {
  const { name, course, graduationYear, skills = [], about = '' } = req.body;
  if (!name || !course) return res.status(400).json({ error: 'Name and course are required' });
  const student = created({ name, course, graduationYear, skills, about });
  store.students.push(student);
  res.status(201).json(student);
});

app.post('/api/companies', (req, res) => {
  const { name, sector, website = '' } = req.body;
  if (!name || !sector) return res.status(400).json({ error: 'Company name and sector are required' });
  const company = created({ name, sector, website });
  store.companies.push(company);
  res.status(201).json(company);
});

app.post('/api/jobs', (req, res) => {
  const { company, title, type, location, salary, skills = [], deadline } = req.body;
  if (!company || !title || !type) return res.status(400).json({ error: 'Company, title and type are required' });
  const job = created({ company, title, type, location, salary, skills, deadline, applicants: 0, status: 'Open', logo: company.slice(0, 2).toUpperCase(), color: 'violet' });
  store.jobs.push(job);
  res.status(201).json(job);
});

app.post('/api/applications', (req, res) => {
  const { jobId, studentName, studentEmail = '' } = req.body;
  const job = findOr404(store.jobs, jobId, res);
  if (!job) return;
  if (!studentName) return res.status(400).json({ error: 'Student name is required' });
  const application = created({ jobId, company: job.company, role: job.title, studentName, studentEmail, status: 'Applied', date: 'Applied just now', next: 'Awaiting response', logo: job.logo, color: job.color });
  store.applications.push(application);
  job.applicants += 1;
  res.status(201).json(application);
});

app.patch('/api/applications/:applicationId', (req, res) => {
  const application = findOr404(store.applications, req.params.applicationId, res);
  if (!application) return;
  Object.assign(application, { status: req.body.status || application.status });
  res.json(application);
});

app.post('/api/interviews', (req, res) => {
  const { applicationId, scheduledFor, notes = '' } = req.body;
  if (!applicationId || !scheduledFor) return res.status(400).json({ error: 'Application and schedule are required' });
  const interview = created({ applicationId, scheduledFor, notes });
  store.interviews.push(interview);
  res.status(201).json(interview);
});

app.listen(port, () => console.log(`SkillBridge API listening on http://localhost:${port}`));
