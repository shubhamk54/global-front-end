import React from 'react';
import PropTypes from 'prop-types';

class CampaignView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5, 6, 7]
        };
    }
    render() {
        return <div>{this.props.title}
            {this.state.data.map(element => <li>{element}</li>)}
        </div>
    }
}

CampaignView.propTypes = {
    title: PropTypes.string.isRequired,
};

CampaignView.defaultProps = {
    title: 'Rendering CampaignView page',
}

export default CampaignView;
