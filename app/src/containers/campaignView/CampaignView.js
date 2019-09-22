import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Datatable from '../../components/DataTable/DataTable.js';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import SearchInput from '../../components/SearchInput/SearchInput.js';

// redux actions & selectors
import { fetchCampaignDataAction } from '../../actions/dataActions.js';
import { campaignDataSelector, campaignNamesSelector } from '../../selectors/dataSelector.js';

// Styles
import 'react-day-picker/lib/style.css';

const FORMAT = 'MM/dd/yyyy';

import {
    formatDate,
    parseDate
} from '../../utils/dateUtils.js';


export class CampaignView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            userInput: "",
        };
        this.calendarDayChange = this.calendarDayChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

    }

    componentWillMount() {
        this.props.fetchCampaignData();
    }

    calendarDayChange = (type) => (day) => {
        this.setState({
            [type]: day,
        }, () => this.props.fetchCampaignData(this.state.startDate, this.state.endDate, this.state.userInput));
    }

    onSearchChange(name, value, stopProgate) {
        this.setState({
            [name]: value,
        }, () => !stopProgate && this.props.fetchCampaignData(this.state.startDate, this.state.endDate, this.state.userInput));
    }

    render() {
        // TODO: move this business-logic to the selector.
        const currentDateEpoch = new Date().getTime();
        let formattedData = [];
        this.props.gridData.forEach(dataRow => {
            const startDateEpoch = new Date(dataRow.startDate).getTime();
            const endDateEpoch = new Date(dataRow.endDate).getTime();
            formattedData = formattedData.concat({
                ...dataRow,
                active: startDateEpoch <= currentDateEpoch && currentDateEpoch <= endDateEpoch ? { title: 'Active', type: 'success' } : { title: 'Inactive', type: 'danger' }
            });
        });

        return <React.Fragment>

            <DayPickerInput
                selectedDays={this.state.startDate}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`Start date`}
                onDayChange={this.calendarDayChange('startDate')}
            />

            <DayPickerInput
                selectedDays={this.state.endDate}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`End date`}
                onDayChange={this.calendarDayChange('endDate')}
            />
            <SearchInput
                suggestedOptions={this.props.campaignNames}
                name='userInput'
                onChange={this.onSearchChange}
                value={this.state['userInput']}
            />
            <Datatable
                data={this.props.gridData}
                columns={this.props.columns}
            />
        </React.Fragment>
    }
}

CampaignView.propTypes = {
    gridData: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    fetchCampaignData: PropTypes.func.isRequired,
};

CampaignView.defaultProps = {
    columns: [
        {
            title: 'Id',
            dataKey: 'id',
        },
        {
            title: 'Name',
            dataKey: 'name'
        },
        {
            title: 'Start Date',
            dataKey: 'startDate'
        },
        {
            title: 'End Date',
            dataKey: 'endDate'
        },
        {
            title: 'Active',
            dataKey: 'active',
            type: 'pill',
        },
        {
            title: 'Budget',
            dataKey: 'Budget'
        },
    ]
}

function mapStateToProps(state) {
    return {
        gridData: campaignDataSelector(state.data.campaignData),
        campaignNames: campaignNamesSelector(state.data.campaignData.gridData),
    };
}


function mapDispatchToProps(dispatch) {
    return {
        fetchCampaignData: (startDate, endDate, name) => dispatch(fetchCampaignDataAction(startDate, endDate, name)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignView);