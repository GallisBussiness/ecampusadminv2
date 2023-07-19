import Api from './api';

export const createDepot = (data) => Api.post('/operation/depot',data).then(res => res.data);
export const createRetrait = (data) => Api.post('/operation/retrait', data).then(res => res.data);
export const getOperationsByCompte = (id) => Api.get('/operation/compte/' + id).then(res => res.data);