import { Router, Request, Response } from 'express';
import { Page } from '../models/Page';

const router = Router();

// Alle Seiten abrufen
router.get('/', async (req: Request, res: Response) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Einzelne Seite per ID abrufen
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ error: 'Seite nicht gefunden' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Neue Seite erstellen
router.post('/', async (req: Request, res: Response) => {
  const { title, category, content } = req.body;
  if (!title || !category) {
    return res.status(400).json({ error: 'Titel und Kategorie erforderlich' });
  }
  try {
    const page = new Page({ title, category, content });
    const savedPage = await page.save();
    res.status(201).json(savedPage);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Erstellen der Seite' });
  }
});


// Seite aktualisieren (z.B. Titel, Kategorie, Inhalt)
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, category, content } = req.body;

  console.log('Update Request Body:', req.body);

  try {
    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { title, category, content },
      { new: true }
    );
    if (!updatedPage) {
      return res.status(404).json({ error: 'Seite nicht gefunden' });
    }
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Seite' });
  }
});

// Seite löschen
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPage = await Page.findByIdAndDelete(id);
    if (!deletedPage) {
      return res.status(404).json({ error: 'Seite nicht gefunden' });
    }
    res.json({ message: 'Seite gelöscht' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen der Seite' });
  }
});



export default router;
