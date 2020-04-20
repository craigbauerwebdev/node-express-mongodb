import express, { response } from 'express';
import songs from '../data/songs.json';
import _ from 'lodash';
import mongoose, { SchemaTypes } from 'mongoose';

// Mongo and Mongoose
const 
	DB_USER = `craigbauerwebdev`,
	DB_USER_PASSWORD = `Lagavulin77!`,
	DB_URL = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@songcluster-jz2ss.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
	console.log('Connected to mLab');
});

const SongSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	song: String,
	band: String,
	decade: String,
}),
SongModel = mongoose.model('song', SongSchema);

const router = express.Router();

let songsArray = songs;

router.get('/', (req, res) => {
	//res.json(songs);
	SongModel.find((err, songs) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.json(songs);
		}
	});
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

router.get('/:id', (req, res) => {
	SongModel.findById(req.params.id, (err, song) => {
		if(err) {
			res.status(500).send(err);
		}
		if(song) {
			res.json(song);
		} else {
			response.status(404).send(`User with id ${req.params.id} mot found`);
		}
	});
});

/* Validation for id param */
/* router.param('id', (req, res, next, id) => {
	if(isNaN(id)) {
		next(`${id} is not a number`);
	}
	next();
}); */

router.post('/', (req, res) => {
	//console.log('handeling post request...');
	//console.log(req.body);
	//songsArray.push(req.body);
	//res.status(200).send('ok');
	//res.end();
	const 
		id = new mongoose.Types.ObjectId(),
		songToPersist = Object.assign({
			_id: id
		}, req.body);
		const song = new SongModel(songToPersist);
		song.save()
			.then((err, song) => {
				if(err) {
					res.status(500).send(err);
				} else {
					res.json(song);
				}
			});
		//res.json()
		//console.log(JSON.stringify(songToPersist));
});

router.put('/:id', (req, res) => {
	console.log('handeling put request...');
	//res.end();
	SongModel.findById(req.params.id, (err, song) => {
		if(err) {
			res.status(500).send(err);
		}
		if(song) {
			song.song = req.body.song; //sent from put request
			song.band = req.body.band; //sent from put request
			song.save().then((err, song) => {
				if(err) {
					res.status(500).send(err);
				} else {
					res.json(song);
				}
			});
		} else {
			response.status(404).send(`User with id ${req.params.id} mot found`);
		}
		
	});
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