import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

export default function configureStore(initialState)
{
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(createLogger())
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		// Info: https://github.com/reactjs/react-redux/releases/tag/v2.0.0
		module.hot.accept('../reducers', () =>
		{
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}