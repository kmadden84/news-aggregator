import React, { useContext, useState } from 'react';
import { Form, Row, Container, Button, InputGroup,FormControl } from 'react-bootstrap';
import NewsContext from '../context/news-context';

const NewsToggle = props => {

    const context = useContext(NewsContext);

    const [search, setSearch] = useState('');

    const fetchItems = (e) => {
        console.log('fetchItems')
        e.preventDefault();
        let query = e.target.value;
        context.fetchItems(query, 1); //set page 1 to default
        console.log(context.newsItems);
        document.getElementById(context.pageNum).classList.add("selected");

    }

    
    const searchItems = (e) => {
        console.log('searchItems')

        e.preventDefault();
        let query = search;
        context.fetchItems(query, 1);//set page 1 to default
        console.log(context.newsItems);
        document.getElementById(context.pageNum).classList.add("selected");

    }

    const keySearch = (e) => {
        console.log('keySearch')
        if (e.key === 'Enter') {
        let query = search;
        context.fetchItems(query, 1); //set page 1 to default
        console.log(context.newsItems);
        document.getElementById(context.pageNum).classList.add("selected");

        }
    }

    const searchState = (e) => {
        setSearch(e.target.value)
    }

    return (
        
        <Container>
        <Row className="topToggle">
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select News Category</Form.Label>
                    <Form.Control as="select" onChange = {(e)=> fetchItems(e)}>
                    <option value="Latest" selected>Latest News</option>
    
                        <option value="Bitcoin">Bitcoin News</option>
                        <option value="Trump">Trump News</option>
                        <option value="Entertainment">Entertainment News</option>
                        <option value="Technology">Technology</option>
                        <option value="Gaming">Gaming</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Search the news..."
              aria-label="Searcg Box"
              value={search}
              onChange ={(e)=> searchState(e)}
                onKeyDown = {(e)=> keySearch(e)}
            // onKeyDown = {(e)=> searchItems(e)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick = {(e)=> searchItems(e)} >Search</Button>
            </InputGroup.Append>
          </InputGroup>

        </Row>
        </Container>
    )
}

export default NewsToggle;