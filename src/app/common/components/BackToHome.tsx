import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/constants";

export default function BackToHome() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <button className="arrow arrow__back" onClick={handleBack}>
      <span className="material-icons">chevron_left</span>
      <h3> Back to home</h3>
    </button>
  );
}
