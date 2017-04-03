import PostController from '../controllers/post.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new PostController();
const router =  bindControllerToCRUDRoutes(controller);
router.get('/:id/categories', controller.retrieveCategories);
router.put('/:id/categories/:categoryId', controller.addCategory);

export default router;
