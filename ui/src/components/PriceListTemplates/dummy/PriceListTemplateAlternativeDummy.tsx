import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../IconLibrary/IconLibrary';
import PageManagementModal from '../../PageManagementModals/PageManagementModal';

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

const dummyPage: Page = {
  _id: "68c308d3c5b64fe319d8277f",
  title: "Demo Preisliste",
  category: "Demo Kategorie",
  content: {
    Pizzen: [
      { name: "Margherita", preis: 12.5 },
      { name: "Salami", preis: 14.0 },
      { name: "Prosciutto", preis: 15.0 },
      { name: "Funghi", preis: 13.5 },
      { name: "Quattro Stagioni", preis: 16.0 },
      { name: "Diavola", preis: 15.5 },
      { name: "Vegetarisch", preis: 14.0 },
      { name: "Tonno", preis: 16.5 },
      { name: "Hawaii", preis: 15.0 },
      { name: "Calzone", preis: 17.0 },
    ],
    Nudle: [
      { name: "Spaghetti Bolognese", preis: 14.0 },
      { name: "Penne Arrabiata", preis: 13.5 },
      { name: "Tagliatelle al Pesto", preis: 15.0 },
      { name: "Lasagne", preis: 16.0 },
      { name: "Tortellini panna", preis: 15.5 },
    ],
    Kaltgetränk: [
      { name: "Cola", preis: 4.5 },
      { name: "Orangina", preis: 4.5 },
      { name: "Mineralwasser", preis: 3.5 },
      { name: "Apfelsaft", preis: 4.0 },
      { name: "Eistee", preis: 4.5 },
    ],
    Café: [
      { name: "Espresso", preis: 3.5 },
      { name: "Cappuccino", preis: 4.5 },
      { name: "Latte Macchiato", preis: 4.5 },
      { name: "Schale Kaffee", preis: 4.0 },
    ],
  },
};

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
  paddingBottom: 6,
  marginBottom: 16,
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

const PriceListTemplateAlternativeDummy: React.FC<Props> = (props) => {
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
      .catch(() => {
        alert('Fehler beim Laden der Preisliste, Dummy-Daten werden verwendet');
        setPage(dummyPage);
      });
  }, [pageId]);

  if (!page) return <div>Lade Preisliste...</div>;

  const toggleEdit = (category: string, index: number) => {
    if (previewMode) return;
    setEditing(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: !prev[category]?.[index],
      },
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
    if (page._id === dummyPage._id) {
      alert('Dummy-Daten: Speichern simuliert');
      return;
    }
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
      dummy
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

export default PriceListTemplateAlternativeDummy;
