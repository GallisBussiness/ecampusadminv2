import React,{ useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';  
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';
import {useQuery, useMutation,useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom'
import { getCompte } from '../services/compteService';
import { Dialog } from 'primereact/dialog';
import { createDepot, createRetrait, getOperationsByCompte } from '../services/operationService';
import { GiReceiveMoney,GiPayMoney } from 'react-icons/gi'
import { format, parseISO } from 'date-fns';
import { FcMoneyTransfer } from 'react-icons/fc';


const Operations = () => {
const [globalFilter, setGlobalFilter] = useState('');
const [d,setD] = useState(false)
const [r,setR] = useState(false)
const toast = useRef(null);
const dt = useRef(null);
const { id } = useParams();
const defaultValues = {montant: 100, compte: id,responsable: ''}
const { control, handleSubmit, formState: {errors} } = useForm({defaultValues});
const { control:controlR, handleSubmit:handleSubmitR, formState: {errors: errorsR} } = useForm({defaultValues});
const qc = useQueryClient();


const qk = ['getOperations',id];
const qkc = ['getCompte',id];
const qkal = ['getComptes']
const { data } = useQuery(qkc, () => getCompte(id), { 
    staleTime: 100_000,
})

const { data: operations } = useQuery(qk, () => getOperationsByCompte(id), { 
  staleTime: 100_000,
})
const { mutate,isLoading } = useMutation((data) => createDepot(data), {
  onSuccess:(_) => {
      toast.current.show({ severity: 'info', summary: 'Creation Depot', detail: 'Dépot éffectué !!', life: 3000 });
      setD(false);
    qc.invalidateQueries(qk);
    qc.invalidateQueries(qkc);
    qc.invalidateQueries(qkal);
  },
  onError:(_) => {
      toast.current.show({ severity: 'warn', summary: 'Creation Depot', detail: 'Une erreur !!', life: 3000 });
  }
})

const { mutate:mutateR,isLoading:isLoadingR } = useMutation((data) => createRetrait(data), {
  onSuccess:(_) => {
      toast.current.show({ severity: 'info', summary: 'Creation Retrait', detail: 'Retrait éffectué !!', life: 3000 });
      setD(false);
    qc.invalidateQueries(qk);
    qc.invalidateQueries(qkc);
    qc.invalidateQueries(qkal);
  },
  onError:(_) => {
      toast.current.show({ severity: 'warn', summary: 'Creation Retrait', detail: 'Une erreur !!', life: 3000 });
  }
})

const getFormErrorMessage = (name) => {
  return errors[name] && <small className="p-error">{errors[name].message}</small>
};
const getFormErrorMessageR = (name) => {
  return errorsR[name] && <small className="p-error">{errorsR[name].message}</small>
};
const cDepot = () => setD(true);
const cancelCDepot = () => setD(false);

const cRetrait = () => setR(true);
const cancelCRetrait = () => setR(false);

const onSubmit = (data) => {
  mutate(data);
}

const onSubmitR = (data) => {
  mutateR(data);
}

const typeTemplate = ({type}) => {
   switch (type) {
    case 'DPT':
      return <GiReceiveMoney className="h-10 w-10 text-green-600" />
      case 'RTR':
        return <GiPayMoney className="h-10 w-10 text-amber-600"/>
    default:
      return "";
   }
}

const montantTemplate = ({montant}) => {
 return <div className="font-bold">{montant} FCFA</div>
}
const dateTemplate = (row) => format(parseISO(row.createdAt),'dd-MM-yyyy');
const heureTemplate = (row) => format(parseISO(row.createdAt),'H:m:s');
const descriptionTemplate = (row) => {
  if(row.payement_subject) {
    return row.description + ` pour ${row.payement_subject.nom} au service ${row.payement_subject.service.nom}`;
  }
  return row.description;
} 
const leftToolbarTemplate = () => {
    return (
        <>
            <Button label="Faire depot" icon={<GiReceiveMoney />} iconPos="right" className="p-button-success mx-2" onClick={cDepot} />
            <Button label="Faire retrait" icon={<GiPayMoney />} iconPos="right" className="p-button-warning" onClick={cRetrait} />
        </>
    )
}



const header =  () => (
    <div className="table-header">
        <h5 className="mx-0 my-1">Gestion des Opérations</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" className="py-2" value={globalFilter}  onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
        </span>
    </div>
);

  return (
    <>
        <div className="flex flex-wrap mt-6 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap items-center -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full space-x-2">
              <h5 className="font-bold text-3xl">Les Transactions</h5>
              <FcMoneyTransfer className="w-20 h-20 "/>
            </div>
          </div>
         <div className="text-3xl font-bold uppercase">
          Solde : {data?.solde} FCFA
         </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div className="datatable-crud">
      <Toast ref={toast} />
  <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

      <DataTable ref={dt} value={operations} size="small"
          dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Voir {first} to {last} of {totalRecords} Transactions"
          globalFilter={globalFilter} header={header} responsiveLayout="scroll"  emptyMessage="Aucunes Transactions trouvées">
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
          <Column field="date" header="Date" body={dateTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="heure" header="Heure" body={heureTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="type" header="Type" body={typeTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="montant" header="Montant" body={montantTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="description" header="Description" body={descriptionTemplate}  sortable style={{ minWidth: '16rem' }}></Column>
      </DataTable>
  </div>
    </div>

   <Dialog header="FAIRE DEPOT" visible={d} style={{ width: '50vw' }} onHide={() => cancelCDepot()}>
<form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-2">
                  <div className="field">               
                  <Controller control={control} name="montant" rules={{required: 'Montant Incorrect !'}} render={({field,fieldState}) => (
                    <InputNumber value={field.value} onValueChange={(v) => field.onChange(v)} mode="currency" currency="XOF" locale="fr-FR" className={classNames({ 'p-invalid': fieldState.error })} placeholder="Montant*" />
                    )} />
                      {getFormErrorMessage('montant')}
                  </div>
                  
        <Button type="submit" label={`FAIRE DEPOT POUR ${data?.etudiant?.prenom} ${data?.etudiant?.nom}`}  loading={isLoading} className="mt-2 bg-blue-700" />
</form>
</Dialog>
<Dialog header="FAIRE RETRAIT" visible={r} style={{ width: '50vw' }} onHide={() => cancelCRetrait()}>
<form onSubmit={handleSubmitR(onSubmitR)} className="p-fluid space-y-2">
                  <div className="field">               
                  <Controller control={controlR} name="montant" rules={{required: 'Montant Incorrect !'}} render={({field,fieldState}) => (
                    <InputNumber value={field.value} onValueChange={(v) => field.onChange(v)} mode="currency" currency="XOF" locale="fr-FR" className={classNames({ 'p-invalid': fieldState.error })} placeholder="Montant*" />
                    )} />
                      {getFormErrorMessageR('montant')}
                  </div>
                  
        <Button type="submit" label={`FAIRE RETRAIT POUR ${data?.etudiant?.prenom} ${data?.etudiant?.nom}`}  loading={isLoadingR} className="mt-2 p-button-warning" />
</form>
</Dialog>
    </>
  )
}

export default Operations