import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./style.css"

class HomeHeader extends Component {
  render() {
    return (
      <div className="homeHeader">
        <header className="homeHeader__wrapper">
          <Link className="homeHeader__city" to="">北京</Link>
          <Link className="homeHeader__search" to="/search">输入商户名、地点</Link>
          <Link className="homeHeader__self" to="/user">
            <div className="homeHeader__portrait"/>
          </Link>
        </header>
      </div>
    );
  }
}

export default HomeHeader;