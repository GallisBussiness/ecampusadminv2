import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise';
import { Checkbox, Input, PasswordInput, TextInput } from '@mantine/core';
import { FiAtSign } from 'react-icons/fi';
import { Can } from '../casl/can';

const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
   email: yup.string().email().required(),
   password: yup.string().required(),
   role: yup.array().required()
  }).required();

const CreateUserModal = ({ isOpen, onResolve, onReject }) => {

    const defaultValues = {nom: '', prenom: '',email: '', password: (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,9), role: []};
      const {control,setValue, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });


    const generatePassword = (e) =>  {
        e.preventDefault();
        setValue("password",(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,9))
    }
    
    const onCreate = data => {
        onResolve(data);
      };

  return (
    <>
     <Dialog header="Creer un utilisateur" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <Controller control={control} name="prenom" render={({field}) => (
              <TextInput
              placeholder="Prénom"
              label="Prénom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.prenom && errors.prenom.message}
            />
        
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="nom" render={({field}) => (
              <TextInput
              placeholder="Nom"
              label="Nom"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.nom && errors.nom.message}
            />
             )}/>
            </div>
            <div className="mb-3">
            <Controller control={control} name="email" render={({field}) => (
              <TextInput
              placeholder="Email"
              label="Email"
              withAsterisk
              value={field.value}
              onChange={field.onChange}
              error={errors.email && errors.email.message}
              icon={<FiAtSign/>}
            />
             )}/>
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="role" className="form-label">Role</label>
              <Controller control={control} name="role" render={({field}) => (
                  <Checkbox.Group value={field.value} error={errors.role && "invalid roles !"} onChange={field.onChange}>
                  <Can I="manage" a="all">
                    <Checkbox value="user" label="User" />
                    <Checkbox value="superadmin" label="superadmin" />
                  </Can>
                  <Can I="manage" a="admin">
                  <Checkbox value="admin" label="admin" />
                  <Checkbox value="vendeur" label="vendeur" />
                  <Checkbox value="acp" label="acp" />
                  <Checkbox value="supperviseur" label="supperviseur" />
                  </Can>
                  
                </Checkbox.Group>
              )} />
            </div>
            <div className="mb-3 w-full">           
                  <Controller control={control} name="password" render={({field}) => (
                    <div className="flex items-center space-x-4 w-full">
                                        <PasswordInput
                        placeholder="Mot de Passe"
                        label="Mot de Passe"
                        withAsterisk
                        value={field.value} onChange={field.onChange}
                        error={errors.password && errors.password.message}
                        className="w-full"
                      />
                       <button className="inline-block px-6 py-2 mt-4 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs mr-2" onClick={generatePassword} > Générer mot de passe</button>
                    </div>
                    
                    )} />
                  </div>
            
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateUserModal);