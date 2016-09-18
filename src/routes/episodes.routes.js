import EpisodeController from '../controllers/episode.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new EpisodeController();
export default bindControllerToCRUDRoutes(controller);
