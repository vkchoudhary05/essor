import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { TrainingService } from '../services/training.service';
import { getActor } from '../middlewares/auth.middleware';

export class TrainingController {
  static getAllSessions(_req: AuthenticatedRequest, res: Response): void {
    const list = TrainingService.getAllSessions();
    res.json(list);
  }

  static upsertSession(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = TrainingService.upsertSession(req.body, actor);
    res.json(updated);
  }

  static enrollParticipant(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { participantName, participantEmail } = req.body;
    try {
      const updated = TrainingService.enrollParticipant(id, participantName, participantEmail, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Session not found' });
    }
  }

  static recordAttendance(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { sessionId, enrollmentId } = req.params;
    const { status } = req.body;
    try {
      const updated = TrainingService.recordAttendance(sessionId, enrollmentId, status, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enrollment not found' });
    }
  }

  static recordAssessment(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { sessionId, enrollmentId } = req.params;
    const { score, remarks } = req.body;
    try {
      const updated = TrainingService.recordAssessment(sessionId, enrollmentId, Number(score), remarks, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enrollment not found' });
    }
  }

  static approveAndIssue(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { sessionId, enrollmentId } = req.params;
    try {
      const result = TrainingService.approveAndIssue(sessionId, enrollmentId, actor);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enrollment not found' });
    }
  }
}
