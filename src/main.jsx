import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import TagManager from 'react-gtm-module'

import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";

 
const tagManagerArgs = {
    gtmId: 'GTM-5W4W6R3C'
}
 
TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
