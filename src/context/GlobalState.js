import React, { useState } from 'react';

import NewsContext from './news-context';


const GlobalState = props => {

    const [newsItems, setNewsItems] = useState([]);
    const [currentHeadline, setCurrentHeadline] = useState("Latest");
    const [errorMsg, setErrorMsg] = useState('');
    const [pageNum, setPageNum] = useState("1");
    const [pages, setPages] = useState(["1"]);
    const [queryString, setQueryString] = useState('');


    const fetchTopHeadlines = () => {
        console.log('top headlines fetched')
        fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${pageNum}&apiKey=aac18cf3acf04bf69cb2ecf5cd878583`, {

        }).then((response) => response.json())
          .then((data) => {
              setNewsItems(data.articles);
              console.log(data);

              var totalpages = Math.round(data.totalResults / data.articles.length);
              var pageArray = [];
              for (var i=0;i<=totalpages;i++) {
                if (i <= 4) {
                pageArray.push(i)
                  }
             }
           setPages(pageArray);
          })
          .catch(err => setErrorMsg(err))

    };

    const fetchItems = (query, pageNum) => {
        console.log('category/search/pagenumber toggle fetched');
        console.log('query is: ' + query + ' and page number is:' + pageNum);
        setPageNum(pageNum);
        setCurrentHeadline(query);
        setQueryString(query);

        if (query !== '') {
            var url = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&page=${pageNum}&apiKey=aac18cf3acf04bf69cb2ecf5cd878583`
        } else {
            var url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${pageNum}&apiKey=aac18cf3acf04bf69cb2ecf5cd878583`
        }
        console.log(url)

        fetch(url, {

        }).then((response) => response.json())
          .then((data) => {
              setNewsItems(data.articles);
              console.log(data)
              var totalpages = Math.round(data.totalResults / data.articles.length);
              var pageArray = [];
              for (var i=0;i<=totalpages;i++) {
                  if (i <= 4) {
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
