import express from 'express';
import songs from '../data/songs.json';
import _ from 'lodash';
import mongoose from 'mongoose';

const 
	DB_USER = `craigbauerwebdev`,
	DB_USER_PASSWORD = `Lagavulin77!`,
	DB_URL = `mongodb+srv://craigbauerwebdev:${DB_USER_PASSWORD}@songcluster-jz2ss.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
	console.log('Connected to mLab');
});

const router = express.Router();

let songsArray = songs;

router.get('/', (req, res) => {
	res.json(songs);
	res.end();
});

router.get('/:id/:song/:band', (req, res) => {
	console.log(req.params.id);
	console.log(req.params.song);
	console.log(req.params.band);
	const song = _.find(songs, song => song.song === req.params.song);
	if(song) {
		res.send(song);
	} else {
		res.send(`song named ${req.params.song} not found`);
	}
	res.end();
});

router.param('id', (req, res, next, id) => {
	if(isNaN(id)) {
		next(`${id} is not a number`);
	}
	next();
});

router.post('/', (req, res) => {
	console.log('handeling post request...');
	console.log(req.body);
	songsArray.push(req.body);
	res.status(200).send('ok');
	//res.end();
});

router.put('/', (req, res) => {
	console.log('handeling put request...');
	res.end();
});

router.post('/', (req, res) => { //modifies existing data
	console.log('handeling post request...');
	res.end();
});

router.delete('/', (req, res) => {
	console.log('handeling delete request...');
	res.end();
});

module.exports = router;