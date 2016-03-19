jest.unmock('../Modal');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Modal from '../Modal';
import Flash from '../Flash';
import Slider from 'rc-slider';
import * as Constants from '../../reducers/_constants';

const renderer = TestUtils.createRenderer();

const baseProps = {
	gameStatus: Constants.STATUS_STOPPED,
	boardSize: 3,
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

	renderer.render(<Modal {...props} />);
	return renderer.getRenderOutput();
};

function renderIntoDoc(overrideProps)
{
	let props = getProps(overrideProps);

	return TestUtils.renderIntoDocument(<Modal {...props} />);
};

describe('components/Modal', () =>
{
	it('should be a ReactCSSTransitionGroup', () =>
	{
		let output = renderShallow();

		expect(output.type.displayName).toBe('ReactCSSTransitionGroup');
	});

	it('should not have children (the modal wrapper) if showModal is false', () =>
	{
		let output = renderShallow({
			showModal: false
		});

		expect(output.props.children).toBe(undefined);
	});

	it('should have a child (the modal wrapper) if showModal is true', () =>
	{
		let output = renderShallow({
			showModal: true
		});

		expect(output.props.children).not.toBe(undefined);
	});

	it('should render a Flash component and pass gameStatus, winner, and draw props', () =>
	{
		let tree = renderIntoDoc({
			gameStatus: Constants.STATUS_STOPPED,
			winner: 1,
			draw: false,
			showModal: true
		});

		// Checks if we have exactly one
		let flash = TestUtils.findRenderedComponentWithType(tree, Flash);

		expect(flash.props.gameStatus).toBe(Constants.STATUS_STOPPED);
		expect(flash.props.winner).toBe(1);
		expect(flash.props.draw).toBe(false);
	});

	it('should render a Slider component', () =>
	{
		let tree = renderIntoDoc({
			showModal: true
		});

		TestUtils.findRenderedComponentWithType(tree, Slider);
	});

	it('should call bound dismiss modal action creator when close button is clicked', () =>
	{
		let mockBoundAction = jest.genMockFunction();

		let tree = renderIntoDoc({
			showModal: true,
			boundActions: {
				dismissModal: mockBoundAction
			}
		});

		expect(mockBoundAction.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(tree.refs.btnClose);

		expect(mockBoundAction.mock.calls.length).toBe(1);
	});

	it('should call bound start game & dismiss modal action creators when new game button is clicked', () =>
	{
		let mockStart = jest.genMockFunction();
		let mockDismiss = jest.genMockFunction();

		let tree = renderIntoDoc({
			showModal: true,
			boundActions: {
				start: mockStart,
				dismissModal: mockDismiss
			}
		});

		expect(mockStart.mock.calls.length).toBe(0);
		expect(mockDismiss.mock.calls.length).toBe(0);

		TestUtils.Simulate.click(tree.refs.btnNewGame);

		expect(mockStart.mock.calls.length).toBe(1);
		expect(mockDismiss.mock.calls.length).toBe(1);
	});

	it('should call bound board size update action creator if new game button is clicked and slider value is different than current board size', () =>
	{
		let mockUpdate = jest.genMockFunction();

		let tree = renderIntoDoc({
			showModal: true,
			boardSize: 3,
			boundActions: {
				updateBoardSize: mockUpdate,
				start: () => {},
				dismissModal: () => {}
			}
		});

		expect(mockUpdate.mock.calls.length).toBe(0);

		// Changed from boardSize prop
		tree.sliderValue = 4;

		TestUtils.Simulate.click(tree.refs.btnNewGame);

		expect(mockUpdate.mock.calls.length).toBe(1);
	});

	it('should not call board update if slider value is same as current board size', () =>
	{
		let mockUpdate = jest.genMockFunction();

		let tree = renderIntoDoc({
			showModal: true,
			boardSize: 4,
			boundActions: {
				updateBoardSize: mockUpdate,
				start: () => {},
				dismissModal: () => {}
			}
		});

		expect(mockUpdate.mock.calls.length).toBe(0);

		// No change
		tree.sliderValue = 4;

		TestUtils.Simulate.click(tree.refs.btnNewGame);

		expect(mockUpdate.mock.calls.length).toBe(0);
	});

});