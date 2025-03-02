import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom/server';
import App from "./App";
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store

export async function render(url) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
}