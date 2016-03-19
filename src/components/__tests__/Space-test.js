jest.unmock('../Space');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Space from '../Space';
import PlayerIcon from '../PlayerIcon';
import * as Constants from '../../reducers/_constants';

const renderer = TestUtils.createRenderer();

const baseProps = {
	coords: [0,0],
	space: {},
	gameStatus: Constants.STATUS_STOPPED,
	dispatchPlay: () => {}
}

function getProps(overrideProps)
{
	if (overrideProps === undefined) {
		return baseProps;
	}

	return {...baseProps, ...overrideProps};
};

function renderShallow(overrideProps)
{
	let props = getProps(overrideProps);

	renderer.render(<Space {...props} />);
	return renderer.getRenderOutput();
};

function renderIntoDoc(overrideProps)
{
	let props = getProps(overrideProps);

	return TestUtils.renderIntoDocument(<Space {...props} />);
};

describe('components/Space', () =>
{
	it('should be a <div>', () =>
	{
		let output = renderShallow();

		expect(output.type).toBe('div');
	});

	it('should have `Space` className', () =>
	{
		let output = renderShallow();

		expect(output.props.className).toContain('Space');
	});

	it('should have --isLocked className if game is stopped', () =>
	{
		let output = renderShallow({ gameStatus: Constants.STATUS_STOPPED });

		expect(output.props.className).toContain('Space--isLocked');
	});

	it('should not have --isLocked className if game is not running', () =>
	{
		let output = renderShallow({ gameStatus: Constants.STATUS_RUNNING });

		expect(output.props.className).not.toContain('Space--isLocked');
	});

	it('should have --hasBeenPlayed className if space state contains player property', () =>
	{
		let output = renderShallow({
			space: {
				player: 0 // passing player property
			}
		});

		expect(output.props.className).toContain('Space--hasBeenPlayed');
	});

	it('should not have --hasBeenPlayed className if space state does not contain player property', () =>
	{
		let output = renderShallow({
			space: {}, // not passing player property
		});

		expect(output.props.className).not.toContain('Space--hasBeenPlayed');
	});

	it('should have a single child that is a ReactCSSTransitionGroup', () =>
	{
		let output = renderShallow();

		expect(output.props.children.type.displayName).toBe('ReactCSSTransitionGroup');
	});

	it('should have a player icon if space state contains player property', () =>
	{
		let tree = renderIntoDoc({
			space: {
				player: 0 // passing player property
			}
		});

		expect(tree.refs.PlayerIcon).not.toBe(undefined);
	});

	it('should not have a player icon if space state does not contain player property', () =>
	{
		let tree = renderIntoDoc({
			space: {}, // not passing player property
		});

		expect(tree.refs.PlayerIcon).toBe(undefined);
	});

	it('should pass player prop to player icon', () =>
	{
		let tree = renderIntoDoc({
			space: {
				player: 1
			}
		});

		let playerIcons = TestUtils.scryRenderedComponentsWithType(tree, PlayerIcon);

		expect(playerIcons[0].props.player).toBe(1);
	});

	it('should call dispatchPlay prop with coords array argument when it is clicked if game is running and space has not been played', () =>
	{
		let coords = [2,1];

		let mockDispatchPlay = jest.genMockFunction();

		let tree = renderIntoDoc({
			coords: coords,
			space: {},
			gameStatus: Constants.STATUS_RUNNING,
			dispatchPlay: mockDispatchPlay
		});

		let spaceNode = ReactDOM.findDOMNode(tree);

		// No calls yet
		expect(mockDispatchPlay.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(spaceNode);

		// One call
		expect(mockDispatchPlay.mock.calls.length).toBe(1);

		// Check first call, first argument
		expect(mockDispatchPlay.mock.calls[0][0]).toEqual([2,1]);
	});

	it('should not call dispatchPlay prop when it is clicked if game is not running', () =>
	{
		let mockDispatchPlay = jest.genMockFunction();

		let tree = renderIntoDoc({
			gameStatus: Constants.STATUS_STOPPED, // game is stopped
			dispatchPlay: mockDispatchPlay
		});

		let spaceNode = ReactDOM.findDOMNode(tree);

		expect(mockDispatchPlay.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(spaceNode);

		// Should still be 0 calls
		expect(mockDispatchPlay.mock.calls.length).toBe(0);
	});

	it('should not call dispatchPlay prop when it is clicked if space has already been played', () =>
	{
		let mockDispatchPlay = jest.genMockFunction();

		let tree = renderIntoDoc({
			space: {
				player: 1 // space has been played
			},
			gameStatus: Constants.STATUS_RUNNING,
			dispatchPlay: mockDispatchPlay
		});

		let spaceNode = ReactDOM.findDOMNode(tree);

		expect(mockDispatchPlay.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(spaceNode);

		// Should still be 0 calls
		expect(mockDispatchPlay.mock.calls.length).toBe(0);
	});

});