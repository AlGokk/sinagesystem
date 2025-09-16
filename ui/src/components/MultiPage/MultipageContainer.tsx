import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faPlus, faImage } from '@fortawesome/free-solid-svg-icons';

import PriceListTemplateDummy from '../PriceListTemplates/dummy/PriceListTemplateDummy';

import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const GenericPage: React.FC<{
  title: string;
  isFullscreen?: boolean;
  fullscreenRef?: React.RefObject<HTMLDivElement>;
  pageWidth: number | string;
  pageHeight: number | string;
  imageSrc?: string;
}> = ({ title, isFullscreen, fullscreenRef, pageWidth, pageHeight, imageSrc }) => {
  const pageStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: isFullscreen ? 0 : 8,
    boxShadow: isFullscreen ? 'none' : '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: isFullscreen ? 0 : 40,
    padding: isFullscreen ? '40px 60px' : 40,
    width: isFullscreen ? '100vw' : pageWidth,
    height: isFullscreen ? '100vh' : pageHeight,
    boxSizing: 'border-box',
    overflow: 'auto',
    position: 'relative',
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
          {isFullscreen ? '' : ''}
        </>
      )}

      {imageSrc && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, width: '100%' }}>
          <ResizableBox
            width={300}
            height={200}
            minConstraints={[100, 100]}
            maxConstraints={[
              typeof pageWidth === 'number' ? pageWidth : 800,
              typeof pageHeight === 'number' ? pageHeight : 600,
            ]}
            resizeHandles={['se']}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={imageSrc}
              alt={`Bild für ${title}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
            />
          </ResizableBox>
        </div>
      )}
    </div>
  );
};

const MultiPageContainer: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery({ minWidth: 1920 });
  const isDesktop = useMediaQuery({ minWidth: 1200, maxWidth: 1919 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });

  const pageWidth = isLargeScreen ? 1123 : isDesktop ? 794 : isTablet ? '90vw' : '100vw';
  const pageHeight = isLargeScreen ? 1587 : isDesktop ? 1123 : isTablet ? 'auto' : 'auto';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pageImages, setPageImages] = useState<Record<string, string>>({});
  const [pages, setPages] = useState<{ id: string; title: string }[]>([{ id: '1', title: 'Seite 1' }]);
  const [fullscreenPageId, setFullscreenPageId] = useState<string | null>(null);

  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof FileReader === 'undefined') {
      console.error('FileReader nicht verfügbar.');
      return;
    }
    const files = event.target.files;
    if (!files || files.length === 0 || !pageId) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPageImages(prev => ({ ...prev, [pageId]: reader.result as string }));
      }
    };
    reader.onerror = () => {
      console.error('Fehler beim Lesen der Datei');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (fullscreenPageId) {
      const elem = pageRefs.current[fullscreenPageId];
      if (elem) {
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
    setPages(prev => [...prev, { id: newPageId, title: `Seite ${newPageId}` }]);
    navigate(`/page/${newPageId}`);
  };

  const deletePage = (id: string) => {
    if (id === '1') return;
    setPages(prev => {
      const newPages = prev.filter(p => p.id !== id);
      if (pageId === id) navigate('/page/1');
      return newPages;
    });
    setPageImages(prev => {
      const newImages = { ...prev };
      delete newImages[id];
      return newImages;
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
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  };

  const closeFullscreenButtonStyle: React.CSSProperties = {
    position: 'fixed',
    top: 20,
    right: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
    padding: '10px 14px',
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

      {!isFullscreenActive && (
        <div
          style={{
            display: 'flex',
            padding: '10px 20px',
            overflowX: 'auto',
            gap: 8,
            backgroundColor: '#eef2f5',
          }}
        >
          {pages.map((page) => (
            <button
              key={page.id}
              style={{ ...buttonStyle, backgroundColor: '#d3d3d3', color: '#111' }}
              onClick={() => scrollToPage(page.id)}
            >
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
          padding: isFullscreenActive ? 0 : 40,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            ref={(el) => (pageRefs.current[page.id] = el)}
            style={{
              display: fullscreenPageId === page.id || fullscreenPageId === null ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: fullscreenPageId === page.id ? 'center' : 'flex-start',
              height: fullscreenPageId === page.id ? '100vh' : 'auto',
              marginBottom: fullscreenPageId === page.id ? 0 : 60,
              scrollMarginTop: fullscreenPageId === page.id ? 0 : 90,
              width: '100%',
            }}
          >
            {/* Bild Icon nur anzeigen wenn kein Bild vorhanden */}
            {!isFullscreenActive && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: pageWidth, gap: 8, marginBottom: 8 }}>
                {page.id !== '1' && (
                  <button
                    style={{ ...buttonStyle, backgroundColor: '#ff4d4d' }}
                    onClick={() => deletePage(page.id)}
                    title="Seite löschen"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/484/484662.png"
                      alt="Löschen"
                      style={{ width: 18, height: 18 }}
                    />
                  </button>
                )}

                {!pageImages[page.id] && (
                  <button
                    style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
                    onClick={openFileDialog}
                    title="Foto hochladen"
                  >
                    <FontAwesomeIcon icon={faImage} />
                  </button>
                )}

                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={onFileChange} />

                <button
                  style={{ ...buttonStyle, backgroundColor: '#007bff' }}
                  onClick={() => toggleFullscreen(page.id)}
                  title={fullscreenPageId === page.id ? 'Vollbild schließen' : 'Vollbild'}
                >
                  <FontAwesomeIcon icon={fullscreenPageId === page.id ? faCompress : faExpand} />
                </button>
              </div>
            )}

            <GenericPage
              title={page.title}
              isFullscreen={fullscreenPageId === page.id}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              imageSrc={pageImages[page.id]}
            />
          </div>
        ))}

        {!isFullscreenActive && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <button style={{ ...buttonStyle, backgroundColor: '#28a745' }} onClick={addPage} title="Neue Seite hinzufügen">
              <FontAwesomeIcon icon={faPlus} /> Neue Seite
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPageContainer;
