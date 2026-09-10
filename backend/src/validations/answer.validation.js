export function validateAnswerInput(data) {
  const { body } = data;

  if (!body) {
    return "Answer body is required";
  }

  if (body.trim().length < 2) {
    return "Answer must be at least 2 characters";
  }

  if (body.trim().length > 10000) {
    return "Answer cannot exceed 10000 characters";
  }

  return null;
}
