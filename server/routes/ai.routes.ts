import { Router, Request, Response } from 'express';
import { askFoodSafetyAdvisor } from '../services/ai.service';
import { getChatMessages, saveChatMessage } from '../services/chat.service';
import { randomUUID } from 'crypto';

export const aiRouter = Router();

// POST /api/ai/query
aiRouter.post('/query', async (req: Request, res: Response) => {
  try {
    const { query, conversationId: requestedConversationId, visitorName, intent } = req.body;
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const conversationId = typeof requestedConversationId === 'string' && requestedConversationId.trim()
      ? requestedConversationId.trim()
      : randomUUID();
    const cleanedName = typeof visitorName === 'string' ? visitorName.trim().slice(0, 80) : undefined;
    const cleanedQuery = query.trim().slice(0, 2000);

    await saveChatMessage({ conversationId, visitorName: cleanedName, role: 'visitor', content: cleanedQuery });

    const answer = intent === 'name'
      ? `Thanks, ${cleanedName || cleanedQuery}. What would you like help with today—FSSAI licensing, an audit standard, training, or plant hygiene?`
      : await askFoodSafetyAdvisor(cleanedQuery, cleanedName);
    await saveChatMessage({ conversationId, visitorName: cleanedName, role: 'advisor', content: answer });

    return res.json({
      success: true,
      conversationId,
      query: cleanedQuery,
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

// Retrieve a single visitor's saved conversation for this browser session.
aiRouter.get('/conversations/:conversationId', async (req: Request, res: Response) => {
  try {
    const messages = await getChatMessages(req.params.conversationId);
    return res.json({ success: true, messages });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve conversation', message: err.message || 'Unknown error' });
  }
});
