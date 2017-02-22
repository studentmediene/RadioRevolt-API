import { describe } from 'ava-spec';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const URI = '/episodes';

let dbObjects;

let testFixture;

describe.serial('Episode API', it => {
    it.beforeEach(() =>
        loadFixtures()
            .then(() => getAllElements('Episode'))
            .then(response => {
                dbObjects = response;
            })
    );

    it.beforeEach(() => {
        testFixture = {
            title: 'Kek wild episode 2',
            lead: 'What a wild episode',
            podcastUrl: 'http://www.p4.no/lyttesenter/podcast.ashx?pid=330',
            soundUrl: 'http://nrk.no/radio',
            showId: 1
        };
    });

    it('should reitrieve a list of all episodes', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, dbObjects.length);
    });

    it('should return a single Episode', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.name, fixture.name);
    });

    it('should return ResourceNotFound when retrieving nonexisting Episode', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id + 10000}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type episode');
    });

    it('should be able to add a new Episode', async t => {
        const response = await request(app)
            .post(URI)
            .send(testFixture)
            .expect(201);
        t.is(response.body.name, testFixture.name);
    });

    it('should add Slug to a newly created Episode', async t => {
        testFixture.title = 'Kek episode number 11';
        const response = await request(app)
            .post(URI)
            .send(testFixture)
            .expect(201);
        t.is(response.body.name, testFixture.name);
    });


    it('should be able to update a Episode', async () => {
        const episode = dbObjects[0];
        await request(app)
            .put(`${URI}/${episode.id}`)
            .send({ name: 'changed' })
            .expect(204);
    });

    it('should be able to delete a Episode', async () => {
        const Episode = dbObjects[0];
        await request(app)
            .delete(`${URI}/${Episode.id}`)
            .expect(204);
    });
});
