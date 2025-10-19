import { Link } from "react-router-dom";

export default function FeatureCard({ title, text, to, buttonText }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title text-main">{title}</h5>
          <p className="card-text text-secondary">{text}</p>
          <Link to={to} className="button">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}