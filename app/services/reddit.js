export function fetchPosts(topic = 'hot', after) {
  const nextPage = after ? `?after=${after}` : '';
  return fetch(`http://www.reddit.com/${topic}.json${nextPage}`)
    .then(response => response.json())
    .then(parsedData => {
      const parsedDataWithInfo = parsedData;
      parsedDataWithInfo.shouldConcat = !!after;
      return parsedDataWithInfo;
    });
}
