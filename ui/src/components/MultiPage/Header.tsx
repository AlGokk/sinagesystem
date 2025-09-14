import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: 'orange', // Setze die Farbe hier explizit
        padding: '15px 20px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        width: '100%',             // Header soll volle Breite ausfüllen
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1000,              // Header über anderen Elementen
      }}
    >
      <nav>
        <Link
          to="/page-management"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          <FontAwesomeIcon icon={faHome} />
          Seitenverwaltung
        </Link>
      </nav>
    </header>
  );
};

export default Header;
