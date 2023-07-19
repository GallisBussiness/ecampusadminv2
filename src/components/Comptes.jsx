import React,{ useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';  
import { InputText } from 'primereact/inputtext';
import {ConfirmDialog,confirmDialog } from 'primereact/confirmdialog';
import {useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom'
import { GrTransaction } from 'react-icons/gr'
import { FcMoneyTransfer } from 'react-icons/fc'
import { deleteCompte, getComptes } from '../services/compteService';
import { format, parseISO } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';


const Comptes = () => {
const [selectedComptes,setSelectedComptes] = useState([])
const [globalFilter, setGlobalFilter] = useState('');
const toast = useRef(null);
const dt = useRef(null);
const navigate = useNavigate();
const qc = useQueryClient();


const qk = ['getComptes']
const { data } = useQuery(qk, () => getComptes(), { 
    staleTime: 100_000,
    onSuccess: (_) => console.log(_),
    onError: (_) => console.log(_),
})


const {mutate:del} = useMutation((id) => deleteCompte(id), {
    onSuccess:(_) => {
    toast.current.show({ severity: 'info', summary: 'Suppression Compte', detail: `Compte  supprimé !!`, life: 3000 });
      qc.invalidateQueries(qk);
    },
    onError:(_) => {
        toast.current.show({ severity: 'warn', summary: 'Suppression Compte', detail: 'Une erreur !!', life: 3000 });
    }
});





const accept = () => {
    selectedComptes.forEach(c => del(c._id));
}

const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Suppression rejetée', life: 3000 });
}

const ConfirmDelete = (position) => {
    confirmDialog({
        message: 'Voulez-vous vraiment supprimer cette enrégistrement?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        position,
        accept,
        reject
    });
}



const leftToolbarTemplate = () => {
    return (
        <>
            <Button label="Supprimer" icon="pi pi-trash" className="p-button-danger" onClick={() => ConfirmDelete('top-right')} />
        </>
    )
}

const actionBodyTemplate = (rowData) => {
    return (
        <>
            <Button icon={<GrTransaction />} className="p-button-rounded p-button-success mr-2" title="voir les transactions" onClick={() => navigate(`/dashboard/transactions/${rowData._id}`)} />
        </>
    );
}

const dateTemplate = (row) => format(parseISO(row.createdAt),'dd-MM-yyyy');
const codeTemplate = (row) => <QRCodeSVG value={row?.code} className="h-8 w-8"/>;

const header =  () => (
    <div className="table-header">
        <h5 className="mx-0 my-1">Gestion des Comptes</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" className="py-2" value={globalFilter}  onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
        </span>
    </div>
);

  return (
    <>
     <Toast ref={toast} />
     <ConfirmDialog />
     <div className="flex flex-wrap mt-6 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full space-x-2">
              <h5 className="font-bold text-3xl">Gestion des Comptes</h5>
              <FcMoneyTransfer className="w-20 h-20 "/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="datatable-crud">
<div className="card">
    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

    <DataTable ref={dt} value={data} size="small" selection={selectedComptes} onSelectionChange={(e) => setSelectedComptes(e.value)}
        dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Voir {first} to {last} of {totalRecords} Comptes"
        globalFilter={globalFilter} header={header} responsiveLayout="scroll">
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
        <Column field="code" header="Code" body={codeTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="solde" header="Solde"  sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="etudiant.prenom" header="Prenom Etudiant"  sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="etudiant.nom"  header="Nom Etudiant" ></Column>
        <Column field="createdAt" header="Date de Creation" body={dateTemplate} ></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
    </DataTable>
</div>
   </div>
    </>
  )
}

export default Comptes