import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import CampaignView from 'Containers/campaignView/CampaignView.js';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/list"
            render={(props) => (
              <CampaignView {...props} />
            )}
          />
          <Redirect path="*" to="/list" />
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
};

Main.defaultProps = {
};


export default (Main);
