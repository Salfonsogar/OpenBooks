import { useState } from 'react';
import UserCard from '../components/ui/UserCard';
import ActivityTab from "../components/profile/ActivityTab";
import SuggestionsTab from "../components/profile/SuggestionsTab";
import PenaltiesTab from "../components/profile/PenaltiesTab";

const mockUserData = {
  nombre: "María García",
  email: "maria@example.com",
  role: "Usuario",
  avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  bio: "Amante de la literatura clásica y moderna. Administradora de la biblioteca digital.",
  intereses: "Literatura, Historia, Filosofía",
  librosLeidos: 24,
  enProgreso: 8,
  horasTotales: 156
};

const mockPenalties = [
  { id: 1, motivo: "Comentario ofencivo en foro grupal", fecha: "2025-09-20", estado: "Activa" },
  { id: 2, motivo: "Homoxesualidad detectada, eres gei 🏳️‍🌈?", fecha: "2025-08-15", estado: "calajo" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("actividad");

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <UserCard
              imgSrc={mockUserData.avatar}
              name={mockUserData.nombre}
              email={mockUserData.email}
              role={mockUserData.role}
              showSettingsButton={true}
            />
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
                {activeTab === "actividad" && <ActivityTab user={mockUserData} />}
                {activeTab === "sugerencias" && <SuggestionsTab />}
                {activeTab === "penalizaciones" && <PenaltiesTab penalties={mockPenalties} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}