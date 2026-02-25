import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ProfileDeleteModal from "../components/profile/ProfileDeleteModal.jsx";
import ChangePassword from "../components/profile/ChangePassword.jsx";
import ProfileForm from "../components/profile/ProfileForm.jsx";
import ProfileSidebar from "../components/profile/ProfileSidebar.jsx";
import ProfileMainView from "../components/profile/ProfileMainView.jsx";
import { selectAuthUser, logout } from '../store/authSlice';
import { deleteUserAsync } from '../store/usersSlice';
import '../assets/styles/ProfileSettings.css';

export default function ProfileSettings() {
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState("main");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    const result = await dispatch(deleteUserAsync(user.id));

    if (deleteUserAsync.fulfilled.match(result)) {
      dispatch(logout());
      navigate("/login");
    } else {
      alert("Error al eliminar la cuenta. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="profile-settings">
      <div className="profile-settings__container">
        <nav aria-label="breadcrumb" className="profile-settings__breadcrumb">
          <ol>
            <li>
              <a href="/profile" className="breadcrumb-link">
                <i className="bi bi-house-door"></i>
                Perfil
              </a>
            </li>
            <li className="breadcrumb-active">
              <i className="bi bi-gear"></i>
              Ajustes y privacidad
            </li>
          </ol>
        </nav>
        
        <div className="profile-settings__layout">
          <div className="profile-settings__sidebar">
            <ProfileSidebar
              activeView={activeView}
              setActiveView={setActiveView}
              onDelete={() => setShowModal(true)}
            />
          </div>

          <div className="profile-settings__content">
            <div className="profile-settings__pane">
              {activeView === "main" && <ProfileMainView user={user} />}
              {activeView === "changePassword" && <ChangePassword user={user} />}
              {activeView === "profile" && <ProfileForm userData={user} />}
            </div>
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
