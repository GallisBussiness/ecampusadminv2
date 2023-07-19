import Api from './api';
export const getEtudiants = () => Api.get('/etudiant').then(res => res.data);
export const getEtudiant = (id) => Api.get('/etudiant/' + id).then(res => res.data);
export const createEtudiant = (data) => Api.post('/etudiant', data).then(res => res.data);
export const updateEtudiant = (data) => {
    const {_id,data: rest} = data;
    return Api.patch('/etudiant/' + _id, rest ).then(res => res.data);
}

export const updateEtudiantAvatar = (id,data) => Api.patch('/etudiant/updateavatar/' + id, data ).then(res => res.data);

export const removeEtudiant = (id) => Api.delete('/etudiant/' + id).then(res => res.data);

