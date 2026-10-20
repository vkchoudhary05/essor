import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { dbManager } from '../db/mysql';

export type ChatRole = 'visitor' | 'advisor';

export interface SavedChatMessage {
  id: string;
  conversationId: string;
  visitorName?: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

const localDataDir = path.resolve(process.cwd(), '.data');
const localChatFile = path.join(localDataDir, 'ai_chat_messages.json');

function readLocalMessages(): SavedChatMessage[] {
  try {
    return JSON.parse(fs.readFileSync(localChatFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveLocalMessages(messages: SavedChatMessage[]) {
  fs.mkdirSync(localDataDir, { recursive: true });
  fs.writeFileSync(localChatFile, JSON.stringify(messages, null, 2), 'utf8');
}

export async function saveChatMessage(message: Omit<SavedChatMessage, 'id' | 'createdAt'>): Promise<SavedChatMessage> {
  const saved: SavedChatMessage = { id: randomUUID(), createdAt: new Date().toISOString(), ...message };

  if (dbManager.getConnected()) {
    await dbManager.query(
      'INSERT INTO ai_chat_messages (id, conversation_id, visitor_name, role, content, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [saved.id, saved.conversationId, saved.visitorName || null, saved.role, saved.content, saved.createdAt]
    );
    return saved;
  }

  const messages = readLocalMessages();
  messages.push(saved);
  saveLocalMessages(messages);
  return saved;
}

export async function getChatMessages(conversationId: string): Promise<SavedChatMessage[]> {
  if (dbManager.getConnected()) {
    const [rows] = await dbManager.query(
      'SELECT id, conversation_id AS conversationId, visitor_name AS visitorName, role, content, created_at AS createdAt FROM ai_chat_messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [conversationId]
    );
    return rows as SavedChatMessage[];
  }
  return readLocalMessages().filter((message) => message.conversationId === conversationId);
}
