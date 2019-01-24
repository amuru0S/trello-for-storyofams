import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Header = () => (
    <Router>
    <div className="header">
     <section className="header-categories">
        <div className="category"> </div>
        <Link to="#" className="category"> Flowcharts </Link>
        <Link to="#" className="category"> Wireframes </Link>
        <Link to="#" className="category"> Prototype </Link>
        <Link to="#" className="category"> Development </Link>
        <Link to="#" className="category"> Test </Link>
        <Link to="#" className="category"> Launch </Link>
        <div className="category"> </div>
     </section>
    </div>
    </Router>
    
);

export default Header;