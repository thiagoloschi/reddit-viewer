export function fetchPosts(topic, next) {
  const nextPage = next ? `?after=${next}` : '';
  return fetch(`http://www.reddit.com/${topic || 'top'}.json${nextPage}`)
    .then(response => response.json())
    .then(parsedData => parsedData);
}
