import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.dataList, action) {
    switch (action.type) {

        case types.FETCH_DATA:
            return Object.assign({}, {
                tabular: state.tabular,
                isFetching: true,
            }); default:
            return state;
    }
}
