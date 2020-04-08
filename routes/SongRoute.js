import express from 'express';
import songs from '../data/songs.json';
import _ from 'lodash';
const router = express.Router();

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
		next('That is not a number');
	}
	next();
});

router.post('/', (req, res) => {
	console.log('handeling post request...');
	res.end();
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