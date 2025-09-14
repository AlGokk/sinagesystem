import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faPlus } from '@fortawesome/free-solid-svg-icons';

import PriceListTemplateDummy from '../PriceListTemplates/dummy/PriceListTemplateDummy';

const GenericPage: React.FC<{
  title: string;
  isFullscreen?: boolean;
  fullscreenRef?: React.RefObject<HTMLDivElement>;
}> = ({ title, isFullscreen, fullscreenRef }) => {
  const DIN_A4_WIDTH = 794;
  const DIN_A4_HEIGHT = 1123;

  const pageStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: isFullscreen ? 0 : 8,
    boxShadow: isFullscreen ? 'none' : '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: isFullscreen ? 0 : 40,
    padding: isFullscreen ? '40px 60px' : 40,
    width: isFullscreen ? '100vw' : DIN_A4_WIDTH,
    height: isFullscreen ? '100vh' : DIN_A4_HEIGHT,
    boxSizing: 'border-box',
    overflow: 'auto',
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? 0 : undefined,
    left: isFullscreen ? 0 : undefined,
    zIndex: isFullscreen ? 5000 : undefined,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 18,
    lineHeight: 1.6,
  };

  return (
    <div ref={fullscreenRef} style={pageStyle}>
      {title === 'Seite 1' ? (
        <PriceListTemplateDummy previewMode={isFullscreen ?? false} />
      ) : (
        <>
          <h2>{title}</h2>
          {isFullscreen ? 'im Vollbildmodus' : ''}
        </>
      )}
    </div>
  );
};


const MultiPageContainer: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const [pages, setPages] = useState<{ id: string; title: string }[]>([{ id: '1', title: 'Seite 1' }]);
  const [fullscreenPageId, setFullscreenPageId] = useState<string | null>(null);

  // Refs mit dynamischem Map für die Seitencontainer
  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageId && pageRefs.current[pageId]) {
      pageRefs.current[pageId]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageId]);

  useEffect(() => {
    if (fullscreenPageId) {
      const elem = fullscreenRef.current;
      if (elem && fullscreenPageId === '1') {
        elem.requestFullscreen?.().catch(console.error);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    }
  }, [fullscreenPageId]);

  const addPage = () => {
    const newPageId = (pages.length + 1).toString();
    setPages([...pages, { id: newPageId, title: `Seite ${newPageId}` }]);
    navigate(`/page/${newPageId}`);
  };

  const deletePage = (id: string) => {
    if (id === '1') return;
    setPages((prev) => {
      const newPages = prev.filter((p) => p.id !== id);
      if (pageId === id) navigate('/page/1');
      return newPages;
    });
  };

  const toggleFullscreen = (id: string) => {
    if (fullscreenPageId === id) {
      document.exitFullscreen().catch(console.error);
      setFullscreenPageId(null);
    } else {
      setFullscreenPageId(id);
    }
  };

  const scrollToPage = (id: string) => {
    pageRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
    navigate(`/page/${id}`);
  };

  const isFullscreenActive = fullscreenPageId !== null;

const buttonStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  borderRadius: 6,
  marginBottom: '6px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  transition: 'background-color 0.3s ease',
  backgroundColor: '#d3d3d3',  // hellgrau
  color: '#111', // dunkle Schrift, optional
};


  const closeFullscreenButtonStyle: React.CSSProperties = {
    position: 'fixed',
    top: 20,
    right: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    zIndex: 10000,
    display: isFullscreenActive ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      {!isFullscreenActive && <Header />}

      {/* Neue Seitenliste unter Header, über den Seiten */}
      {!isFullscreenActive && (
        <div style={{ display: 'flex', padding: '10px 20px', overflowX: 'auto', gap: 8, backgroundColor: '#eef2f5' }}>
          {pages.map((page) => (
            <button key={page.id} style={buttonStyle} onClick={() => scrollToPage(page.id)}>
              {page.title}
            </button>
          ))}
        </div>
      )}

      {isFullscreenActive && (
        <button
          style={closeFullscreenButtonStyle}
          onClick={() => toggleFullscreen(fullscreenPageId!)}
          title="Vollbildmodus schließen"
          aria-label="Vollbildmodus schließen"
        >
          <FontAwesomeIcon icon={faCompress} size="lg" />
        </button>
      )}

      <div
        style={{
          backgroundColor: isFullscreenActive ? '#000' : '#f0f0f0',
          minHeight: '100vh',
          padding: isFullscreenActive ? '0' : '40px',
          marginTop: isFullscreenActive ? 0 : 0,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            ref={(el) => (pageRefs.current[page.id] = el)}
            style={{
              display: fullscreenPageId === page.id || fullscreenPageId === null ? 'flex' : 'none',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '40px',
              scrollMarginTop: 90,
            }}
          >
            <GenericPage
              title={page.title}
              isFullscreen={fullscreenPageId === page.id}
              fullscreenRef={page.id === '1' ? fullscreenRef : undefined}
            />

            {!isFullscreenActive && (
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '60px' }}>
                {page.id !== '1' && (
                  <button
                    style={{ ...buttonStyle, backgroundColor: '#ff4d4d' }}
                    onClick={() => deletePage(page.id)}
                    title="Seite löschen"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/484/484662.png"
                      alt="Löschen"
                      style={{ width: 20, height: 20 }}
                    />
                  </button>
                )}
                <button
                  style={{ ...buttonStyle, backgroundColor: '#007bff', color: '#fff' }}
                  onClick={() => toggleFullscreen(page.id)}
                  title={fullscreenPageId === page.id ? "Vollbild schließen" : "Vollbild"}
                >
                  <FontAwesomeIcon icon={fullscreenPageId === page.id ? faCompress : faExpand} />
                </button>
              </div>
            )}
          </div>
        ))}
        {!isFullscreenActive && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button
              style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}
              onClick={addPage}
              title="Neue Seite hinzufügen"
            >
              <FontAwesomeIcon icon={faPlus} /> Neue Seite
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPageContainer;
