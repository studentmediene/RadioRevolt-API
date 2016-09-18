import express from 'express';
import raven from 'raven';
import categories from './categories.routes';
import episodes from './episodes.routes';
import posts from './posts.routes';
import shows from './shows.routes';
import { pageNotFoundMiddleware, sentryClient, errorMiddleware } from '../components/errors';

const router = express.Router();

router.use('/categories', categories);
router.use('/episodes', episodes);
router.use('/posts', posts);
router.use('/shows', shows);


router.use(pageNotFoundMiddleware);
router.use(raven.middleware.express.errorHandler(sentryClient));
router.use(errorMiddleware);

export default router;
