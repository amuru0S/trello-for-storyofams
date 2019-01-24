import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
    <div>
        <div className="header-categories"> </div>
        <Link className="category" to="#"> Flowcharts </Link>
        <Link className="category" to="#"> Wireframes </Link>
        <Link className="category" to="#"> Prototype </Link>
        <Link className="category" to="#"> Development </Link>
        <Link className="category" to="#"> Test </Link>
        <Link className="category" to="#"> Launch </Link>
        <div className="header-categories"> </div>
    </div>
);

export default Header;