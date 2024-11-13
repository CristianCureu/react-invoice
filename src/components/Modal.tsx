import { CSSProperties, ReactNode } from "react";

type InvoiceModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const Modal = ({ children, open, onClose }: InvoiceModalProps) => {
  if (!open) return null;

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

const modalBackdropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  zIndex: 1000,
};

const modalContentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  padding: "20px",
  maxWidth: "400px",
  width: "90%",
  position: "relative",
};

const closeButtonStyle: CSSProperties = {
  alignSelf: "flex-end",
  backgroundColor: "transparent",
  color: "#333",
  fontSize: "24px",
  border: "none",
  cursor: "pointer",
  margin: "-10px -10px 0 0",
};

export default Modal;
