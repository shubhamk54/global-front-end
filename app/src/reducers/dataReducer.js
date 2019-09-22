import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.campaignData, action) {
    switch (action.type) {
        case types.FETCH_CAMPAIGN_DATA:
            return {
                campaignData: { ...action.campaignData, gridData: initialState.campaignData.gridData },
            };
        default:
            return { campaignData: state };
    }
}
