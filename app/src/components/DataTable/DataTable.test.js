import React from 'react';
import DataTable from './DataTable.js';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const fakeProps = {
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
    ],
    data: [{ "id": 1, "name": "Divavu", "active": { title: 'Active', type: 'success' }, "startDate": "9/19/2017", "endDate": "3/9/2018", "Budget": 88377 },
    { "id": 2, "name": "Jaxspan", "active": { title: 'Inactive', type: 'danger' }, "startDate": "11/21/2017", "endDate": "2/21/2018", "Budget": 608715 },
    { "id": 3, "name": "Miboo", "active": { title: 'Active', type: 'success' }, "startDate": "11/1/2017", "endDate": "6/20/2017", "Budget": 239507 },
    { "id": 4, "name": "Trilith", "active": { title: 'Inactive', type: 'danger' }, "startDate": "8/25/2017", "endDate": "11/30/2017", "Budget": 179838 },
    { "id": 5, "name": "Layo", "active": { title: 'Active', type: 'success' }, "startDate": "11/28/2017", "endDate": "3/10/2018", "Budget": 837850 }],
    currency: 'USD',
};

describe('Snapshot testing for DataTable component', () => {

    it('matches the snapshot', () => {
        const tree = renderer.create(<DataTable {...fakeProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('DataTable testing render with negative data', () => {

    it('DataTable should not renders any table for empty data', () => {
        const wrapper = mount(
            <DataTable data={[]} columns={[]} />
        );
        const table = wrapper.find('.data-table');
        expect(table.length).toBe(0);
    });

    it('DataTable should render with no currency', () => {
        const wrapper = mount(
            <DataTable data={fakeProps.data} columns={fakeProps.columns} />
        );
        const tableData = wrapper.instance().renderTableData(fakeProps.columns, fakeProps.data);
        expect(tableData).toHaveLength(fakeProps.data.length);
    });

});

describe('DataTable component function testing', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <DataTable {...fakeProps} />
        );
    });

    it('single table should render for Given column and data', () => {
        const table = wrapper.find('.data-table');
        expect(table.length).toBe(1);
    });

    it('Test for DataTable renders table column header for given list of column', () => {
        const tableColumns = wrapper.instance().renderTableHeader(fakeProps.columns);
        expect(tableColumns).toHaveLength(fakeProps.columns.length);
    });

    it('Test for DataTable renders table data for given list of data', () => {
        const tableData = wrapper.instance().renderTableData(fakeProps.columns, fakeProps.data);
        expect(tableData).toHaveLength(fakeProps.data.length);
    });

});
