import { Router } from 'express';
import {
  getOgrenciController,
  getOgrencilerController,
} from '../controllers/ogrenciler.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const ogrenciRouter = Router();

ogrenciRouter.get('/', controllerWrapper(getOgrencilerController));
ogrenciRouter.get('/:ogrenciId', controllerWrapper(getOgrenciController));

export default ogrenciRouter;
