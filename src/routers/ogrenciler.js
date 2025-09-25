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

const ogrenciRouter = Router();

ogrenciRouter.get('/', controllerWrapper(getOgrencilerController));
ogrenciRouter.post('/', controllerWrapper(ogrenciEkleController));
ogrenciRouter.get('/:ogrenciId', controllerWrapper(getOgrenciController));
ogrenciRouter.delete('/:ogrenciId', controllerWrapper(ogrenciSilController));

ogrenciRouter.put(
  '/:ogrenciId',
  controllerWrapper(ogrenciPutGuncelleController),
);

ogrenciRouter.patch(
  '/:ogrenciId',
  controllerWrapper(ogrenciPatchGuncelleController),
);

export default ogrenciRouter;
