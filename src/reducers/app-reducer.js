// Immutable
import { Map } from 'immutable';
// Constants
import * as actionTypes from '../constants/action-types';

const initialState = Map({
	token: '',
	loginError: ''
});

export default function appReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_TOKEN:
			if (action.token) {
				localStorage.token = action.token;
			} else {
				delete localStorage.token;
			}
		    return state.set('token', action.token).set('loginError', '');
		case actionTypes.LOGIN_FAILURE:
		    return state.set('token', '').set('loginError', action.error);
		default:
			return state;
	}
};
