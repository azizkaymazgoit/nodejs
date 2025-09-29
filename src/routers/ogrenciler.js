import { Router } from 'express';
import {
  getOgrenciController,
  getOgrencilerController,
  ogrenciEkleController,
  ogrenciPatchGuncelleController,
  ogrenciPutGuncelleController,
  ogrenciSilController,
} from '../controllers/ogrenciler.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validatorBody.js';
import {
  ogenciEkleSchema,
  ogrenciGuncelleSchema,
} from '../validators/ogrenciler.js';
import { isValidId } from '../middlewares/isValidId.js';

const ogrenciRouter = Router();

ogrenciRouter.get('/', controllerWrapper(getOgrencilerController));
ogrenciRouter.post(
  '/',
  validateBody(ogenciEkleSchema),
  controllerWrapper(ogrenciEkleController),
);
ogrenciRouter.get(
  '/:ogrenciId',
  isValidId,
  controllerWrapper(getOgrenciController),
);
ogrenciRouter.delete(
  '/:ogrenciId',
  isValidId,
  controllerWrapper(ogrenciSilController),
);

ogrenciRouter.put(
  '/:ogrenciId',
  controllerWrapper(ogrenciPutGuncelleController),
);

ogrenciRouter.patch(
  '/:ogrenciId',
  isValidId,
  validateBody(ogrenciGuncelleSchema),
  controllerWrapper(ogrenciPatchGuncelleController),
);

export default ogrenciRouter;
