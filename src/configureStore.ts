import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {reducers} from "./reducers";

export function configureStore() {
  const composedEnhancers = composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  );

  return createStore(reducers, {}, composedEnhancers);
}
