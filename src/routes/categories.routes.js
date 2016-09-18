import CategoryController from '../controllers/category.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new CategoryController();
export default bindControllerToCRUDRoutes(controller);
