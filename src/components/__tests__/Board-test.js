jest.unmock('../Board');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Board from '../Board';
import Space from '../Space';
import * as Constants from '../../reducers/_constants';

const renderer = TestUtils.createRenderer();

const baseProps = {
	gameStatus: Constants.STATUS_STOPPED,
	boardSize: 3,
	spaces: {},
	boundActions: {
		play: () => {},
		showModal: () => {}
	}
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

	renderer.render(<Board {...props} />);
	return renderer.getRenderOutput();
};

function renderIntoDoc(overrideProps)
{
	let props = getProps(overrideProps);

	return TestUtils.renderIntoDocument(<Board {...props} />);
};

describe('components/Board', () =>
{
	it('should be a <section>', () =>
	{
		let output = renderShallow();

		expect(output.type).toBe('section');
	});

	it('should have `Board` className', () =>
	{
		let output = renderShallow();

		expect(output.props.className).toContain('Board');
	});

	it('should have a reset button', () =>
	{
		let tree = renderIntoDoc();

		expect(tree.refs.btnResetGame).not.toBe(undefined);
	});

	it('should call show modal action creator when reset game button is clicked', () =>
	{
		let mockShowModal = jest.genMockFunction();

		let tree = renderIntoDoc({
			boundActions: {
				showModal: mockShowModal,
				play: () => {}
			}
		});

		expect(mockShowModal.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(tree.refs.btnResetGame);

		expect(mockShowModal.mock.calls.length).toBe(1);
	});

	it('should have a number of rows equal to the board size', () =>
	{
		let tree = renderIntoDoc({
			boardSize: 5
		});

		let rows = TestUtils.scryRenderedDOMComponentsWithClass(tree, 'Board__row');

		expect(rows.length).toBe(5);
	});

	it('should render a number of Space components equal to the board size squared', () =>
	{
		let boardSize = 4;

		let tree = renderIntoDoc({
			boardSize: boardSize
		});

		let spaces = TestUtils.scryRenderedComponentsWithType(tree, Space);

		expect(spaces.length).toBe(Math.pow(boardSize, 2));
	});

});