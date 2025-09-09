import { Router, Request, Response } from 'express';

const router = Router();

// Definiere die Hello World Route
router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default router;


