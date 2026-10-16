import { Router } from 'express';
import { TrainingController } from '../controllers/training.controller';

export const trainingRouter = Router();

trainingRouter.get('/sessions', TrainingController.getAllSessions);
trainingRouter.post('/sessions', TrainingController.upsertSession);
trainingRouter.post('/sessions/:id/enroll', TrainingController.enrollParticipant);
trainingRouter.patch('/sessions/:sessionId/enrollments/:enrollmentId/attendance', TrainingController.recordAttendance);
trainingRouter.patch('/sessions/:sessionId/enrollments/:enrollmentId/assessment', TrainingController.recordAssessment);
trainingRouter.post('/sessions/:sessionId/enrollments/:enrollmentId/approve-issue', TrainingController.approveAndIssue);
