import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

let render = () =>
{
	const App = require('./containers/App').default; // get latest version after hot reload

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};

// Enable Webpack hot module replacement
if (module.hot) {
	module.hot.accept();
}

render();