import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ResourcesReducer from './reducer_resources';

const rootReducer = combineReducers({
  resources: ResourcesReducer,
  form: formReducer
});

export default rootReducer;
