import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.campaignData, action) {
    switch (action.type) {
        case types.FETCH_CAMPAIGN_DATA:
            return {
                campaignData: { ...action.campaignData, gridData: initialState.campaignData.gridData },
            };

        case types.ADD_CAMPAIGN_DATA:
            return {
                campaignData: { gridData: action.gridData }
            };
        case types.INVALID_CAMPAIGN_DATA:
            return {
                campaignData: {
                    gridData: [],
                    errorMsg: action.validationMsg,
                }
            };

        default:
            return { campaignData: state };
    }
}
