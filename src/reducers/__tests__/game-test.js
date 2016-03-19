jest.unmock('../game');
jest.unmock('../../actions');
jest.unmock('../_utils');

import reducer from '../game';
import * as Constants from '../_constants';
import * as ActionCreators from '../../actions';
import * as ActionTypes from '../../actions/types';

const initialState = {
	status: Constants.STATUS_RUNNING,
	boardSize: 3,
	currentPlayer: 0,
	winner: false,
	draw: false,
	spaces: [],
	winProgress: {},
	winCount: [0,0],
	showModal: false
};

describe('reducers/game', () =>
{
	it('should return initial state if none provided', () =>
	{
		let expectedState = initialState;

		expect(reducer(undefined, {})).toEqual(expectedState);
	});

	it('should handle START actions', () =>
	{
		let state = {...initialState, ...{
			status: Constants.STATUS_STOPPED
		}};

		let action = ActionCreators.start();

		expect(reducer(state, action).status)
		.toBe(Constants.STATUS_RUNNING);
	});

	it('should handle UPDATE_SIZE actions', () =>
	{
		let state = {...initialState, ...{
			boardSize: 3
		}};

		let action = ActionCreators.updateBoardSize(4);

		expect(reducer(state, action).boardSize)
		.toBe(4);
	});

	it('should handle SHOW_MODAL actions', () =>
	{
		let state = {...initialState, ...{
			showModal: false
		}};

		let action = ActionCreators.showModal();

		expect(reducer(state, action).showModal)
		.toBe(true);
	});

	it('should handle DISMISS_MODAL actions', () =>
	{
		let state = {...initialState, ...{
			showModal: true
		}};

		let action = ActionCreators.dismissModal();

		expect(reducer(state, action).showModal)
		.toBe(false);
	});

	it('should add a space entry when a space is played', () =>
	{
		let state = initialState;

		let action = ActionCreators.play([1,2]);

		let newState = reducer(state, action);

		expect(newState.spaces[1]).not.toBe(undefined);
		expect(newState.spaces[1][2]).not.toBe(undefined);
	});

	// it('should update win progress when spaces are played', () =>
	// {
	// 	let newState;
	// 	let expected;

	// 	// Play a few spaces
	// 	newState = reducer(initialState, ActionCreators.play([1,1])); // X on row1, col1, diag, and antiDiag
	// 	newState = reducer(newState, ActionCreators.play([0,1])); // O on row0 and col1
	// 	newState = reducer(newState, ActionCreators.play([2,2])); // X on row2, col2, and diag
	// 	newState = reducer(newState, ActionCreators.play([0,2])); // O on row0, col2, and antiDiag

	// 	expected = {
	// 		row0: [0,2],
	// 		row1: [1,0],
	// 		col1: [1,1],
	// 		col2: [1,1],
	// 		diag: [2,0],
	// 		antiDiag: [1,1]
	// 	};

	// 	expect(newState.winProgress).toEqual(expected);
	// });

});