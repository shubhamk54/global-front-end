import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Main from './Main.js';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layout-wrapper">
        <Main {...this.props} />
      </div>
    );
  }
}

App.propTypes = {
};


export default withRouter(App);
