import CRUD from './CRUD';
import db from '../models';
import * as errors from '../components/errors';

const resourceName = 'post';

class PostController extends CRUD {
    constructor() {
        super(db.Post, resourceName);
    }

    /**
     * retrieveCategories - Retrieves categories for post of given ID
     *
     * @function retrieveCategories
     * @memberof module:controllers/post
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    retrieveCategories(req, res, next) {
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (!post) throw new errors.ResourceNotFoundError(resourceName);
            post.getCategories().then(categories => res.json(categories));
        })
        .catch(next);
    }

    /**
     * addCategories - Add categories with given IDs to post of given ID
     *
     * @function addCategories
     * @memberof module:controllers/post
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    addCategory(req, res, next) {
        db.Category.count({ where: { id: req.params.categoryId } })
        .then(count => {
            if (count === 0) {
                throw new errors.ResourceNotFoundError('category');
            }
        })
        .then(() => db.Post.findOne({ where: { id: req.params.id } }))
        .then(post => {
            post.addCategories([parseInt(req.params.categoryId, 10)]);
        })
        .then(() => res.sendStatus(204))
        .catch(next);
    }

    /**
     * removeCategory - Removes category of given ID frmo post of given ID
     *
     * @function removeCategory
     * @memberof module:controllers/post
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    removeCategory(req, res, next) {
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (!post) throw new errors.ResourceNotFoundError(this.resourceName);
            post.removeCategories([parseInt(req.params.categoryId, 10)]);
            res.sendStatus(204);
        })
        .catch(next);
    }
}

export default PostController;
