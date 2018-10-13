import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './helpers/store';
import App from './components/App/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
