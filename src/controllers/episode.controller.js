import CRUD from './CRUD';
import db from '../models';

class EpisodeController extends CRUD {
    constructor() {
        super(db.Episode, 'episode');
    }
}

export default EpisodeController;
