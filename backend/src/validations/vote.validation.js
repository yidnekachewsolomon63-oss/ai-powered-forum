export function validateVoteInput(data) {
  const { vote_type } = data;

  if (!vote_type) {
    return "vote_type is required";
  }

  if (!["up", "down"].includes(vote_type)) {
    return "vote_type must be either 'up' or 'down'";
  }

  return null;
}
