import _ from 'lodash';
import { FETCH_RESOURCES, FETCH_RESOURCE, DELETE_RESOURCE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_RESOURCE:
      return _.omit(state, action.payload);

    case FETCH_RESOURCE:
      // const resource = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_RESOURCES:
      return _.mapKeys(action.payload.data, 'id');
    
    default:
      return state;
  }
}
