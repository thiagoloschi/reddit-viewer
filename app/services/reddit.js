export function fetchPosts(topic = 'hot', next) {
  const nextPage = next ? `?after=${next}` : '';
  return fetch(`http://www.reddit.com/${topic}.json${nextPage}`)
    .then(response => response.json())
    .then(parsedData => parsedData);
}
