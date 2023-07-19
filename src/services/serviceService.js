import Api from './api';

export const createService = (data) => Api.post('/service/',data).then(res => res.data);
export const getServices = () => Api.get('/service').then(res => res.data);
export const getService = (id) => Api.get('/service/' + id).then(res => res.data);
export const deleteService = (id) => Api.delete('/service/' + id).then(res => res.data);
export const updateService = (id,data) => Api.patch('/service/' + id,data).then(res => res.data)