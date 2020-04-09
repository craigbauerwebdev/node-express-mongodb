import express from 'express';
import fetch from 'node-fetch';
import morgan from 'morgan';
import SongRoute from './routes/SongRoute';
import songs from './data/songs.json';
import _ from 'lodash';
import bodyParser from 'body-parser';
import path from 'path';

const 
	PORT = 3000,
	server = express(),
	buildUrl = (ver, path) => `/api/${ver}/${path}`,
	SONGS_BASE_URL = buildUrl('v1', 'songs');

server.use(morgan('tiny')); //middleware
server.use(bodyParser.json());  //middleware
//server.use(express.static('public'));
// http://localhost:3000/public/images/craig.jpg
server.use('/replace-public', express.static('public'));
// http://localhost:3000/replace-public/images/craig.jpg
server.set('views', path.join('views'));
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
	console.log('my route');
	res.render('index', {
		songs
	});
	//res.send('Home Page Stuff');
});

server.use(SONGS_BASE_URL, SongRoute);

//server.get()

server.get('/download/images/:imageName', (req, res) => {
	res.download(path.join('public', 'images', req.params.imageName));
});

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