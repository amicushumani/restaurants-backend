import express from 'express';
import { dbClient } from './dbClient'
import { verifyNewResto, verifyEditResto } from './middleware'

const app = express();

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded());

// GET //
app.get('/', getHandler);

// POST //
app.post('/', verifyNewResto, postHandler);
app.post('/edit/:id', verifyEditResto, editHandler);

// DELETE //
app.post('/delete/:id', deleteHandler);


async function getHandler (req, res) {
  console.log('hit get handler')
  const { rows } = await dbClient.query('SELECT * FROM restaurants;', []);
  if(rows.length > 0 ){
    res.status(200).send(rows);
    return;
  } else { 
    return res.status(200).send([ { id: 0, name: 'No Restaurants Found', rating: 0}]);
  }  
}

async function postHandler (req, res){
  console.log('hit post handler')
  const { name, rating, description } = req.body;
  try{
    await dbClient.query('INSERT INTO restaurants (name, rating, description) VALUES($1, $2, $3);', [name, rating, description]);
  } catch(e){
    console.log('creating resto went wrong', e)
    res.status(500).send('Somethig went wrong')
  }

  res.status(200).send()
}

async function editHandler(req, res) {
  const { id } = req.params;
  const { name, rating } = req.body;
  try {
    dbClient.query(`UPDATE restaurants set name=$1, rating=$2 WHERE id=$3`, [name, rating, id]);
  } catch (e) {
    res.send(500).send('Failed to update restaurant');
  }
    
  res.staus(200).send();
}

async function deleteHandler(req, res) {
  const { id } = req.params
  try {
    await dbClient.query('DELETE FROM restaurants WHERE id=$1', [id]);
  } catch (e) {
    return res.status(500).send('unable to delte restauarant');
  }
  res.status(200).send('Restaurant deleted');
}

if(!dbClient){
  console.error('There was not connection established with database')
  process.exit(1);
}

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port:${PORT}`);
});
