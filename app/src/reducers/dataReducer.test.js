import dataReducer from './dataReducer';
import * as types from '../actions/actionTypes';

const fakeInititialState = {
  gridData: [],
  dataDesc: undefined,
};

const fakeValidGridData = [
  {
    id: 1, name: 'Photojam', startDate: '7/25/2018', endDate: '7/27/2019', Budget: 858131,
  },
  {
    id: 2, name: 'Realbridge', startDate: '03/05/2019', endDate: '12/12/2019 ', Budget: 505602,
  },
];

const fakeValidGridDataReduxResponse = {
  campaignData: {
    dataDesc: 'Please update criteria using available filters',
    enableFilters: true,
    gridData: fakeValidGridData,
  },
};
const fakeInValidGridDataReduxResponse = {
  campaignData: {
    dataDesc: 'Given data is not array.',
    gridData: [],
  },
};

const actionOutputData = {
  startDate: '09/09/2019',
  endDate: '09/12/2019',
  searchValue: 'a',
};

describe('tests for data reducer', () => {
  it('should return the initial state', () => {
    expect(dataReducer(undefined, {
      type: types.FETCH_CAMPAIGN_DATA,
    })).toEqual({
      campaignData: {},
    });
  });

  it('should test fetch campaign data call from store', () => {
    expect(
      dataReducer(fakeInititialState, {
        type: types.FETCH_CAMPAIGN_DATA,
        campaignData: actionOutputData,
      }),
    ).toEqual({
      campaignData: actionOutputData,
    });
  });

  it('should test add campaign data call to the store', () => {
    expect(
      dataReducer(fakeInititialState, {
        type: types.ADD_CAMPAIGN_DATA,
        gridData: fakeValidGridData,
        noDataMessage: 'Please update criteria using available filters',
      }),
    ).toEqual(fakeValidGridDataReduxResponse);
  });


  it('should test add invalid campaign data to the store', () => {
    expect(
      dataReducer(fakeInititialState, {
        type: types.INVALID_CAMPAIGN_DATA,
        gridData: {},
        validationMsg: 'Given data is not array.',
      }),
    ).toEqual(fakeInValidGridDataReduxResponse);
  });

  it('should match default case and return given current state', () => {
    expect(
      dataReducer(undefined, {
        type: types.SOME_INVALID_ACTION,
      }),
    ).toEqual({ campaignData: fakeInititialState });
  });
});
