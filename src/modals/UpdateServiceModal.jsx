import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { TextInput } from '@mantine/core';


const schema = yup.object({
  nom: yup.string()
  .required(),
}).required();

function UpdateServiceModal({ isOpen, onResolve, onReject,service }) {

  const defaultValues = {nom: service?.nom}
  const {control,handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    defaultValues
  });


const onUpdate = data => {
    onResolve({_id:service?._id,...data});
  };

  return (
    <>
      <Dialog header="Mise à jour Service" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
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
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> MODIFIER SERVICE</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateServiceModal)