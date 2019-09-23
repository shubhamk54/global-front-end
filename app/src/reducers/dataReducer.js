import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataReducer(state = initialState.campaignData, action) {
  switch (action.type) {
    case types.FETCH_CAMPAIGN_DATA:
      return {
        campaignData: {
          ...state.campaignData,
          ...action.campaignData,
        },
      };

    case types.ADD_CAMPAIGN_DATA:
      return {
        campaignData: {
          gridData: action.gridData,
          dataDesc: action.noDataMessage,
          enableFilters: true,
        },
      };
    case types.INVALID_CAMPAIGN_DATA:
      return {
        campaignData: {
          gridData: [],
          dataDesc: action.validationMsg,
        },
      };

    default:
      return { campaignData: state };
  }
}
