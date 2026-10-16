import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiry.controller';

export const enquiryRouter = Router();

enquiryRouter.get('/', EnquiryController.getAll);
enquiryRouter.post('/', EnquiryController.create);
enquiryRouter.patch('/:id/status', EnquiryController.updateStatus);
enquiryRouter.post('/:id/notes', EnquiryController.addNote);
enquiryRouter.patch('/:id/assign', EnquiryController.assign);
enquiryRouter.get('/export/csv', EnquiryController.exportCsv);
