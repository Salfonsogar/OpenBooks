import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../components/ui/UserCard';
import ActivityTab from "../components/profile/ActivityTab";
import SuggestionsTab from "../components/profile/SuggestionsTab";
import PenaltiesTab from "../components/profile/PenaltiesTab";
import { selectAuthUser } from '../store/authSlice';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("actividad");
  const user = useSelector(selectAuthUser);
  const penalties = user?.sancionado
    ? [{ id: 1, motivo: "Cuenta sancionada", fecha: user.FechaRegistro, estado: "Activa" }]
    : [];

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <UserCard showSettingsButton={true} />
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "actividad" ? "active" : ""}`}
                      onClick={() => setActiveTab("actividad")}
                    >
                      <i className="bi bi-bar-chart me-2"></i>
                      Actividad
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "sugerencias" ? "active" : ""}`}
                      onClick={() => setActiveTab("sugerencias")}
                    >
                      <i className="bi bi-lightbulb-fill me-2"></i>
                      Sugerencias
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "penalizaciones" ? "active" : ""}`}
                      onClick={() => setActiveTab("penalizaciones")}
                    >
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Penalizaciones
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {activeTab === "actividad" && <ActivityTab user={user} />}
                {activeTab === "sugerencias" && <SuggestionsTab />}
                {activeTab === "penalizaciones" && <PenaltiesTab penalties={penalties} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}