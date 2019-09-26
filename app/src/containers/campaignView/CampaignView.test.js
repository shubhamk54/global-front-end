
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CampaignView from './CampaignView.js';
import renderer from 'react-test-renderer';

const mockStore = configureMockStore();

let store = mockStore({
    data: {
        campaignData: {
            gridData: [],
            dataDesc: "Please update criteria using available filters",
            enableFilters: true,
        }
    }
});

const fakeValiddata = [
    {
        id: 1, name: 'Divavu', active: { title: 'Active', type: 'success' }, startDate: '9/19/2017', endDate: '3/9/2018', Budget: 88377,
    },
    {
        id: 2, name: 'Jaxspan', active: { title: 'Inactive', type: 'danger' }, startDate: '11/21/2017', endDate: '2/21/2018', Budget: 608715,
    },
    {
        id: 3, name: 'Miboo', active: { title: 'Active', type: 'success' }, startDate: '11/1/2017', endDate: '6/20/2017', Budget: 239507,
    },
    {
        id: 4, name: 'Trilith', active: { title: 'Inactive', type: 'danger' }, startDate: '8/25/2017', endDate: '11/30/2017', Budget: 179838,
    },
    {
        id: 5, name: 'Layo', active: { title: 'Active', type: 'success' }, startDate: '11/28/2017', endDate: '3/10/2018', Budget: 837850,
    }];

const fakeProps = {
    columns: [
        {
            title: 'Id',
            dataKey: 'id',
        },
        {
            title: 'Name',
            dataKey: 'name',
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
    ],
    data: [{
        id: 1, name: 'Divavu', active: { title: 'Active', type: 'success' }, startDate: '9/19/2017', endDate: '3/9/2018', Budget: 88377,
    },
    {
        id: 2, name: 'Jaxspan', active: { title: 'Inactive', type: 'danger' }, startDate: '11/21/2017', endDate: '2/21/2018', Budget: 608715,
    },
    {
        id: 3, name: 'Miboo', active: { title: 'Active', type: 'success' }, startDate: '11/1/2017', endDate: '6/20/2017', Budget: 239507,
    },
    {
        id: 4, name: 'Trilith', active: { title: 'Inactive', type: 'danger' }, startDate: '8/25/2017', endDate: '11/30/2017', Budget: 179838,
    },
    {
        id: 5, name: 'Layo', active: { title: 'Active', type: 'success' }, startDate: '11/28/2017', endDate: '3/10/2018', Budget: 837850,
    }],
    fetchCampaignData: () => jest.fn(),
    dataDesc: 'test test',
    enableFilters: true,
};

describe('CampaignView snapshot testing', () => {
    it('matches the snapshot', () => {
        let wrapper;
        wrapper = mount(
            <Provider store={store}>
                <CampaignView {...fakeProps} />
            </Provider>,
        );
        wrapper.update();
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('CampaignView container testing with no grid data supplied yet', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <CampaignView {...fakeProps} />
            </Provider>,
        );
    });

    it('should contain start and end date calendar controls', () => {
        const dayPickerInputs = wrapper.find('.DayPickerInput');
        expect(dayPickerInputs.children()).toHaveLength(2);
    });

    it('should contain input component for search', () => {
        const searchInput = wrapper.find('.search-input');
        expect(searchInput.children()).toHaveLength(2);
    });

    it('should contain no data available component', () => {
        const noData = wrapper.find('.no-data');
        expect(noData.children()).toHaveLength(2);
    });
});


describe('CampaignView container testing when data is avilable', () => {
    let wrapper;
    let dataStore = mockStore({
        data: {
            campaignData: {
                gridData: fakeValiddata,
                dataDesc: "Please update criteria using available filters",
                enableFilters: true,
            }
        }
    });

    beforeEach(() => {

        wrapper = mount(
            <Provider store={dataStore}>
                <CampaignView {...fakeProps} />
            </Provider>,
        );
    });

    it('should contain data table component', () => {
        const dataTable = wrapper.find('.data-table');
        expect(dataTable.children()).toHaveLength(1);
    });

});