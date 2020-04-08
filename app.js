import express from 'express';
import fetch from 'node-fetch';
import morgan from 'morgan';
import SongRoute from './routes/SongRoute';
import songs from './data/songs.json';
import _ from 'lodash';

const 
	PORT = 3000,
	server = express(),
	buildUrl = (ver, path) => `/api/${ver}/${path}`,
	SONGS_BASE_URL = buildUrl('v1', 'songs');

server.use(morgan('tiny'));

server.get('/', (req, res) => {
	console.log('my route');
	res.send('Home Page Stuff');
});

server.use(SONGS_BASE_URL, SongRoute);

server.get('/covid19countries', (req, res, next) => {
	// route handler
	fetch('https://api.covid19api.com/countries')
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	    res.json(data);
	  });
	next();
}, (red, res, next) => {
	console.log('2nd handler');
	next();
}, (red, res) => {
	console.log('3rd handler')
});

server.listen(PORT, () => {
	console.log(`Server Started on PORT: ${PORT}`);
});