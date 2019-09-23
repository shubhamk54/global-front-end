import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Datatable from '../../components/DataTable/DataTable.js';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import NoDataAvailable from '../../components/NoDataAvailable/NoDataAvailable.js';
import { Navbar, Row, Col } from "react-bootstrap";

// redux actions & selectors
import { fetchCampaignDataAction, addCampaignDataAction } from '../../actions/dataActions.js';
import { campaignDataSelector, campaignNamesSelector } from '../../selectors/dataSelector.js';

// Styles
import 'react-day-picker/lib/style.css';

//constants
const FORMAT = 'MM/dd/yyyy';
const INIT_DATA_OPS_MSG = 'Open browser console and call AddCampaigns() method to add you data. '
const SAMPLE_CAMPAIGN_DATA = '[\n  {"id":1,"name":"Photojam","startDate":"7/25/2018","endDate":"7/27/2019", "Budget":858131},\n  {"id":2,"name":"Realbridge","startDate":"03/05/2019","endDate":"12/12/2019 ","Budget":505602} \n ]';

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
        window.AddCampaigns = props.addCampaignData;
        console.log('***Call AddCampaigns method with below expected format*** \n', SAMPLE_CAMPAIGN_DATA);
        this.calendarDayChange = this.calendarDayChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

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

        return <React.Fragment>
            {this.props.enableFilters && <Navbar className="bg-light justify-content-between">
                <Row >
                    <Col>
                        <DayPickerInput
                            formatDate={formatDate}
                            format={FORMAT}
                            parseDate={parseDate}
                            placeholder={`Start date`}
                            onDayClick={this.handleDayClick}
                            onDayChange={this.calendarDayChange('startDate')}
                        />
                    </Col>
                    <Col >
                        <DayPickerInput
                            selectedDays={this.state.endDate}
                            formatDate={formatDate}
                            format={FORMAT}
                            parseDate={parseDate}
                            placeholder={`End date`}
                            onDayChange={this.calendarDayChange('endDate')}
                        />
                    </Col>
                </Row>
                <Col>
                    <SearchInput
                        suggestedOptions={this.props.campaignNames}
                        name='userInput'
                        onChange={this.onSearchChange}
                        value={this.state.userInput}
                        onSearchClick={() => this.props.fetchCampaignData(this.state.startDate, this.state.endDate, this.state.userInput)}
                    />
                </Col>
            </Navbar>
            }
            {this.props.gridData.length > 0 ? <Datatable
                data={this.props.gridData}
                columns={this.props.columns}
            />
                : <NoDataAvailable
                    title='Campaign data not available'
                    subTitle={this.props.dataDesc ? this.props.dataDesc : INIT_DATA_OPS_MSG}
                />
            }
        </React.Fragment>
    }
}

CampaignView.propTypes = {
    gridData: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    fetchCampaignData: PropTypes.func.isRequired,
    dataDesc: PropTypes.string,
    enableFilters: PropTypes.bool,
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
            dataKey: 'startDate',
            type: 'date',
        },
        {
            title: 'End Date',
            dataKey: 'endDate',
            type: 'date',
        },
        {
            title: 'Active',
            dataKey: 'active',
            type: 'pill',
        },
        {
            title: 'Budget',
            dataKey: 'Budget',
            type: 'amount',
        },
    ]
}

function mapStateToProps(state) {
    return {
        gridData: campaignDataSelector(state.data.campaignData),
        campaignNames: campaignNamesSelector(state.data.campaignData.gridData),
        dataDesc: state.data.campaignData.dataDesc,
        enableFilters: state.data.campaignData.enableFilters,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCampaignData: (startDate, endDate, name) => dispatch(fetchCampaignDataAction(startDate, endDate, name)),
        addCampaignData: (gridData) => dispatch(addCampaignDataAction(gridData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignView);