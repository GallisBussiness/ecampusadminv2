import Api from './api';

export const createpaymentSubject = (data) => Api.post('/payement-subject/',data).then(res => res.data);
export const getpaymentSubjects = () => Api.get('/payement-subject').then(res => res.data);
export const getpaymentSubjectsByService = (id) => Api.get('/payement-subject/byservice/'+ id).then(res => res.data);
export const getpaymentSubject = (id) => Api.get('/payement-subject/' + id).then(res => res.data);
export const deletepaymentSubject = (id) => Api.delete('/payement-subject/' + id).then(res => res.data);
export const updatepaymentSubject = (id,data) => Api.patch('/payement-subject/' + id,data).then(res => res.data)