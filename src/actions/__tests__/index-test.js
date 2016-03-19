jest.unmock('../index');

import * as ActionCreators from '../index';
import * as ActionTypes from '../types';

describe('actions', () =>
{

	it('(start) should create an action to start the game', () =>
	{
		let expectedAction = {
			type: ActionTypes.START
		};

		expect(ActionCreators.start()).toEqual(expectedAction);
	});

	it('(play) should create an action to play at specified coords', () =>
	{
		let coords = [3,2];

		let expectedAction = {
			type: ActionTypes.PLAY,
			coords: coords
		};

		expect(ActionCreators.play(coords)).toEqual(expectedAction);
	});

	it('(updateBoardSize) should create an action to change the board to a specified size', () =>
	{
		let boardSize = 9;

		let expectedAction = {
			type: ActionTypes.UPDATE_SIZE,
			size: boardSize
		};

		expect(ActionCreators.updateBoardSize(boardSize)).toEqual(expectedAction);
	});

	it('(showModal) should create an action to show the modal', () =>
	{
		let expectedAction = {
			type: ActionTypes.SHOW_MODAL
		};

		expect(ActionCreators.showModal()).toEqual(expectedAction);
	});

	it('(dismissModal) should create an action to hide the modal', () =>
	{
		let expectedAction = {
			type: ActionTypes.DISMISS_MODAL
		};

		expect(ActionCreators.dismissModal()).toEqual(expectedAction);
	});

});