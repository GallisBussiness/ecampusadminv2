import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Checkbox, Input,TextInput } from '@mantine/core';
import { FiAtSign } from 'react-icons/fi';
import { Can } from '../casl/can';


const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
   email: yup.string().email().required(),
   role: yup.array().required()
  }).required();

const UpdateUserModal = ({ isOpen, onResolve, onReject,user }) => {

    const defaultValues = {nom: user.nom, prenom: user.prenom,email: user.email ,role: user.role};
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

  const onUpdate = data => {
      onResolve({_id:user._id,...data});
    };

  return (
    <>
       <Dialog header="Modifier un utilisateur" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
       <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
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
                  <Checkbox value="controleur" label="controleur" />
                  </Can>
                </Checkbox.Group>
              )} />
            </div>
            
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2">MODIFIER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateUserModal)