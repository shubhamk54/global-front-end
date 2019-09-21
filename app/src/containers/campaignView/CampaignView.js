import React from 'react';
import PropTypes from 'prop-types';
import Datatable from '../../components/DataTable/DataTable.js';

class CampaignView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        // TODO: move this business-logic to the selector.
        const currentDateEpoch = new Date().getTime();
        const data = this.props.data.map(dataRow => {
            const startDateEpoch = new Date(dataRow.startDate).getTime();
            const endDateEpoch = new Date(dataRow.endDate).getTime();
            return { ...dataRow, active: startDateEpoch <= currentDateEpoch && currentDateEpoch <= endDateEpoch ? { title: 'Active', type: 'success' } : { title: 'Inactive', type: 'danger' } };
        });

        return <React.Fragment>
            <Datatable
                data={data}
                columns={this.props.columns}
            />
        </React.Fragment>
    }
}

CampaignView.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

CampaignView.defaultProps = {
    data: [
        { "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "3/9/2018", "active": "Active", "Budget": 88377 },
        { "id": 2, "name": "Jaxspan", "startDate": "11/21/2017", "endDate": "2/21/2018", "active": "Active", "Budget": 608715 },
        { "id": 3, "name": "Miboo", "startDate": "11/1/2017", "endDate": "6/20/2017", "active": "In-Active", "Budget": 239507 },
        { "id": 4, "name": "Trilith", "startDate": "8/25/2017", "endDate": "11/30/2019", "active": "Active", "Budget": 179838 },
        { "id": 5, "name": "Layo", "startDate": "11/28/2017", "endDate": "3/10/2018", "active": "In-Active", "Budget": 837850 },
        { "id": 6, "name": "Photojam", "startDate": "7/25/2017", "endDate": "6/23/2017", "active": "Active", "Budget": 858131 },
        { "id": 7, "name": "Blogtag", "startDate": "6/27/2017", "endDate": "12/15/2019", "Budget": 109078 },
        { "id": 9, "name": "Zoomcast", "startDate": "9/6/2017", "endDate": "11/10/2017", "Budget": 301919 },
        { "id": 8, "name": "Rhyzio", "startDate": "10/13/2017", "endDate": "1/25/2018", "Budget": 272552 },
        { "id": 10, "name": "Realbridge", "startDate": "3/5/2018", "endDate": "11/2/2019 ", "active": "Active", "Budget": 505602 }
    ],
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

export default CampaignView;