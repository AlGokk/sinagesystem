import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Page {
  _id: string;
  title: string;
  category: string;
}

const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);

  // Seite laden
  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Page[]>('/api/pages');
      setPages(res.data);
    } catch {
      alert('Fehler beim Laden der Seiten');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Seite auswählen zum Bearbeiten
  const handleSelectPage = (page: Page) => {
    setSelectedPage(page);
  };

  // Neue Seite zum Anlegen vorbereiten
  const createNewPage = () => {
    setSelectedPage({ _id: '', title: '', category: '' });
  };

  // Eingabefelder verändern
  const handleFieldChange = (field: 'title' | 'category', value: string) => {
    if (!selectedPage) return;
    setSelectedPage({ ...selectedPage, [field]: value });
  };

  // Speichern (Erstellen oder Update)
  const savePage = async () => {
    if (!selectedPage) return;
    try {
      if (selectedPage._id) {
        // Update
        await axios.put(`/api/pages/${selectedPage._id}`, selectedPage);
      } else {
        // Neu anlegen
        await axios.post('/api/pages', selectedPage);
      }
      alert('Seite gespeichert');
      setSelectedPage(null);
      fetchPages();
    } catch {
      alert('Fehler beim Speichern');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      {!selectedPage ? (
        <>
          <h1>Seitenverwaltung</h1>
          <button onClick={createNewPage} style={{ marginBottom: 16 }}>
            Neue Seite erstellen
          </button>
          {loading ? (
            <p>Lädt...</p>
          ) : pages.length === 0 ? (
            <p>Keine Seiten vorhanden.</p>
          ) : (
            <ul>
              {pages.map((page) => (
                <li key={page._id} style={{ marginBottom: 10 }}>
                  <b>{page.title}</b> - <i>{page.category}</i>{' '}
                  <button onClick={() => handleSelectPage(page)}>Bearbeiten</button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <h2>{selectedPage._id ? 'Seite bearbeiten' : 'Neue Seite anlegen'}</h2>
          <label>
            Titel:
            <input
              type="text"
              value={selectedPage.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              style={{ width: '100%', padding: '6px', margin: '8px 0' }}
            />
          </label>
          <label>
            Kategorie:
            <input
              type="text"
              value={selectedPage.category}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              style={{ width: '100%', padding: '6px', margin: '8px 0' }}
            />
          </label>
          <button onClick={savePage} style={{ marginRight: 12 }}>
            Speichern
          </button>
          <button onClick={() => setSelectedPage(null)}>Abbrechen</button>
        </>
      )}
    </div>
  );
};

export default PagesManager;
