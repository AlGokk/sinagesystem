import React, { useEffect, useState } from "react";
import axios from "axios";
import PageManagementModal from "../PageManagementModals/PageManagementModal";

interface Page {
  _id: string;
  title: string;
  category: string;
}

const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Page[]>("/api/pages");
      setPages(res.data);
    } catch {
      alert("Fehler beim Laden der Seiten");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (page: Page) => {
    setSelectedPage(page);
    setModalOpen(true);
  };

  const createNewPage = () => {
    setSelectedPage({ _id: "", title: "", category: "" });
    setModalOpen(true);
  };

  const handleSave = async (title: string, category: string) => {
    if (saving) return;
    if (!selectedPage) return;

    setSaving(true);
    try {
      if (selectedPage._id && selectedPage._id.trim() !== "") {
        await axios.put(`/api/pages/${selectedPage._id}`, { title, category });
      } else {
        await axios.post("/api/pages", { title, category });
      }
      alert("Seite gespeichert");
      setModalOpen(false);
      setSelectedPage(null);
      fetchPages();
    } catch {
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  // Neue Funktion: Seite löschen
  const handleDelete = async (id: string) => {
    if (!window.confirm("Seite wirklich löschen?")) return;
    try {
      await axios.delete(`/api/pages/${id}`);
      alert("Seite gelöscht");
      fetchPages();
    } catch {
      alert("Fehler beim Löschen");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
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
              <b>{page.title}</b> - <i>{page.category}</i>{" "}
              <button onClick={() => handleSelectPage(page)}>Bearbeiten</button>{" "}
              <button onClick={() => handleDelete(page._id)} style={{color: "red"}}>
                Löschen
              </button>
            </li>
          ))}
        </ul>
      )}

      <PageManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        pageId={selectedPage?._id || ""}
        initialTitle={selectedPage?.title}
        initialCategory={selectedPage?.category}
        saving={saving}
      />
    </div>
  );
};

export default PagesManager;
