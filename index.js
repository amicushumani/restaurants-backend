const express = require('express');
const dbClient = require('./dbClient');
const app = express();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded());

app.get('/', async (req, res) => {
  console.log('get was called')
  const { rows } = await dbClient.query('SELECT * FROM restaurants;');
  if(rows.length > 0 ){
    res.status(200).send(rows);
    return;
  }
  res.send(204, 'No restaurants found');
});

app.post('/', async (req, res) => {
  const { name, rating } = req.body;
  console.log('adding res', name, rating)
  try{
    await dbClient.query('INSERT INTO restaurants (name, rating) VALUES($1, $2);', [name, rating]);
  } catch(e){
    res.status(500).send('Somethig went wrong')
  }

  res.status(200).send()
});

// TODO: add editding form in frontend
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  try {
    dbClient.query(`UPDATE restaurants set name=$1, rating=#2 WHERE id=$3`, [name, rating, id]);
  } catch (e) {
    res.send(500).send('Failed to update restaurant');
  }
  res.staus(200);
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params

  try {
    await dbClient.query('DELETE FROM restaurants WHERE id=$1', [id]);
  } catch (e) {
    return res.status(500).send('unable to delte restauarant');
  }
  res.status(200).send('Restaurant deleted');
});

app.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  if(!name || !rating || !id){
    res.status(500).send('Failed to update restaurant');
  }

  dbClient.query(`UPDATE restaurants SET name=$1, rating=$2 WHERE id=$3`, [name, rating, id]);
  res.status(200).send(`Updated restaurant ${id}`);
})

if(!dbClient){
  console.error('There was not connection established with database')
  process.exit(1);
}

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port:${PORT}`);
});


