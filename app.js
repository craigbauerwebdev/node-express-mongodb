import express from 'express';
import songs from './data/songs.json';

const PORT = 3000,
server = express();

server.get('/', (req, res) => {
	console.log('my route');
	res.send('Home Pgae Stuff');
});


server.get('/api/v1/songs/', (req, res) => {
	
	/*fetch('https://api.covid19api.com/countries')
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	    res.json(data);
	  });
		//res.json(songs);
	});*/


	res.json(songs);
});


server.listen(PORT, () => {
	console.log(`Server Started on PORT: ${PORT}`);
});

/*const writename = () => {
	return 'craig bauer && !!!!!!!';
}
console.log(writename());
console.log('qwerty');*/

