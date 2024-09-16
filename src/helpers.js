// Function to trim a post to two words only
export function trimText(text, wordLimit) {
  if (!text) {
    return "";
  }

  const wordsArray = text.split(" ");
  const trimmedArray = wordsArray.slice(0, wordLimit);
  const trimmedText = trimmedArray.join(" ");
  return trimmedText;
}
