import { describe } from 'ava-spec';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';


const URI = '/shows';

let dbObjects;

describe.serial('Show API', it => {
    it.beforeEach(() =>
        loadFixtures()
            .then(() => getAllElements('Show'))
            .then(response => {
                dbObjects = response;
            })
    );

    it('should reitrieve a list of all shows', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, dbObjects.length);
    });

    it('should return a single show', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.name, fixture.name);
    });

    it('should return ResourceNotFound when retrieving nonexisting show', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id + 10000}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type show');
    });

    it('should add a new show', async t => {
        const content = {
            title: 'added show',
            lead: 'the new show',
            rssFeed: 'http://www.p4.no/lyttesenter/podcast.ashx?pid=330',
            logoImage: 'http://imgur.com'
        };
        const response = await request(app)
            .post(URI)
            .send(content)
            .expect(201);
        t.is(response.body.name, content.name);
    });

    it('should be able to update a show', async () => {
        const show = dbObjects[0];
        await request(app)
            .put(`${URI}/${show.id}`)
            .send({ name: 'changed' })
            .expect(204);
    });

    it('should be able to delete a show', async () => {
        const show = dbObjects[2];
        await request(app)
            .delete(`${URI}/${show.id}`)
            .expect(204);
    });
});
