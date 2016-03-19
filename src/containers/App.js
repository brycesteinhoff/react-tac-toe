import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions';
import Modal from '../components/Modal';
import Header from '../components/Header';
import Flash from '../components/Flash';
import Board from '../components/Board';
import Footer from '../components/Footer';

import '../styles';

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

	render()
	{
		return (
			<div className="App">
				<Modal {...this.props} />
				<Header />
				<Board {...this.props} />
				<Footer />
			</div>
		);
	};

};