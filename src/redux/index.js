import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"

import * as reducers from "./reducers"

const rootReducer = combineReducers({
  institution: reducers.institutionReducer,
  errors: reducers.errorsReducer,
  loading: reducers.loadingReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));