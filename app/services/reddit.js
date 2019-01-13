export function fetchPosts(topic = 'all', sort = 'hot', after) {
  const nextPage = after ? `?after=${after}` : '';
  const url = `http://www.reddit.com/r/${topic}/${sort}.json${nextPage}`;

  return fetch(url)
    .then(response => response.json())
    .then(parsedData => {
      const parsedDataWithInfo = parsedData;
      parsedDataWithInfo.shouldConcat = !!after;
      return parsedDataWithInfo;
    })
    .catch(err => err);
}
