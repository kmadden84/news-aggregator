import React from 'react';

export default React.createContext({
  newsItems: [],
  currentHeadline: "Latest",
  errorMsg: "",
  pageNum: 1,
  fetchTopHeadlines: () => {},
  fetchItems: query => {}
});
