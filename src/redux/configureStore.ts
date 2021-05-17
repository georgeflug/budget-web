import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {rootReducer} from "./rootReducer";

export function configureStore() {
  const composedEnhancers = composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  );

  return createStore(rootReducer, {}, composedEnhancers);
}
