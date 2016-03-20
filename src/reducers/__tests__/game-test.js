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
		let state = {...initialState};

		let action = ActionCreators.play([1,2]);

		let newState = reducer(state, action);

		expect(newState.spaces[1]).not.toBe(undefined);
		expect(newState.spaces[1][2]).not.toBe(undefined);
		expect(newState.spaces[1][2].player).toBe(0);
	});

	it('should update win progress when spaces are played', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([1,1])); // X on row1, col1, diag, and antiDiag
		newState = reducer(newState, ActionCreators.play([0,1])); // O on row0 and col1
		newState = reducer(newState, ActionCreators.play([2,2])); // X on row2, col2, and diag
		newState = reducer(newState, ActionCreators.play([0,2])); // O on row0, col2, and antiDiag

		// Moves under test:
		// - O O
		// - X -
		// - - X

		expected = {
			row0: [0,2],
			row1: [1,0],
			col1: [1,1],
			col2: [1,1],
			diag: [2,0],
			antiDiag: [1,1]
		};

		expect(newState.winProgress.row0).toEqual(expected.row0);
		expect(newState.winProgress.row1).toEqual(expected.row1);
		expect(newState.winProgress.col1).toEqual(expected.col1);
		expect(newState.winProgress.col2).toEqual(expected.col2);
		expect(newState.winProgress.diag).toEqual(expected.diag);
		expect(newState.winProgress.antiDiag).toEqual(expected.antiDiag);
	});

	it('should declare winner, stop the game, and show modal when ROW is full', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([1,0])); // X
		newState = reducer(newState, ActionCreators.play([0,0])); // O
		newState = reducer(newState, ActionCreators.play([1,1])); // X
		newState = reducer(newState, ActionCreators.play([0,1])); // O
		newState = reducer(newState, ActionCreators.play([2,0])); // X
		newState = reducer(newState, ActionCreators.play([0,2])); // O

		// Moves under test:
		// O O O
		// X X -
		// X - -

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(1);
		expect(newState.showModal).toBe(true);
	});

	it('should declare winner, stop the game, and show modal when COLUMN is full', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([0,0])); // X
		newState = reducer(newState, ActionCreators.play([0,1])); // O
		newState = reducer(newState, ActionCreators.play([1,0])); // X
		newState = reducer(newState, ActionCreators.play([1,2])); // O
		newState = reducer(newState, ActionCreators.play([2,0])); // X

		// Moves under test:
		// X O O
		// X - -
		// X - -

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(0);
		expect(newState.showModal).toBe(true);
	});

	it('should declare winner, stop the game, and show modal when DIAG is full', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([0,0])); // X
		newState = reducer(newState, ActionCreators.play([0,1])); // O
		newState = reducer(newState, ActionCreators.play([1,1])); // X
		newState = reducer(newState, ActionCreators.play([0,2])); // O
		newState = reducer(newState, ActionCreators.play([2,2])); // X

		// Moves under test:
		// X O O
		// - X -
		// - - X

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(0);
		expect(newState.showModal).toBe(true);
	});

	it('should declare winner, stop the game, and show modal when ANTIDIAG is full', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([0,0])); // X
		newState = reducer(newState, ActionCreators.play([2,0])); // O
		newState = reducer(newState, ActionCreators.play([0,1])); // X
		newState = reducer(newState, ActionCreators.play([1,1])); // O
		newState = reducer(newState, ActionCreators.play([1,0])); // X
		newState = reducer(newState, ActionCreators.play([0,2])); // O

		// Moves under test:
		// X X O
		// X O -
		// O - -

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(1);
		expect(newState.showModal).toBe(true);
	});

	it('should declare draw game, stop the game, and show modal when spaces are full and there is no winner', () =>
	{
		let newState;
		let expected;

		// Play a few spaces
		newState = reducer(initialState, ActionCreators.play([0,0])); // X
		newState = reducer(newState, ActionCreators.play([0,1])); // O
		newState = reducer(newState, ActionCreators.play([0,2])); // X
		newState = reducer(newState, ActionCreators.play([1,1])); // O
		newState = reducer(newState, ActionCreators.play([1,0])); // X
		newState = reducer(newState, ActionCreators.play([2,0])); // O
		newState = reducer(newState, ActionCreators.play([1,2])); // X
		newState = reducer(newState, ActionCreators.play([2,2])); // O
		newState = reducer(newState, ActionCreators.play([2,1])); // X

		// Moves under test:
		// X O X
		// X O X
		// O X O

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(false);
		expect(newState.draw).toBe(true);
		expect(newState.showModal).toBe(true);
	});

	it('should support larger board sizes', () =>
	{
		// Testing for winner on a 4x4 board

		let newState;
		let expected;

		// Increase board size
		newState = reducer(initialState, ActionCreators.updateBoardSize(4));

		// Play a few spaces
		newState = reducer(newState, ActionCreators.play([0,0])); // X
		newState = reducer(newState, ActionCreators.play([0,3])); // O
		newState = reducer(newState, ActionCreators.play([1,0])); // X
		newState = reducer(newState, ActionCreators.play([1,2])); // O
		newState = reducer(newState, ActionCreators.play([1,1])); // X
		newState = reducer(newState, ActionCreators.play([2,1])); // O
		newState = reducer(newState, ActionCreators.play([2,0])); // X
		newState = reducer(newState, ActionCreators.play([3,0])); // O

		// Moves under test:
		// X - - O
		// X X O -
		// X O - -
		// O - - -

		expect(newState.status).toBe(Constants.STATUS_STOPPED);
		expect(newState.winner).toBe(1);
		expect(newState.showModal).toBe(true);
	});

});