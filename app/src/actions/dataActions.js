import * as types from './actionTypes';
import { validateCampaignData } from '../utils/dataUtils.js';

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

export function addCampaignDataAction(gridData) {
  const { isDataValidated, validationMsg } = validateCampaignData(gridData);
  console.log('ADD_CAMPAIGN_DATA with', gridData);

  return isDataValidated ? {
    type: types.ADD_CAMPAIGN_DATA,
    receivedAt: Date.now(),
    gridData,
  } : {
      type: types.INVALID_CAMPAIGN_DATA,
      validationMsg,
    }
}