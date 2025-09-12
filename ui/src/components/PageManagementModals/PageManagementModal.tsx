import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, category: string) => void;
  pageId: string;
  initialTitle?: string;
  initialCategory?: string;
  saving?: boolean;
}

const PageManagementModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  pageId,
  initialTitle = "",
  initialCategory = "",
  saving = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setCategory(initialCategory);
    }
  }, [isOpen, initialTitle, initialCategory]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (title.trim() === "" || category.trim() === "") {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }
    onSave(title, category);
  };

  return (
    <>
      <div style={darkBGStyle} onClick={onClose} />
      <div style={centeredStyle}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <div style={modalHeaderStyle}>
            <h3>Seite verwalten</h3>
            <button onClick={onClose} style={closeBtnStyle} disabled={saving}>
              X
            </button>
          </div>
          <div style={modalBodyStyle}>
            <label style={labelStyle}>
              Seitentitel:
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
                placeholder="Titel eingeben"
                disabled={saving}
              />
            </label>
            <label style={labelStyle}>
              Kategorie:
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
                placeholder="Kategorie eingeben"
                disabled={saving}
              />
            </label>
          </div>
          <div style={modalFooterStyle}>
            <button
              onClick={handleSubmit}
              style={saveBtnStyle}
              disabled={saving}
            >
              {saving ? "Speichert..." : "Speichern"}
            </button>
            <button
              onClick={onClose}
              style={cancelBtnStyle}
              disabled={saving}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles wie besprochen
const darkBGStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 999,
};
const centeredStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};
const modalStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px 30px",
  borderRadius: 8,
  width: 320,
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};
const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};
const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
};
const modalBodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
const labelStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  fontSize: 14,
  borderRadius: 4,
  border: "1px solid #ccc",
  marginTop: 4,
  boxSizing: "border-box",
};
const modalFooterStyle: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};
const saveBtnStyle: React.CSSProperties = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: 4,
};
const cancelBtnStyle: React.CSSProperties = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: 4,
};

export default PageManagementModal;
