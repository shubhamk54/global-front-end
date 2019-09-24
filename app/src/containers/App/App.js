import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Main from './Main.js';

export class App extends Component {
  render() {
    return (
      <div className="layout-wrapper">
        <Main {...this.props} />
      </div>
    );
  }
}

export default withRouter(App);
