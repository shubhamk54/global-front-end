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
        window.AddCampaigns = this.props.addCampaignData;
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

            <Navbar className="bg-light justify-content-between">
                <Row >
                    <Col>
                        <DayPickerInput
                            formatDate={formatDate}
                            format={FORMAT}
                            parseDate={parseDate}
                            placeholder={`Start date`}
                            dayPickerProps={{
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}

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
            {this.props.gridData.length > 0 ? <Datatable
                data={this.props.gridData}
                columns={this.props.columns}
            />
                : <NoDataAvailable
                    title='Campaign data not available'
                    subTitle={this.props.errorMsg ? this.props.errorMsg : 'Open browser console and call AddCampaigns() method to add you data. '}
                />
            }
        </React.Fragment>
    }
}

CampaignView.propTypes = {
    gridData: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    fetchCampaignData: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
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
        errorMsg: state.data.campaignData.errorMsg,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCampaignData: (startDate, endDate, name) => dispatch(fetchCampaignDataAction(startDate, endDate, name)),
        addCampaignData: (gridData) => dispatch(addCampaignDataAction(gridData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignView);