jest.unmock('../Flash');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Flash from '../Flash';
import * as Constants from '../../reducers/_constants';

const renderer = TestUtils.createRenderer();

const baseProps = {
	gameStatus: Constants.STATUS_STOPPED,
	winner: false,
	draw: false
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

	renderer.render(<Flash {...props} />);
	return renderer.getRenderOutput();
};

function renderIntoDoc(overrideProps)
{
	let props = getProps(overrideProps);

	return TestUtils.renderIntoDocument(<Flash {...props} />);
};

describe('components/Flash', () =>
{
	it('should be a <div>', () =>
	{
		let output = renderShallow();

		expect(output.type).toBe('div');
	});

	it('should have `FlashWrapper` className', () =>
	{
		let output = renderShallow();

		expect(output.props.className).toBe('FlashWrapper');
	});

	it('should display winner message if there is a winner', () =>
	{
		let tree = renderIntoDoc({
			winner: 1 // player 1 won
		});

		// Expect Flash ref to be there
		expect(tree.refs.Flash).not.toBe(undefined);

		// Expect PlayerIcon ref to be there
		expect(tree.refs.PlayerIcon).not.toBe(undefined);

		// Expect 'wins!'
		expect(tree.refs.Flash.innerHTML).toContain('wins!');
	});

	it('should display Flash div if game is a draw', () =>
	{
		let tree = renderIntoDoc({
			draw: true
		});

		// Expect 'Flash' ref to be there
		expect(tree.refs.Flash).not.toBe(undefined);

		// Expect 'Draw game!'
		expect(tree.refs.Flash.innerHTML).toContain('Draw game!');
	});

	it('should not display Flash div if game is running', () =>
	{
		let tree = renderIntoDoc({
			gameStatus: Constants.STATUS_RUNNING
		});

		// Expect Flash ref not to be there
		expect(tree.refs.Flash).toBe(undefined);
	});

});