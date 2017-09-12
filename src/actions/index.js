import axios from 'axios';

export const FETCH_RESOURCES = 'fetch_resources';
export const FETCH_RESOURCE = 'fetch_resource';
export const CREATE_RESOURCE = 'create_resource';
export const DELETE_RESOURCE = 'delete_resource';
export const EDIT_RESOURCE = 'edit_resource';

const ROOT_URL = 'https://devhub-api.herokuapp.com';
const LOCAL_ROOT_URL = 'http://localhost:3000';
const API_KEY = '?key=dirkadirka'

export function fetchResources() {
  const request = axios.get(`${ROOT_URL}/resources`);

  return {
    type: FETCH_RESOURCES,
    payload: request
  };
}

export function createResource(values, callback) {
  const request = axios.post(`${ROOT_URL}/resources`, values)
  .then(() => callback());

  return {
    type: CREATE_RESOURCE,
    payload: request
  }
}

export function fetchResource(id) {
  console.log('action id', id);
  const request = axios.get(`${ROOT_URL}/resources/${id}`)

  return {
    type: FETCH_RESOURCE,
    payload: request
  }
}

export function deleteResource(id, callback) {
  const request = axios.delete(`${ROOT_URL}/resources/${id}`)
    .then(() => callback());
  return {
    type: DELETE_RESOURCE,
    payload: request
  }
}

export function editResource(id, values, callback) {
  console.log('values', values);
  const request = axios.put(`${ROOT_URL}/resources/${id}`, values)
  .then(() => callback());

  return {
    type: EDIT_RESOURCE,
    payload: request
  }
}
