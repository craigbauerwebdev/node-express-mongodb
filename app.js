import express from 'express';
import fetch from 'node-fetch';
import morgan from 'morgan';
import SongRoute from './routes/SongRoute';
import songs from './data/songs.json';
import _ from 'lodash';
import bodyParser from 'body-parser';
import path from 'path';
import https from 'https';
import fs from 'fs';

const 
	tlsOptions = {
		key: fs.readFileSync(path.join('key.pem')),
		cert: fs.readFileSync(path.join('cert.pem')),
		passphrase: 'Lagavulin77!'
	},
	PORT = 3000,
	TLS_PORT = 3003,
	server = express(),
	buildUrl = (ver, path) => `/api/${ver}/${path}`,
	SONGS_BASE_URL = buildUrl('v1', 'songs');

server.use(morgan('tiny')); //middleware to log requests
server.use(bodyParser.json());  //middleware to parse body
//server.use(express.static('public')); // defaults to public folder
// http://localhost:3000/public/images/craig.jpg
server.use('/replace-public', express.static('public'));
// http://localhost:3000/replace-public/images/craig.jpg
server.set('views', path.join('views'));
server.set('view engine', 'ejs');

// render templates
server.get('/', (req, res) => {
	//console.log('my route');
	res.render('index', {
		songs
	});
	//res.send('Home Page Stuff');
});

// use route with multiple methods
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

https.createServer(tlsOptions, server).listen(TLS_PORT, () => {
	console.log(`HTTPS Server Started on PORT: ${TLS_PORT}`);
});