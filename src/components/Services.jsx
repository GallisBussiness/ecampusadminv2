import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ModalContainer from 'react-modal-promise'
import { InputText } from 'primereact/inputtext'
import createServiceModal from '../modals/CreateServiceModal'
import updateServiceModal from '../modals/UpdateServiceModal'
import { createService, getServices, deleteService, updateService } from '../services/serviceService'
import { FaEye, FaPen } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { FcServices } from 'react-icons/fc'


function Services() {
    const [selectedServices, setSelectedServices] = useState(null);
    const qc = useQueryClient()
    const toast = useRef();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const qk = ['get_Services']

    const {data: Services, isLoading } = useQuery(qk, () => getServices());
    const {mutate: create} = useMutation((data) => createService(data), {
        onSuccess: (_) => {
        toast.current.show({severity: 'success', summary: 'Creation Service', detail: 'Création réussie !!'});
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Create Service', detail: 'Creation échouée !!'});
        }
    })

    const {mutate: deleteD} = useMutation((id) => deleteService(id), {
        onSuccess: (_) => {
        toast.current.show({severity: 'success', summary: 'Suppréssion Service', detail: 'Suppréssion réussie !!'});
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Suppréssion Service', detail: 'Suppréssion échouée !!'});
        }
    })

    const {mutate: update} = useMutation((data) => updateService(data), {
        onSuccess: (_) => {
            toast.current.show({severity: 'success', summary: 'Mise à jour Service', detail: 'Mis à jour réussie !!'});
            qc.invalidateQueries(qk);
           },
           onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Mis à jour Service', detail: 'Mis à jour échouée !!'});
           }
    })

    const leftToolbarTemplate = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleCreateService()} >Nouveau <AiOutlinePlus className="h-6 w-6 text-white inline"/></button>
                <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleDelete()} disabled={!selectedServices || !selectedServices.length}>Supprimer <MdDelete className="h-6 w-6 text-white inline"/></button>
            </div>
        )
    }


    const handleUpdateService = (d) => {
        updateServiceModal({service: d}).then((d => {
            const {_id,...rest} = d;
            update({_id,data: rest});
        }));
    }

    const handleCreateService = () => {
        createServiceModal().then(create);
    }

    const handleViewService = (d) => {
        navigate(`/dashboard/services/${d._id}`);
    }

    const handleDelete = () => {
        for(let i = 0; i < selectedServices?.length; i++) {
           deleteD(selectedServices[i]?._id);
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Services</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
        <button type="button" onClick={() => handleViewService(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><FaEye className="text-white inline"/></button>
        <button type="button" onClick={() => handleUpdateService(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><FaPen className="text-white inline"/></button>
        </div>;
        
    }
    const header = renderHeader();

  return (
    <>
     <div className="flex flex-wrap mt-6 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full space-x-2">
              <h5 className="font-bold text-3xl">Gestion des Services</h5>
              <FcServices className="w-20 h-20 text-green-500"/>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</div>
    <div className="datatable-doc mt-4 w-11/12 mx-auto">
                <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <DataTable value={Services} paginator className="p-datatable-customers" header={header} rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                        dataKey="_id" rowHover selection={selectedServices} onSelectionChange={e => setSelectedServices(e.value)}
                        filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                        globalFilterFields={['nom', 'prenom']} emptyMessage="Aucun Service trouvé"
                        currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Services" size="small">
                        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                        <Column field="nom" header="Nom" sortable style={{ minWidth: '14rem' }} />
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>

        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default Services