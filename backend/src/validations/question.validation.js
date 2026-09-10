export function validateQuestionInput(data) {
  const { title, body } = data;

  if (!title || !body) {
    return "Title and body are required";
  }

  if (title.trim().length < 5) {
    return "Title must be at least 5 characters";
  }

  if (title.trim().length > 255) {
    return "Title cannot exceed 255 characters";
  }

  if (body.trim().length < 10) {
    return "Question body must be at least 10 characters";
  }

  return null;
}
