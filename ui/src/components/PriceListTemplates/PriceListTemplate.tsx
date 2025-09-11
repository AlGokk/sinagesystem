import React, { useEffect, useState } from 'react';
import axios from 'axios';

// FontAwesome Importe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faEye } from '@fortawesome/free-solid-svg-icons';

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
  pageId: string;
}

// Styles (inline als Beispiel)
const sectionStyle = {
  borderBottom: "2px solid #ccc",
  paddingBottom: "6px",
  marginBottom: "16px",
};

const itemStyle = (isLast: boolean) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: isLast ? "none" : "1px solid #eee",
});

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: 900,
  margin: "40px auto",
  backgroundColor: "#fff",
  color: "#111",
  fontFamily: "'Montserrat', sans-serif",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  position: "relative" as "relative",
};

const columnStyle = {
  flexBasis: "48%",
};

const PriceListTemplate: React.FC<Props> = ({ pageId }) => {
  const [page, setPage] = useState<Page | null>(null);
  const [editing, setEditing] = useState<{ [category: string]: { [index: number]: boolean } }>({});
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    axios.get(`/api/pages/${pageId}`)
      .then(res => setPage(res.data))
      .catch(() => alert('Fehler beim Laden der Preisliste'));
  }, [pageId]);

  if (!page) return <div>Lade Preisliste...</div>;

  const toggleEdit = (category: string, index: number) => {
    if (previewMode) return;
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
    value: string | number
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

  return (
    <div style={containerStyle}>
      {/* Icons über Buttons mit FontAwesome */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 16 }}>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          title="Vorschau umschalten"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <FontAwesomeIcon icon={faEye} size="lg" />
        </button>
        <button
          onClick={saveChanges}
          title="Speichern"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
        </button>
      </div>

      <div style={columnStyle}>
        {["Pizzen", "Nudle"].map(category => (
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
                      <button onClick={() => toggleEdit(category, idx)}>Bearbeiten</button>
                    </>
                  )}
                </div>
              )
            })}
          </section>
        ))}
      </div>

      <div style={columnStyle}>
        {["Kaltgetränk", "Café"].map(category => (
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
                        onChange={e => handleChange(category, idx, "name", e.target.value)}
                        style={{ flex: 2, marginRight: 10 }}
                      />
                      <input
                        type="number"
                        value={item.preis}
                        onChange={e => handleChange(category, idx, "preis", Number(e.target.value))}
                        style={{ width: 80, marginRight: 10 }}
                      />
                      <button onClick={() => toggleEdit(category, idx)}>Fertig</button>
                    </>
                  ) : (
                    <>
                      <span>{item.name}</span>
                      <span>{item.preis.toFixed(2)} CHF</span>
                      <button onClick={() => toggleEdit(category, idx)}>Bearbeiten</button>
                    </>
                  )}
                </div>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  );
};

export default PriceListTemplate;
