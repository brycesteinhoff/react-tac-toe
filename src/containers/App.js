import React, { Component } from 'react';
import { connect } from 'react-redux';

let mapStateToProps = function(state)
{
	return {};
};

let mapDispatchToProps = function(dispatch)
{
	return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

	render()
	{
		return (
			<div className="App">
				Main app component
			</div>
		);
	};

};