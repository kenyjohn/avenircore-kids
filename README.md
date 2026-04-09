# AvenirCore Kids

Welcome to the AvenirCore codebase! This repository contains the front-end application built with Vite, React, React Router, and MDX, with Vercel Serverless Functions for backend integrations.

## Getting Started

To run the application locally:

```bash
# Install dependencies
npm ci

# Start the development server
npm run dev

# Lint and build the application
npm run lint && npm run build
```

## Environment Variables

The following environment variables must be set in Vercel (Settings → Environment Variables) for the production APIs to work:

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_BEEHIIV_PUB_ID` | Beehiiv Publication ID | Beehiiv → Settings → Publication |
| `VITE_BEEHIIV_API_KEY` | Beehiiv API Key | Beehiiv → API Keys |
| `RESEND_API_KEY` | Resend transactional email API key | [resend.com](https://resend.com) → API Keys |

> **Note:** `RESEND_API_KEY` powers the `/contact` page form. The `avenircore.com` domain has been verified on Resend (DNS + DKIM + SPF all green). Emails are dispatched from `hello@avenircore.com` with the sender's address set as `reply-to`.

## Documentation

Comprehensive documentation about the system should be maintained in the `/docs` folder of this repository. When you create new feature documentation, diagrams, or standard operating procedures, you can add them as Markdown (`.md`) files inside `/docs` and link them here so the team can easily find them.

**Current Documentation:**
* [**Architecture & Component Overview**](docs/architecture.md) — Structural diagrams (Mermaid), routing topology, story engine, and email infrastructure. Can be pulled into Figma or Notion to share with stakeholders.
* [**Email Welcome Sequences**](docs/email-sequences/) — Three Beehiiv automation email templates ready to paste (Day 0 welcome, Day 3 first story nudge, Day 7 paid tier soft pitch).

## Agent Guidelines

When working with Agentic AI to edit this repository:
- All system instructions are listed in `AGENTS.md`.
- Use the provided GitHub/GitLab issue templates in `.gitlab/issue_templates/Default.md` when setting up story branches.
