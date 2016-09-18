import CRUD from './CRUD';
import db from '../models';

class CategoryController extends CRUD {
    constructor() {
        super(db.Category, 'category');
    }
}

export default CategoryController;
