import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'rc-slider';
import 'style!css!rc-slider/assets/index.css';

import * as ActionCreators from '../actions';
import Board from '../components/Board';

let mapStateToProps = function(state)
{
	return state.game;
};

let mapDispatchToProps = function(dispatch)
{
	return {
		boundActions: bindActionCreators(ActionCreators, dispatch)
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

	testingSlider(boardSize)
	{
		this.props.boundActions.updateBoardSize(boardSize);
	}

	render()
	{
		return (
			<div className="App">
				<Slider min={3} max={8} step={1} defaultValue={this.props.boardSize} disabled={false} onAfterChange={this.testingSlider.bind(this)} />
				<Board {...this.props} />
			</div>
		);
	};

};