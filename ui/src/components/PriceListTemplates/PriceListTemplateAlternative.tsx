import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Icon from '../IconLibrary/IconLibrary'; // Deine zentrale Icon-Komponente
import PageManagementModal from '../PageManagementModals/PageManagementModal';

interface ContentItem {
  name: string;
  preis: number;
}

interface CategoryContent {
  [category: string]: ContentItem[];
}

interface Page {
  _id: string;
  title: string;
  category: string;
  content: CategoryContent;
}

interface Props {
  pageId?: string;
  previewMode?: boolean;
}

const containerStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: '40px auto',
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  fontFamily: "'Montserrat', sans-serif",
  color: '#111',
  position: 'relative',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 20,
  gap: 20,
};

const logoStyle: React.CSSProperties = {
  width: 100,
  height: 100,
  objectFit: 'contain',
};

const sectionStyle: React.CSSProperties = {
  borderBottom: '2px solid #ccc',
  paddingBottom: '6px',
  marginBottom: '16px',
};

const itemStyle = (isLast: boolean): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: isLast ? 'none' : '1px solid #eee',
});

const columnStyle: React.CSSProperties = {
  flexBasis: '48%',
};

const PriceListTemplateAlternative: React.FC<Props> = (props) => {
  const { pageId: propPageId, previewMode = false } = props;
  const { pageId: paramPageId } = useParams<{ pageId: string }>();
  const pageId = propPageId || paramPageId || '';

  const [page, setPage] = useState<Page | null>(null);
  const [editing, setEditing] = useState<{ [category: string]: { [index: number]: boolean } }>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!pageId) return;
    axios.get(`/api/pages/${pageId}`)
      .then(res => setPage(res.data))
      .catch(() => alert('Fehler beim Laden der Preisliste'));
  }, [pageId]);

  if (!page) return <div>Lade Preisliste...</div>;

  const toggleEdit = (category: string, index: number) => {
    if (previewMode) return; // Keine Editierfunktion im Preview
    setEditing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: !prev[category]?.[index],
      }
    }));
  };

  const handleChange = (
    category: string,
    index: number,
    field: keyof ContentItem,
    value: string | number,
  ) => {
    if (!page || previewMode) return;
    const newContent = { ...page.content };
    const items = [...(newContent[category] || [])];
    items[index] = {
      ...items[index],
      [field]: field === 'preis' ? Number(value) : value,
    };
    newContent[category] = items;
    setPage({ ...page, content: newContent });
  };

  const saveChanges = async () => {
    if (!page || previewMode) return;
    try {
      await axios.put(`/api/pages/${page._id}`, {
        title: page.title,
        category: page.category,
        content: page.content,
      });
      alert('Preisliste gespeichert');
    } catch {
      alert('Fehler beim Speichern');
    }
  };

  const handleSavePage = (title: string, category: string) => {
    alert(`Seite speichern: ${title} (Kategorie: ${category})`);
    setModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/011/157/909/small_2x/pizzeria-emblem-on-blackboard-pizza-logo-template-emblem-for-cafe-restaurant-or-food-delivery-service-vector.jpg"
          alt="Logo"
          style={logoStyle}
        />
        <h1>{page.title}</h1>
      </div>

      {!previewMode && (
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 16 }}>
          <button
            onClick={() => setModalOpen(true)}
            title="Seitenverwaltung öffnen"
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <Icon name="cog" size="lg" />
          </button>

          <Link to={`/preview/${pageId}`} title="Vorschau" style={{ color: 'inherit', display: 'inline-block' }}>
            <div style={{ cursor: 'pointer' }}>
              <Icon name="eye" size="lg" />
            </div>
          </Link>

          <button
            onClick={saveChanges}
            title="Speichern"
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <Icon name="floppyDisk" size="lg" />
          </button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Erste Spalte */}
        <div style={columnStyle}>
          {['Pizzen', 'Nudle'].map(category => (
            <section key={category}>
              <h2 style={sectionStyle}>{category}</h2>
              {(page.content[category] || []).map((item, idx) => {
                const isEditing = editing[category]?.[idx] || false;
                return (
                  <div key={idx} style={itemStyle(idx === (page.content[category]?.length || 0) - 1)}>
                    {previewMode ? (
                      <>
                        <span>{item.name}</span>
                        <span>{item.preis.toFixed(2)} CHF</span>
                      </>
                    ) : isEditing ? (
                      <>
                        <input
                          value={item.name}
                          onChange={e => handleChange(category, idx, 'name', e.target.value)}
                          style={{ flex: 2, marginRight: 10 }}
                        />
                        <input
                          type="number"
                          value={item.preis}
                          onChange={e => handleChange(category, idx, 'preis', Number(e.target.value))}
                          style={{ width: 80, marginRight: 10 }}
                        />
                        <button onClick={() => toggleEdit(category, idx)}>Fertig</button>
                      </>
                    ) : (
                      <>
                        <span>{item.name}</span>
                        <span>{item.preis.toFixed(2)} CHF</span>
                        <button
                          onClick={() => toggleEdit(category, idx)}
                          title="Bearbeiten"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <Icon name="pen" />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>

        {/* Zweite Spalte */}
        <div style={columnStyle}>
          {['Kaltgetränk', 'Café'].map(category => (
            <section key={category}>
              <h2 style={sectionStyle}>{category}</h2>
              {(page.content[category] || []).map((item, idx) => {
                const isEditing = editing[category]?.[idx] || false;
                return (
                  <div key={idx} style={itemStyle(idx === (page.content[category]?.length || 0) - 1)}>
                    {previewMode ? (
                      <>
                        <span>{item.name}</span>
                        <span>{item.preis.toFixed(2)} CHF</span>
                      </>
                    ) : isEditing ? (
                      <>
                        <input
                          value={item.name}
                          onChange={e => handleChange(category, idx, 'name', e.target.value)}
                          style={{ flex: 2, marginRight: 10 }}
                        />
                        <input
                          type="number"
                          value={item.preis}
                          onChange={e => handleChange(category, idx, 'preis', Number(e.target.value))}
                          style={{ width: 80, marginRight: 10 }}
                        />
                        <button onClick={() => toggleEdit(category, idx)}>Fertig</button>
                      </>
                    ) : (
                      <>
                        <span>{item.name}</span>
                        <span>{item.preis.toFixed(2)} CHF</span>
                        <button
                          onClick={() => toggleEdit(category, idx)}
                          title="Bearbeiten"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <Icon name="pen" />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </div>

      <PageManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePage}
        pageId={page?._id || ''}
        initialTitle={page?.title || ''}
        initialCategory={page?.category || ''}
      />
    </div>
  );
};

export default PriceListTemplateAlternative;
