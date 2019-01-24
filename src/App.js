import React from 'react'

import './App.css'

import { 
  BrowserRouter as Router, 
  Route, 
} from "react-router-dom"

import {
  Container, Row, Col
} from 'reactstrap'

import Home from './components/container/Home'
import Header from './components/presentation/Header';

const App = () => (
  <Router>
    <Container fluid className="App-Container">
      <Row className="header">
          <Header />
        <Col s="4">{' '}</Col>
      </Row>

      <Row className="App">
        <Route exact path="/" component={Home}/>
      </Row>

    </Container>
  </Router>
)

export default App