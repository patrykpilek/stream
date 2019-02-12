import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item active">
                Streamer
            </Link>
            <div className="right menu">
                <Link to="/" className="ui item">
                    All Streams
                </Link>
            </div>
        </div>
    );
};

export default Header;