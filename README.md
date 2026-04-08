# AvenirCore Kids

Welcome to the AvenirCore codebase! This repository contains the front-end application built with Vite, React, React Router, and MDX.

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

## Documentation

Comprehensive documentation about the system should be maintained in the `/docs` folder of this repository. When you create new feature documentation, diagrams, or standard operating procedures, you can add them as Markdown (`.md`) files inside `/docs` and link them here so the team can easily find them.

**Current Architectural Documentation:**
* [**Architecture & Component Overview**](docs/architecture.md) - Includes structural diagrams (Mermaid), routing topology, and how the interactive story engine works. Can be pulled into Figma or Notion to share with stakeholders.

## Agent Guidelines

When working with Agentic AI to edit this repository:
- All system instructions are listed in `AGENTS.md`.
- Use the provided GitHub/GitLab issue templates in `.gitlab/issue_templates/Default.md` when setting up story branches.
