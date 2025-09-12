import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface MenuProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  backgroundColor: string;
  textColor?: string;
  isEditorMode?: boolean; // neue Prop, die angibt ob Editor-Modus aktiv ist
}

const Menu: React.FC<MenuProps> = ({
  selectedTemplate,
  onTemplateChange,
  backgroundColor,
  textColor = 'white',
  isEditorMode = false,
}) => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor,
        color: textColor,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      }}
    >
      <div>
        <Link
          to="/pages"
          style={{
            color: textColor,
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <FontAwesomeIcon icon={faHome} />
          Alle Seiten
        </Link>
      </div>

      {isEditorMode && (
        <div style={{ fontWeight: 'bold', fontSize: 16, color: textColor }}>
          Editor Mode
        </div>
      )}

      <div>
        <label
          htmlFor="template-select"
          style={{ marginRight: 10, fontWeight: '500', color: textColor }}
        >
          Template:
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          style={{
            padding: 6,
            borderRadius: 4,
            border: 'none',
            backgroundColor: 'inherit',
            color: textColor,
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          <option value="database" style={{ color: 'black' }}>
            Standard Template
          </option>
          <option value="alternative" style={{ color: 'black' }}>
            Alternatives Template
          </option>
        </select>
      </div>
    </nav>
  );
};

export default Menu;
