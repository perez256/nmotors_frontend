import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { planListReducer } from './reducers/plansReducers';
import { transactionListReducer } from './reducers/transactionReducers';

const reducer = combineReducers({
  plansList: planListReducer,
  transactionList: transactionListReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
