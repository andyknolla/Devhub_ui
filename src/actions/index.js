import axios from 'axios';

export const FETCH_RESOURCES = 'fetch_resources';
export const FETCH_RESOURCE = 'fetch_resource';
export const CREATE_RESOURCE = 'create_resource';
export const DELETE_RESOURCE = 'delete_resource';

const ROOT_URL = 'https://reduxblog.herokuapp.com/api/posts';
const API_KEY = '?key=dirkadirka'

export function fetchResources() {
  const request = axios.get(`${ROOT_URL}/${API_KEY}`);

  return {
    type: FETCH_RESOURCES,
    payload: request
  };
}

export function createResource(values, callback) {
  const request = axios.post(`${ROOT_URL}/${API_KEY}`, values)
  .then(() => callback());

  return {
    type: CREATE_RESOURCE,
    payload: request
  }
}

export function fetchResource(id) {
  const request = axios.get(`${ROOT_URL}/${id}${API_KEY}`)

  return {
    type: FETCH_RESOURCE,
    payload: request
  }
}

export function deleteResource(id, callback) {
  const request = axios.delete(`${ROOT_URL}/${id}${API_KEY}`)
    .then(() => callback());


  return {
    type: DELETE_RESOURCE,
    payload: request
  }
}
