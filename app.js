import express from 'express';
import SongRoute from './routes/SongRoute';
import songs from './data/songs.json';
import _ from 'lodash';

const 
	PORT = 3000,
	server = express(),
	buildUrl = (ver, path) => `/api/${ver}/${path}`,
	SONGS_BASE_URL = buildUrl('v1', 'songs');

server.get('/', (req, res) => {
	console.log('my route');
	res.send('Home Page Stuff');
});

server.use(SONGS_BASE_URL, SongRoute);
	
	/*fetch('https://api.covid19api.com/countries')
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	    res.json(data);
	  });
		//res.json(songs);
	});*/
/*server.get(SONGS_BASE_URL, (req, res) => {
	//console.log(json(songs));
	res.json(songs);
	res.end();
});

server.get(`${SONGS_BASE_URL}/:song/:band`, (req, res) => {
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

server.post(SONGS_BASE_URL, (req, res) => {
	console.log('handeling post request...');
	res.end();
});

server.put(SONGS_BASE_URL, (req, res) => {
	console.log('handeling put request...');
	res.end();
});

server.post(SONGS_BASE_URL, (req, res) => { //modifies existing data
	console.log('handeling post request...');
	res.end();
});

server.delete(SONGS_BASE_URL, (req, res) => {
	console.log('handeling delete request...');
	res.end();
});*/

server.get('/route-handlers', (req, res, next) => {
	// rout handler
	res.send('Rout Hanlers');
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

/*const writename = () => {
	return 'craig bauer && !!!!!!!';
}
console.log(writename());
console.log('qwerty');*/

