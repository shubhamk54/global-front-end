import { fetchCampaignDataAction, addCampaignDataAction } from './dataActions.js';
import * as types from './actionTypes';

const actionOutputData = {
    startDate: '09/09/2019',
    endDate: '09/12/2019',
    searchValue: 'a',
};

const fakeValidGridData = [
    { "id": 1, "name": "Photojam", "startDate": "7/25/2018", "endDate": "7/27/2019", "Budget": 858131 },
    { "id": 2, "name": "Realbridge", "startDate": "03/05/2019", "endDate": "12/12/2019 ", "Budget": 505602 }
];

const fakeInvalidData = { "id": 1, "name": "Photojam", "startDate": "7/25/2018", "endDate": "7/27/2019", "Budget": 858131 };

describe('Test action trigger', () => {
    it('should create an action fetchCampaignDataAction to fetch campaign data from redux store', () => {
        const startDate = '09/09/2019';
        const endDate = '09/12/2019';
        const searchValue = 'a';

        const expectedAction = {
            type: types.FETCH_CAMPAIGN_DATA,
            campaignData: {
                ...actionOutputData
            },
        }
        expect(fetchCampaignDataAction(startDate, endDate, searchValue)).toEqual(expectedAction)
    });

    it('should create an action addCampaignDataAction for VALID data to add campaign data in redux store', () => {

        const expectedAction = {
            type: types.ADD_CAMPAIGN_DATA,
            gridData: fakeValidGridData,
            noDataMessage: 'Please update criteria using available filters',
        }
        expect(addCampaignDataAction(fakeValidGridData)).toEqual(expectedAction)
    });

    it('should create an action addCampaignDataAction for INVALID data to add campaign data in redux store', () => {

        const expectedAction = {
            type: types.INVALID_CAMPAIGN_DATA,
            validationMsg: 'Given data is not array.',
        }
        expect(addCampaignDataAction(fakeInvalidData)).toEqual(expectedAction)
    });
})