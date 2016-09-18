import PostController from '../controllers/post.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new PostController();
export default bindControllerToCRUDRoutes(controller);
