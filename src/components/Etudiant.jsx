import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEtudiant, updateEtudiantAvatar } from "../services/etudiantService";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import ModalContainer from 'react-modal-promise'
import { createCompte, getCompteByEtudiant } from "../services/compteService";
// import ReactToPdf from "react-to-pdf";
import { FaAt, FaPhoneAlt, FaUser } from 'react-icons/fa';
// import { MdLocationPin } from 'react-icons/md';
// import { AiOutlineFieldNumber } from 'react-icons/ai';
import createCompteModal from "../modals/CreateCompteModal";
import { Avatar, Button, Group, LoadingOverlay, Text } from "@mantine/core";
import "../App.css";
// import { QRCodeSVG } from "qrcode.react";
import Recto from './Recto'
import { PDFViewer } from '@react-pdf/renderer'
import Verso from './Verso'
import QRGenerator from './QrCodeGenerator'

const Etudiant = () => {
  const toast = useRef(null);
  const ref = useRef();
  const ref2 = useRef();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const options = {
    orientation: "landscape",
    unit: "mm",
    format: [98, 58],
    putOnlyUsedFonts: true,
    precision: 3,
    compress: true,
  };
  const { id } = useParams();
  const key = ["loadEtudiant", id];
  const keycompte = ["loadCompteEtudiant", id];
  const { data: etudiant } = useQuery(key, () => getEtudiant(id), {
    staleTime: 100_000,
  });
  const { data: compte } = useQuery(keycompte, () => getCompteByEtudiant(id));
  const { mutate: createC, isLoading } = useMutation((data) => createCompte(data), {
    onSuccess: (_) => {
      toast.current.show({
        severity: "info",
        summary: "Creation Compte",
        detail: "Compte crée !!",
        life: 3000,
      });
      qc.invalidateQueries(keycompte);
    },
    onError: (_) => {
      toast.current.show({
        severity: "warn",
        summary: "Creation Compte",
        detail: "Une erreur !!",
        life: 3000,
      });
    },
  });
  
  const {mutate: AvatarUpdate} = useMutation((data) => updateEtudiantAvatar(id,data), {
    onSuccess: (_) => {
      toast.current.show({
        severity: "info",
        summary: "Modification Phot",
        detail: "Photo modifiée !!",
        life: 3000,
      });
      qc.invalidateQueries(key);
    },
    onError: (_) => {
      toast.current.show({
        severity: "warn",
        summary: "Modification photo",
        detail: "Une erreur !!",
        life: 3000,
      });
    },
  });


  const handleCreateCompte = () => {
    createCompteModal({etudiant:etudiant}).then(createC).catch(console.log)
  }

  const handleViewCompte = (id) => navigate('/dashboard/transactions/' + id)


  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Toast ref={toast} />
      <section className="w-full px-6 antialiased flex justify-center">

      <div className="w-full flex items-center justify-center">
      <Group className="space-x-5 h-96" noWrap>
        {etudiant?.avatar && <Avatar src={`${import.meta.env.VITE_BACKURL_ETUDIANT}/${etudiant.avatar}`} size={150} radius="xl"/>}
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {etudiant?.prenom}
          </Text>

          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed" >
            {etudiant?.nom}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <FaAt stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {etudiant?.email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <FaPhoneAlt stroke={1.5} size={16} />
            <Text size="xs" color="dimmed">
              {etudiant?.tel}
            </Text>
          </Group>
          {!compte && <div className="flex flex-col items-center mt-12 text-center">
            <span className="relative inline-flex w-full md:w-auto">
              <Button
                onClick={handleCreateCompte}
                className="bg-blue-600"
              >
                Creer son compte
              </Button>
            </span>
          </div>}
          {compte && <div className="flex flex-col items-center mt-12 text-center">
            <span className="relative inline-flex w-full md:w-auto">
              <Button
                onClick={() => handleViewCompte(compte._id)}
                className="bg-blue-600"
              >
                Voir les transactions du compte
              </Button>
            </span>
          </div>}
        </div>
      </Group>
     
    </div>
     {compte && <div className="bg-slate-50 p-20">
{/* 
       <div
          className="relative w-96 h-56 mx-auto bg-blue-500 my-5 rounded-lg"
          ref={ref}
        >
          <div className="absolute bg-white inset-x-0 top-0 h-3/4">
          </div>
          <div className="absolute inset-x-0 top-0 h-5/6 w-full">
            <div className="flex justify-between h-full bg-white">
                <div className="h-full w-full flex flex-col justify-end rounded-br-2xl rounded-tl-lg">
                <div className="bg-blue-500 rounded-tl-lg rounded-r-full  w-3/4 h-2/4 flex flex-col items-center justify-center">
                        <h1 className="text-lg font-bold text-white">CROUS/Z</h1>
                        <h1 className="text-sm font-semibold text-white">E-CAMPUS</h1>
                    </div>
                    <div className="flex flex-col px-5 justify-end h-full py-4 w-full">
                      <div className="flex space-x-1 items-center">
                      <FaUser className="text-green-500"/>
                      <div className="text-xs font-bold text-green-500">{compte?.etudiant?.prenom} {compte?.etudiant?.nom}</div>
                      </div>
                      <div className="flex space-x-1 items-center">
                         <MdLocationPin />
                         <div className="text-xs font-semibold">{compte?.etudiant?.lieuDeNaissance}</div>
                      </div>
                        <div className="flex space-x-1 items-center">
                          <AiOutlineFieldNumber />
                           <div className="text-xs font-semibold">{compte?.etudiant?.nce}</div>
                        </div>
                        <div className="flex space-x-1 items-center">
                         <FaPhoneAlt />
                         <div className="text-xs font-semibold">{compte?.etudiant?.tel}</div>
                      </div>
                    </div>
                </div>
                <div className="bg-white w-full h-full flex flex-col justify-between rounded-tr-lg">
                  <div className="bg-white w-full h-full flex items-center justify-center py-5 mb-2 rounded-tr-lg">
                  <Avatar src="/img/logo_crousz.png" size={94} radius="xl" />
                  </div>
                    <div className="bg-blue-500 w-full h-6 rounded-tl-2xl">&nbsp;</div>
                </div>
                
            </div>
          </div>
        </div>
        <div
          className="relative w-96 h-56 mx-auto bg-white my-5 rounded-lg"
          ref={ref2}
        >
        <div className="flex flex-col items-center justify-end h-full">
        <div className="bg-sky-100 rounded-md p-2">
        <QRCodeSVG value={compte?.code} />
        </div>
        <h1 className="text-xs font-semibold items-end mt-10 mb-2">Centre Régional des Oeuvres Universitaires Sociales de Ziguinchor</h1>
        </div>
          
        </div>
          <div className="flex items-center justify-center space-x-2">
          <ReactToPdf targetRef={ref} filename="card.pdf" options={options}>
            {({ toPdf }) => (
              <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <Button
                    type="button"
                    onClick={toPdf}
                    className="bg-green-500"
                  >
                    Imprimer recto
                  </Button>
                </span>
              </div>
            )}
          </ReactToPdf>
          <ReactToPdf targetRef={ref2} filename="card.pdf" options={options}>
            {({ toPdf }) => (
              <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <Button
                    type="button"
                    onClick={toPdf}
                    className="bg-green-500"
                  >
                    Imprimer verso
                  </Button>
                </span>
              </div>
            )}
          </ReactToPdf>
          </div> */}

  <div className="hidden">
      <QRGenerator value={compte?.code} documentId="qrcode" />
    </div>
    <PDFViewer width={400} height={400}>
       <Recto compte={compte}/>
    </PDFViewer>
    <PDFViewer width={400} height={400}>
       <Verso />
    </PDFViewer>
     </div>}

      </section>

      <ModalContainer />
    </>
  );
};

export default Etudiant;
