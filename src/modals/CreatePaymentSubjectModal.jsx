import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { NumberInput, TextInput } from '@mantine/core';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

const schema = yup.object({
  nom: yup.string()
  .required(),
  prix: yup.number()
    .required(),
}).required();

function CreatepaymentSubjectModal({ isOpen, onResolve, onReject,service }) {

  
  const defaultValues = {nom:'', prix: 0,service}
  const {control,handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    defaultValues
  });


const onCreate = data => {
    onResolve(data);
  };

  return (
    <>
    <Dialog header="Création Service Payement" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
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
             <div className="field mb-3">
            <Controller
              control={control}
              name="prix"
              rules={{ required: "Prix Incorrect !" }}
              render={({ field }) => (
                <NumberInput
                label="Prix"
                value={field.value}
                onChange={(v) => field.onChange(v)}
                error={errors.solde && errors.solde.message}
                icon={<FaRegMoneyBillAlt className="text-green-500"/>}
                hideControls
              />
              )}
            />
          </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER PAYEMENT</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreatepaymentSubjectModal)