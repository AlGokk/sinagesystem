import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Header from './Header';

const MultiPageContainer: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageId === '1' && page1Ref.current) {
      page1Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (pageId === '2' && page2Ref.current) {
      page2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageId]);

  const buttonContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    gap: '10px',
    padding: '10px 0',
    backgroundColor: 'transparent',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#e0e0e0',
    color: '#333',
    transition: 'background-color 0.3s ease',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#555',
    color: '#fff',
  };

  return (
    <div>
      <Header />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          padding: '40px 0',
          fontFamily: "'Montserrat', sans-serif",
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: 900, width: '100%', position: 'relative' }}>
          {/* Buttons über Page 1 */}
          <div style={buttonContainerStyle}>
            <button
              style={pageId === '1' ? activeButtonStyle : buttonStyle}
              onClick={() => navigate('/page/1')}
            >
              Seite 1
            </button>
            <button
              style={pageId === '2' ? activeButtonStyle : buttonStyle}
              onClick={() => navigate('/page/2')}
            >
              Seite 2
            </button>
          </div>

          {/* Page 1 mit größerem Abstand zum Button */}
          <div
            ref={page1Ref}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginTop: 80, // Abstand vergrößert
              marginBottom: 40,
              padding: 20,
              minHeight: '600px',
            }}
          >
            <Page1 />
          </div>
          <div
            ref={page2Ref}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: 40,
              padding: 20,
              minHeight: '600px',
            }}
          >
            <Page2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPageContainer;
