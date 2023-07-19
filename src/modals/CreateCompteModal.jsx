import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import {  Button, NumberInput } from '@mantine/core';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
const schema = yup.object({
    solde: yup.number()
    .required(),
    etudiant: yup.string()
    .required(),
    password: yup.string()
    .required(),
  }).required();


function CreateCompteModal({ isOpen, onResolve, onReject,etudiant }) {
    const defaultValues = { solde: 100, etudiant:etudiant?._id,password:'123456' };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});

  
  const onSubmit = (data) => {
    onResolve(data);
  };

  return (
    <>
      <Dialog
        header="CREATION COMPTE"
        visible={isOpen}
        style={{ width: "50vw" }}
        onHide={() => onReject()}
      >
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className="p-fluid space-y-2">
          <div className="field">
            <Controller
              control={control}
              name="solde"
              rules={{ required: "Solde Incorrect !" }}
              render={({ field }) => (
                <NumberInput
                label="Solde du compte"
                value={field.value}
                onChange={(v) => field.onChange(v)}
                error={errors.solde && errors.solde.message}
                icon={<FaRegMoneyBillAlt className="text-green-500"/>}
                hideControls
              />
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-2 bg-blue-700"
          > 
          CREER COMPTE POUR {etudiant?.prenom} {etudiant?.nom}
          </Button>
        </form>
      </Dialog>
    </>
  )
}

export default create(CreateCompteModal)