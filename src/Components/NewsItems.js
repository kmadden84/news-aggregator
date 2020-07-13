import React, { useEffect, useContext } from 'react';
import NewsContext from '../context/news-context';
import { Card, Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const NewsItems = props => {

const context = useContext(NewsContext);

let newsItems = context.newsItems;
let pages = context.pages;
let query = context.query;
let currentPage = context.pageNum;

useEffect(() => {

  context.fetchTopHeadlines()
}, [context]);




useEffect(() => {

    var page_elems_array = Array.from(document.querySelectorAll('.pageHolder div'));
    var page_elems = document.getElementById(currentPage);
        page_elems_array.forEach(function(value, index) {
            page_elems_array[index].classList.remove("selected");
        })
        page_elems.classList.add("selected");

}, [context.newsItems]);

const formattedDate = (date) => {

    if (date) {

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return monthNames[monthIndex] + ' ' + day + ',' + ' ' + year;

    }
}

return (
        <div>

            <Container>
            <h2>Current viewing {context.currentHeadline} News</h2>

                <Row>
                    {
                        (newsItems) 
                        ? newsItems.map((item, index) => (                            
                        <Col md={6} lg={4} key={index}>
                            <Card>
                            <div className="cardImg">
                                <Card.Img variant="top" src={item.urlToImage} />
                            </div>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                    {item.source.name} - {formattedDate(new Date(item.publishedAt))}
                                 </Card.Text>
                                    <Card.Text>
                                       {item.description}
                                    </Card.Text>
                                </Card.Body>
                                <a href={item.url} target="_blank" rel="noopener noreferrer"></a>

                            </Card>
                        </Col>
                        ))

                    : <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Error</Card.Title>
                                    <Card.Text>
                                       <p>Failed to Fetch Data from News API</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>  

                }
                <div class="pageHolder">
                {
                 
                    pages.map((item, index) => (

                        <div id={index + 1} key={index + 1} onClick={(e)=> context.fetchItems(query, e.target.id)} className="pagenumber">{index + 1}</div>
                    ))
                 }
                </div>

               
                </Row>
            </Container>
        </div>
    );
                    
}

export default NewsItems;
