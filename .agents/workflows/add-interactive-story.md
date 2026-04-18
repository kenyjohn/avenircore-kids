# Workflow: Add Interactive Story

## 1. Create File
`src/data/stories/[id].json`. See `content-engine.md` for schema.

## 2. Register
Update `src/data/stories/index.js`:
```javascript
import newStory from './[id].json';
export const stories = [..., newStory];
```

## 3. Verify
- `npm run dev` -> `/stories`.
- Play through all steps/quizzes.

## 4. Checklist
- Valid JSON (no trailing commas).
- `correct` indices match options.
- `npm run lint` passes.
