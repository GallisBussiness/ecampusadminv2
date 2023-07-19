import Api from './api';

export const createPub = (data) => Api.post('/pub/',data).then(res => res.data);
export const getPubs = () => Api.get('/pub').then(res => res.data);
export const getPub = (id) => Api.get('/pub/' + id).then(res => res.data);
export const deletePub = (id) => Api.delete('/pub/' + id).then(res => res.data);
export const updatePub = (id,data) => Api.patch('/pub/' + id,data).then(res => res.data)