import { describe } from 'ava-spec';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const URI = '/categories';

let dbObjects;

describe.serial('Category API', it => {
    it.beforeEach(() =>
        loadFixtures()
            .then(() => getAllElements('Category'))
            .then(response => {
                dbObjects = response;
            })
    );

    it('should reitrieve a list of all categories', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, dbObjects.length);
    });

    it('should return a single category', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.name, fixture.name);
    });

    it('should return ResourceNotFound when retrieving nonexisting category', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id + 10000}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type category');
    });

    it('should add a new category', async t => {
        const content = {
            title: 'added category',
            description: 'Great new category'
        };
        const response = await request(app)
            .post(URI)
            .send(content)
            .expect(201);
        t.is(response.body.name, content.name);
    });

    it('should be able to update a category', async () => {
        const category = dbObjects[0];
        await request(app)
            .put(`${URI}/${category.id}`)
            .send({ name: 'changed' })
            .expect(204);
    });

    it('should be able to delete a category', async () => {
        const category = dbObjects[0];
        await request(app)
            .delete(`${URI}/${category.id}`)
            .expect(204);
    });
});
