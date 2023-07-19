import { Button } from "@mantine/core";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { getAuth } from "../services/authservice";

import {
 
  FaUser,
  FaUserGraduate,
} from "react-icons/fa";
import Users from "./Users";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FcServices } from "react-icons/fc";
import Etudiants from "./Etudiants";
import Etudiant from "./Etudiant";
import Operations from "./Transactions";
import P404 from "./P404";
import Comptes from "./Comptes";
import Services from "./Services";
import PaymentSubject from "./Service";

const Dashboard = () => {
  const auth = useAuthUser()();
  const qk = ["auth", auth?.id];
  const { data } = useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus: false,
  });
  const qc = useQueryClient();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const logout = () => {
    if (signOut()) {
      qc.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-sky-500">
            <div className="flex-none">
              <button className="btn btn-square btn-ghost">
                <label
                  htmlFor="my-drawer-2"
                  className="btn bg-white drawer-button py-0 px-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>{" "}
                </label>
              </button>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl mx-2 text-white">
                E-CAMPUS ADMINISTRATION
              </a>
            </div>
          </div>
         

      <Routes>
      <Route path="" element={<Etudiants />} />
     <Route path="users" element={<Users />} />
     <Route path="etudiants" element={<Etudiants />} />
     <Route path="etudiants/:id" element={<Etudiant />} />
     <Route path="transactions/:id" element={<Operations/>} />
     <Route path="services" element={<Services/>} />
     <Route path="services/:id" element={<PaymentSubject/>} />
     <Route path="comptes" element={<Comptes/>} />
     <Route path="*" element={<P404/>} />
     </Routes>
        </div>
        <div className="drawer-side bg-sky-500">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className=" w-80">
            <div className=" flex items-center justify-center my-5">
              <div className="avatar">
                <div className="w-24 rounded">
                  <img src="/img/logo_crousz.png" />
                </div>
              </div>
            </div>
            <div className="bg-white w-80 flex flex-col items-center justify-between space-y-20 py-5">
              <ul className="menu p-2 rounded-box bg-white w-full">
                <Link
                  to="/dashboard/users"
                  className="bg-white hover:bg-orange-400 hover:text-white  shadow-md text-center py-2"
                >
                  <FaUser className="inline text-green-600" /> UTILISATEURS
                </Link>
                <Link
                  to="/dashboard/etudiants"
                  className="bg-white hover:bg-orange-400 hover:text-white shadow-md text-center py-2"
                >
                  <FaUserGraduate className="inline text-green-600" /> ETUDIANTS
                </Link>
                <Link
                  to="/dashboard/comptes"
                  className="bg-white hover:bg-orange-400 hover:text-white shadow-md text-center py-2"
                >
                  <MdAccountBalanceWallet className="inline text-green-600" /> COMPTES
                </Link>
                <Link
                  to="/dashboard/services"
                  className="bg-white hover:bg-orange-400 hover:text-white shadow-md text-center py-2"
                >
                  <FcServices className="inline text-green-600" /> SERVICES
                </Link>
                {/* <Link
                  to="/dashboard/facturations"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <FaFileInvoice className="inline text-blue-600" />{" "}
                  FACTURATIONS
                </Link>
                <Link
                  to="/dashboard/clients"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <FaUsers className="inline text-fuchsia-600" /> CLIENTS
                </Link>
                <Link
                  to="/dashboard/fournisseurs"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <CiDeliveryTruck className="inline text-yellow-700 h-6 w-6" />
                  FOURNISSEURS
                </Link>
                <Link
                  to="/dashboard/stocks"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <FaStore className="inline text-fuchsia-600" />
                  STOCKS
                </Link>
                <Link
                  to="/dashboard/produits"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <FaProductHunt className="inline text-green-500 h-6 w-6" />
                  PRODUITS
                </Link>
                <Link
                  to="/dashboard/unites"
                  className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
                >
                  <FaAtom className="inline text-blue-500 h-6 w-6" />
                  UNITES
                </Link> */}
              </ul>
              <Button
                onClick={logout}
                className="btn rounded-md shadow-md text-center py-2 animate-pulse"
              >
                SE DECONNECTER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
