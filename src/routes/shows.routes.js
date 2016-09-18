import ShowController from '../controllers/show.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new ShowController();
export default bindControllerToCRUDRoutes(controller);
