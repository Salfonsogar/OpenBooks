import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../components/ui/UserCard';
import ActivityTab from "../components/profile/ActivityTab";
import SuggestionsTab from "../components/profile/SuggestionsTab";
import PenaltiesTab from "../components/profile/PenaltiesTab";
import { selectAuthUser } from '../store/authSlice';
import "../assets/styles/profile.css";

const TABS = [
  {
    id: "actividad",
    label: "Actividad",
    icon: "bi-bar-chart-line-fill",
    description: "Tu historial de lectura"
  },
  {
    id: "sugerencias",
    label: "Sugerencias",
    icon: "bi-lightbulb-fill",
    description: "Comparte tus ideas"
  },
  {
    id: "penalizaciones",
    label: "Penalizaciones",
    icon: "bi-shield-exclamation",
    description: "Estado de tu cuenta"
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("actividad");
  const user = useSelector(selectAuthUser);
  const penalties = user?.sancionado
    ? [{ id: 1, motivo: "Cuenta sancionada", fecha: user.FechaRegistro, estado: "Activa" }]
    : [];

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div className="profile-page">

      {/* ── TOP HERO BAND ───────────────────────────────────── */}
      <div className="profile-hero">
        <div className="profile-hero__noise" aria-hidden="true" />
        <div className="profile-hero__content">
          <span className="profile-hero__eyebrow">Mi cuenta</span>
          <h1 className="profile-hero__title">Mi Perfil</h1>
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────── */}
      <div className="profile-grid">

        {/* LEFT: UserCard */}
        <aside className="profile-aside">
          <UserCard showSettingsButton={true} />
        </aside>

        {/* RIGHT: Dashboard panel */}
        <section className="profile-content">

          <div className="profile-dashboard">

            {/* Vertical tab nav */}
            <nav className="profile-nav" aria-label="Secciones del perfil">
              <p className="profile-nav__label">Secciones</p>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={"profile-nav__item" + (activeTab === tab.id ? " is-active" : "")}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <span className="profile-nav__icon-wrap">
                    <i className={"bi " + tab.icon} aria-hidden="true" />
                  </span>
                  <span className="profile-nav__text">
                    <span className="profile-nav__name">{tab.label}</span>
                    <span className="profile-nav__desc">{tab.description}</span>
                  </span>
                  <i className="bi bi-chevron-right profile-nav__arrow" aria-hidden="true" />
                </button>
              ))}
            </nav>

            {/* Content pane */}
            <div className="profile-pane">
              <div className="profile-pane__header">
                <span className="profile-pane__icon">
                  <i className={"bi " + currentTab?.icon} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="profile-pane__title">{currentTab?.label}</h2>
                  <p className="profile-pane__subtitle">{currentTab?.description}</p>
                </div>
              </div>

              <div className="profile-pane__body" key={activeTab}>
                {activeTab === "actividad" && <ActivityTab user={user} />}
                {activeTab === "sugerencias" && <SuggestionsTab />}
                {activeTab === "penalizaciones" && <PenaltiesTab penalties={penalties} />}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}