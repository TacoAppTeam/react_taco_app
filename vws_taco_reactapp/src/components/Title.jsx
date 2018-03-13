import React from 'react';
import {Link} from 'react-router-dom';

const Title = ({title}) => {
  return (
    <div className="title">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    </div>
  );
};

export default Title;
