// This is a placeholder for future AI integrations
// For now, it simply mimics a generation delay and returns a sample story format.

export async function generateStory(topic) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `ai-generated-${Date.now()}`,
        title: `A Story about ${topic}`,
        description: "Generated dynamically by AI.",
        steps: [
          {
            type: "story",
            content: `Once upon a time, there was an AI learning about ${topic}...`
          },
          {
            type: "question",
            question: `What is the most important part of ${topic}?`,
            options: ["Data", "Magic", "Nothing"],
            correct: 0
          }
        ]
      });
    }, 1500);
  });
}
