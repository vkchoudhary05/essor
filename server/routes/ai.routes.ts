import { Router, Request, Response } from 'express';
import { askFoodSafetyAdvisor } from '../services/ai.service';

export const aiRouter = Router();

// POST /api/ai/query
aiRouter.post('/query', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const answer = await askFoodSafetyAdvisor(query.trim());
    return res.json({
      success: true,
      query: query.trim(),
      answer,
      timestamp: new Date().toISOString(),
      advisor: {
        name: 'Dr. Priya Sharma',
        title: 'Lead Food Safety Specialist & Auditor',
        avatar: '/src/assets/images/young_woman_advisor_1792303487989.jpg'
      }
    });
  } catch (err: any) {
    console.error('[AI Route] Error handling query:', err);
    return res.status(500).json({ 
      error: 'Failed to process AI query',
      message: err.message || 'Unknown error' 
    });
  }
});
