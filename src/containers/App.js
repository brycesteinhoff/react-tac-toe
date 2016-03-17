import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions';
import Board from '../components/Board';

let mapStateToProps = function(state)
{
	return state.game;
};

let mapDispatchToProps = function(dispatch)
{
	return {
		// "boundActionCreators" is just soo longgg
		boundActions: bindActionCreators(ActionCreators, dispatch)
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

	render()
	{
		return (
			<div className="App">
				<Board {...this.props} />
			</div>
		);
	};

};