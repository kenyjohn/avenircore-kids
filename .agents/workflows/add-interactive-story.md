# Workflow: Add Interactive Story

This workflow provides the exact steps to create and register a new interactive story.

## 1. Create Story JSON
Create a new file in `src/data/stories/<story-id>.json`. Reference `.agents/skills/content-engine.md` for the schema.

### Guidelines
- **Emoji**: Use a single, relevant emoji for the character.
- **Concept**: Map to a core AI literacy concept (e.g., "Hallucinations", "Training Data").
- **Steps**: Aim for 5–8 steps per story to maintain engagement.

## 2. Register Story
Open `src/data/stories/index.js` and add the new story:
1. Import the JSON file.
2. Add the variable to the `stories` export array.

```javascript
import newStory from './new-story.json';
// ...
export const stories = [
  // ...
  newStory
];
```

## 3. Verify Story
1. Start the dev server: `npm run dev`.
2. Navigate to `/stories`.
3. Verify the new card appears with correct metadata.
4. Play through the story to ensure all quiz/activity logic works as expected.

// turbo-all
## 4. Automation Checklist
- [ ] JSON is valid (no trailing commas).
- [ ] All `correct` indices in quiz steps are valid options.
- [ ] Character color matches brand palette.
- [ ] `npm run lint` passes.
