import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faEye, faPen, faCog } from '@fortawesome/free-solid-svg-icons';
import PageManagementModal from '../../PageManagementModals/PageManagementModal'; // Pfad anpassen


const outerContainerStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: '40px auto',
  padding: 0,
  fontFamily: "'Montserrat', sans-serif",
};

const controlsBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
  padding: '8px 20px',
  backgroundColor: '#fff',
  borderRadius: '12px 12px 0 0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const buttonStyle: React.CSSProperties = {
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  color: '#111',
  fontSize: '1.5rem',
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  height: 'calc(100vh)', // Höhe ohne Steuerleiste
  width: '100%',
  backgroundImage: `url('https://thumbs.dreamstime.com/b/pizza-slices-flying-black-background-delicious-peperoni-pieces-melting-cheese-ingredients-generated-ai-330564419.jpg')`,
  backgroundSize: '100% auto',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  color: '#fff',
  borderRadius: '0 0 16px 16px',
  boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
  overflow: 'hidden',

};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '0 0 16px 16px',
  zIndex: 0,
};

const titleStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  fontSize: '6rem',
  fontWeight: 'bold',
  marginBottom: 12,
  textAlign: 'center' as const,
  textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
  userSelect: 'none',
};

const priceStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  fontSize: '3rem',
  fontWeight: '600',
  textAlign: 'center' as const,
  textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
  userSelect: 'none',
};

const PriceListTemplateAlternativeDummy: React.FC = () => {
  const [title, setTitle] = useState('Pizzen');
  const [price, setPrice] = useState('ab 19.99 CHF');
  const [previewMode, setPreviewMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const saveChanges = () => {
    alert(`Gespeichert: ${title} - ${price} (Dummy-Funktion)`);
  };

  const handleSavePage = (newTitle: string, newCategory: string) => {
    setTitle(newTitle);
    // Hier kannst du ggf. weitere Aktionen mit newCategory machen
    setModalOpen(false);
    alert(`Seite gespeichert: ${newTitle} (Kategorie: ${newCategory})`);
  };

  // Dummy Page-Objekt analog deinem Original für Übergabe an Modal:
  const page = {
    _id: 'dummy-id',
    title,
    category: 'Demo Kategorie',
  };

  return (
    <div style={outerContainerStyle}>
      {/* Steuerungsleiste oben */}
      <div style={controlsBarStyle}>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          title={previewMode ? "Bearbeitungsmodus" : "Vorschau umschalten"}
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        {!previewMode && (
          <>
            <button
              onClick={saveChanges}
              title="Speichern"
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              title="Einstellungen"
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faCog} />
            </button>
          </>
        )}
      </div>

      {/* Bildcontainer */}
      <div style={containerStyle}>
        <div style={overlayStyle} />
        {previewMode ? (
          <>
            <h1 style={titleStyle}>{title}</h1>
            <div style={priceStyle}>{price}</div>
          </>
        ) : (
          <>
            <h1
              style={titleStyle}
              contentEditable
              suppressContentEditableWarning
              onInput={e => setTitle(e.currentTarget.textContent || '')}
            >
              {title}
            </h1>
            <div
              style={priceStyle}
              contentEditable
              suppressContentEditableWarning
              onInput={e => setPrice(e.currentTarget.textContent || '')}
            >
              {price}
            </div>
          </>
        )}
      </div>

      {/* PageManagementModal als Modal Fenster */}
      <PageManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePage}
        pageId={page._id}
        initialTitle={page.title}
        initialCategory={page.category}
      />
    </div>
  );
};

export default PriceListTemplateAlternativeDummy;
