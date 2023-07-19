import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'
import {  useQuery } from 'react-query'
import ModalContainer from 'react-modal-promise'
import { InputText } from 'primereact/inputtext'
import { getEtudiants } from '../services/etudiantService'
import { FaEye } from "react-icons/fa"
import { Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
// import { format, parseISO } from 'date-fns'

function Etudiants() {
    const toast = useRef();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'prenom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const qk = ['get_Etudiants',]

    const {data: Etudiants, isLoading } = useQuery(qk, () => getEtudiants());
    


    const handleViewEtudiant = (d) => {
        navigate(`/dashboard/etudiants/${d._id}`);
    }


    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0 uppercase text-3xl">Liste des Etudiants</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
        <button type="button" onClick={() => handleViewEtudiant(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><FaEye className="text-white inline"/></button>
        </div>;
        
    }
    // const dateTemplate = (row) => format(parseISO(row.dateDeNaissance),'dd-MM-yyyy');
    const avatarTemplate = (row) => (<Avatar size="md" src={`${import.meta.env.VITE_BACKURL_ETUDIANT}/${row.avatar}`} />);

    const header = renderHeader();

  return (
    <>
        <div className="datatable-doc mt-4 w-11/12 mx-auto">
                    <div className="card">
                        <DataTable value={Etudiants} paginator className="p-datatable-customers" header={header} rows={10}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                            dataKey="_id" rowHover
                            filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                            globalFilterFields={['nom', 'prenom','nce','telephone']} emptyMessage="Aucun Etudiant trouvé"
                            currentPageReportTemplate="Voir {first} de {last} à {totalRecords} etudiants" size="small">
                            <Column field="prenom" header="Prenom" sortable style={{ minWidth: '8rem' }} />
                            <Column field="nom" header="Nom" sortable style={{ minWidth: '8rem' }} />
                            <Column field="nce" header="N° Carte Etudiant" sortable style={{ minWidth: '8rem' }} />
                            <Column field="avatar" header="Avatar" body={avatarTemplate} sortable style={{ minWidth: '8rem' }} />
                            <Column field="telephone" header="Téléphone" sortable  style={{ minWidth: '8rem' }}/>
                            <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>

        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default Etudiants