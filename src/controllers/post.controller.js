import CRUD from './CRUD';
import db from '../models';

class PostController extends CRUD {
    constructor() {
        super(db.Post, 'post');
    }
}

export default PostController;
