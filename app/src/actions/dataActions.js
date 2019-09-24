import * as types from './actionTypes';
import { validateCampaignData } from '../utils/dataUtils';

export function fetchCampaignDataAction(startDate, endDate, searchValue = '') {
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

export function addCampaignDataAction(gridData) {
  const { isDataValidated, validationMsg } = validateCampaignData(gridData);

  return isDataValidated ? {
    type: types.ADD_CAMPAIGN_DATA,
    receivedAt: Date.now(),
    gridData,
    noDataMessage: 'Please update criteria using available filters',
  } : {
    type: types.INVALID_CAMPAIGN_DATA,
    validationMsg,
  };
}
