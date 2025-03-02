import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import TagManager from 'react-gtm-module'

import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'

// Google Track Manager to Track Website Activities
const tagManagerArgs = {
  gtmId: 'GTM-5W4W6R3C',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.hydrateRoot(document.getElementById("root"),
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);