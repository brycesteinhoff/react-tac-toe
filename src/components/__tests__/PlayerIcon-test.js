jest.unmock('../PlayerIcon');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import PlayerIcon from '../PlayerIcon';

describe('components/PlayerIcon', () =>
{
	let output;

	beforeEach(() =>
	{
		let component = <PlayerIcon player={1} />;

		let renderer = TestUtils.createRenderer();
		renderer.render(component);
		output = renderer.getRenderOutput();
	});

	it('should be a <div>', () =>
	{
		expect(output.type).toBe('div');
	});

	it('should have an inner <span>', () =>
	{
		expect(output.props.children.type).toBe('span');
	});

	it('should have classes applied', () =>
	{
		expect(output.props.className).toBe('PlayerIcon PlayerIcon--player1');
	});

});