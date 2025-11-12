import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDeleteModal from "../components/profile/ProfileDeleteModal.jsx";
import ChangePassword from "../components/profile/ChangePassword.jsx";
import ProfileForm from "../components/profile/ProfileForm.jsx";
import ProfileSidebar from "../components/profile/ProfileSidebar.jsx";
import ProfileMainView from "../components/profile/ProfileMainView.jsx";

export default function ProfileSettings() {
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState("main");
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    console.log("Cuenta eliminada");
    alert("Cuenta eliminada correctamente");
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-light py-0">
      <div className="container" style={{ maxWidth: "1200px" }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb bg-white p-3 rounded shadow-sm">
            <li className="breadcrumb-item">
              <a href="/profile" className="text-decoration-none text-primary">
                <i className="bi bi-house-door me-2"></i>
                Perfil
              </a>
            </li>
            <li className="breadcrumb-item active">
              <i className="bi bi-gear me-2"></i>
              Ajustes y privacidad
            </li>
          </ol>
        </nav>
        <div className="row g-4">
          <div className="col-lg-3">
            <ProfileSidebar
              activeView={activeView}
              setActiveView={setActiveView}
              onDelete={() => setShowModal(true)}
            />
          </div>

          <div className="col-lg-9">
              {activeView === "main" && <ProfileMainView/>}
              {activeView === "changePassword" && (
                <div className="card-body">
                  <ChangePassword />
                </div>
              )}
              {activeView === "profile" && (
                <ProfileForm />
              )}
          </div>
        </div>

        {showModal && (
          <ProfileDeleteModal
            onClose={() => setShowModal(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </div>
    </div>
  );
}
