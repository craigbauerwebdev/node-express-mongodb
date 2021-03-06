import dotenv from 'dotenv'
dotenv.config();
import express, { response } from 'express';
import songs from '../data/songs.json';
import _ from 'lodash';
import mongoose, { SchemaTypes } from 'mongoose';

// Mongo and Mongoose
const 
	DB_USER = process.env.MONGOUSER,
	DB_USER_PASSWORD = process.env.MONGOPASS,
	DB_URL = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@songcluster-jz2ss.mongodb.net/test?retryWrites=true&w=majority`;
	       //`mongodb + srv://${DB_USER}:${DB_USER_PASSWORD}@songcluster-jz2ss.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	//.then(() => console.log(''))
	//.catch(() => console.log('error from connect'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connected to mongoDB');
});
/* db.once('open', () => {
	console.log('Connected to mLab');
}); */

const SongSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	song: String,
	band: String,
	decade: String,
}),
SongModel = mongoose.model('songs', SongSchema, 'songs');

const router = express.Router();

let songsArray = songs;

router.get('/', (req, res) => {
	console.log('getting songs from momgoDB');
	//res.json(songs);
	SongModel.find((err, songs) => {
		if(err) {
			//res.json(songs);
			res.status(500).send
			console.log('error51');
			//res.json(songs);
			//console.log(err);	
		} else {
			console.log('success');
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

/* router.post('/', (req, res) => { //modifies existing data
	console.log('handeling post request...');
	res.end();
}); */

router.delete('/:id', (req, res) => {
	//console.log('handeling delete request...');
	//res.end();
	SongModel.findByIdAndRemove(req.params.id, (err, song) => {
		if(err) res.status(500).send(err);
		res.status(200).send(`${req.params.id} was deleted`);
	});
});

module.exports = router;