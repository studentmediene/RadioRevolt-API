import CRUD from './CRUD';
import db from '../models';

class ShowController extends CRUD {
    constructor() {
        super(db.Show, 'show');
    }
}

export default ShowController;
