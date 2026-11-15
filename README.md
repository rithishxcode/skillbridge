# SkillBridge — Student Skill & Placement Management System

A polished local demo for a full-stack lecture final assessment. The current version is intentionally presentation-ready and uses seeded in-memory demo data, so it can be demonstrated without configuring PostgreSQL or external services.

## Run locally

```bash
npm install
npm run dev:full
```

Then open the local URL shown by Vite.

## Demo workspaces

Choose any role on the landing screen — no password is required:

- **Student:** profile strength, recommended jobs, applications, interviews, profile/resume flow
- **Recruiter:** job postings, hiring pipeline, applicants, interviews, posting creation
- **Placement Admin:** placement analytics, student directory, companies, job approvals, reports

The UI is responsive and all primary demo actions are interactive: role switching, job search, job details, applying, creating a posting, approving a posting, saving profile changes, exporting, and simulated uploads.

## Assessment note

The interface now reads from a local Express API. The API intentionally starts with empty in-memory collections on every server restart; it does not ship with student, company, job, or application records. Use the profile and job-posting forms, or call the REST endpoints directly, to create the records that appear in the UI.

The API runs on `http://localhost:4000` and exposes `GET /api/state`, plus `POST /api/students`, `POST /api/companies`, `POST /api/jobs`, `POST /api/applications`, and `POST /api/interviews`.
