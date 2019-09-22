import * as types from './actionTypes';

export function fetchCampaignDataAction(startDate, endDate, searchValue = "") {
  
  return {
    type: types.FETCH_CAMPAIGN_DATA,
    receivedAt: Date.now(),
    campaignData: {
      startDate,
      endDate,
      searchValue,
    },
  };
}