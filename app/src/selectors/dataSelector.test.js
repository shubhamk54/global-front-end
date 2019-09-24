import { campaignDataSelector, campaignNamesSelector } from './dataSelector';

const mockCampaignDataInput = [{ 'id': 1, 'name': 'Divavu', 'startDate': '9/19/2019', 'endDate': '9/20/2019', 'Budget': 88377 },
{ 'id': 2, 'name': 'Jaxspan', 'startDate': '1/21/2019', 'endDate': '6/21/2019', 'Budget': 608715 },
{ 'id': 3, 'name': 'Miboo', 'startDate': '3/1/2019', 'endDate': '6/20/2019', 'Budget': 239507 },
{ 'id': 5, 'name': 'Layo', 'startDate': '1/1/2019', 'endDate': '3/10/2019', 'Budget': 837850 }];

const mockCampaignNames = ['Divavu', 'Jaxspan', 'Miboo', 'Layo'];

const mockCampaignDataOutput = [{ 'id': 1, 'name': 'Divavu', 'startDate': '9/19/2019', 'endDate': '9/20/2019', 'Budget': 88377, 'active': { 'title': 'Inactive', 'type': 'danger', } },
{ 'id': 2, 'name': 'Jaxspan', 'startDate': '1/21/2019', 'endDate': '6/21/2019', 'Budget': 608715, 'active': { 'title': 'Inactive', 'type': 'danger', } },
{ 'id': 3, 'name': 'Miboo', 'startDate': '3/1/2019', 'endDate': '6/20/2019', 'Budget': 239507, 'active': { 'title': 'Inactive', 'type': 'danger', } },
{ 'id': 5, 'name': 'Layo', 'startDate': '1/1/2019', 'endDate': '3/10/2019', 'Budget': 837850, 'active': { 'title': 'Inactive', 'type': 'danger', } }];

describe('Test campaign data business logic extraction', () => {

    test('Test for empty i/p grid data', () => {
        expect(campaignDataSelector({ gridData: [] })).toEqual([]);
    });

    test('Test to get similar i/p data as no filter applied', () => {
        expect(campaignDataSelector({ gridData: mockCampaignDataInput })).toEqual(mockCampaignDataOutput);
    });

    test('Test output data when date filter applied', () => {
        expect(campaignDataSelector({ gridData: mockCampaignDataInput, startDate: new Date(2019, 8, 19), endDate: new Date(2019, 8, 20) })).toHaveLength(1);
    });

    test('Test output data when name filter applied as pattern', () => {
        expect(campaignDataSelector({ gridData: mockCampaignDataInput, startDate: new Date(2018, 2, 1), endDate: new Date(2019, 11, 12), searchValue: 'a' })).toHaveLength(3);
    });


    test('Test output data when exact name filter is applied', () => {
        expect(campaignDataSelector({ gridData: mockCampaignDataInput, startDate: new Date(2018, 2, 1), endDate: new Date(2019, 11, 12), searchValue: 'Layo' })).toEqual([{
            id: 5,
            name: 'Layo',
            startDate: '1/1/2019',
            endDate: '3/10/2019',
            Budget: 837850,
            active: { title: 'Inactive', type: 'danger' }
        }]);
    });

});


describe('Test campaign data drop-down list names', () => {

    test('Test for empty list of names from empty data', () => {
        expect(campaignNamesSelector([])).toEqual([]);
    });

    test('Test for list of names from available data', () => {
        expect(campaignNamesSelector(mockCampaignDataInput)).toEqual(mockCampaignNames);
    });

});
