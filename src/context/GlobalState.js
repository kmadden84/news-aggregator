import React, { useState } from 'react';

import NewsContext from './news-context';


const GlobalState = props => {

    const [newsItems, setNewsItems] = useState([]);
    const [currentHeadline, setCurrentHeadline] = useState("Latest");
    const [errorMsg, setErrorMsg] = useState('');
    const [pageNum, setPageNum] = useState("1");
    const [pages, setPages] = useState(["1"]);
    const [queryString, setQueryString] = useState('');
   //const apiKey = process.env.REACT_APP_APIKey;

    const fetchTopHeadlines = () => {
        console.log('top headlines fetched')
        fetch('/topheadlines', {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          "pageNum": pageNum
        })
        }).then((response) => response.json())
          .then((data) => {
              setNewsItems(data.articles);
              console.log(data);
              var totalpages = Math.round(data.totalResults / data.articles.length);
              var pageArray = [];
              for (var i=1;i<=totalpages;i++) {
                if (i <= 5) {
                pageArray.push(i)
                  }
             }
           setPages(pageArray);
          })
          .catch(err => setErrorMsg(err))

    };

    const fetchItems = (query, page) => {
        console.log('category/search/pagenumber toggle fetched');
        console.log('query is: ' + query + ' and page number is:' + pageNum);
        if (page) {
        setPageNum(page);
        }
        setCurrentHeadline(query);
        setQueryString(query);
        let url;
        if (query !== '' && query !== 'Latest') {
            url = '/query'
        } else {
            url = '/noquery'
        }
        
        fetch(url, {
          body: JSON.strigify({
              "query": queryString,
              "page": page
            })
        }).then((response) => response.json())
          .then((data) => {
              setNewsItems(data.articles);
              console.log(data)
              var totalpages = Math.round(data.totalResults / data.articles.length);
              var pageArray = [];
              for (var i=1;i<=totalpages;i++) {
                  if (i <= 5) {
                pageArray.push(i)
                  }
             }
           setPages(pageArray);
           console.log(pageArray)
          })
          .catch((err) => setErrorMsg(err))
    };

    return (
        <NewsContext.Provider
            value={{
                newsItems: newsItems,
                fetchTopHeadlines: fetchTopHeadlines,
                fetchItems: fetchItems,
                currentHeadline: currentHeadline,
                errorMsg: errorMsg,
                pages: pages,
                query: queryString,
                pageNum: pageNum,
                setPageNum: setPageNum
            }}
        >
            {props.children}
        </NewsContext.Provider>
    );
};

export default GlobalState;
