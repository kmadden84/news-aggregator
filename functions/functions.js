import fetch from "node-fetch";
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const apiKey = process.env.REACT_APP_APIKey;

app.post('/topheadlines', (req, res) => {
  var pageNum = req.body.pageNum;
  const API_ENDPOINT = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${pageNum}&apiKey=${apiKey}`
  return fetch(API_ENDPOINT, {
    headers: {
      "Accept": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(data) {
      return res.json(data)
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
  });

app.post('/query', (req, res) => {
  var query = req.body.query;
  var page = req.body.page;
  const API_ENDPOINT = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${query}&pageSize=20&page=${page}&apiKey=${apiKey}`

  return fetch(API_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(function(data) {
      return res.json(data)
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
  });


  app.post('/noquery', (req, res) => {
    var page = req.body.page;
    const API_ENDPOINT = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=${apiKey}`
    return fetch(API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(function(data) {
        return res.json(data)
      })
      .catch(error => ({ statusCode: 422, body: String(error) }));
    });

module.exports.handler = serverless(app);
