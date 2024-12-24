import "./backdrop.css";

// eslint-disable-next-line react/prop-types
const Backdrop = ({ show, onClose }) => {
  return show ? <div className="Backdrop" onClick={onClose}></div> : null;
};

export default Backdrop;
