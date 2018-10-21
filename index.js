const express = require('express');
const helmet = require('helmet');
const dbConfig = require('./knexfile');
const db = require('knex')(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('API Running!! ...');
});

server.post('/api/zoos', async (req, res) => {
  const { name } = req.body;
  try {
    const zoo = await db.insert(name).into('zoos');
    res.status(201).send(zoo);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post('/api/bears', async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const bear = await db.insert(name).into('bears');
    res.status(201).json(bear);
  } catch (err) {
    console.log('fire');
    res.status(500).json(err);
  }
});

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos').select('name');
    res.status(200).json(zoos);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/bears', async (req, res) => {
  try {
    const bears = await db('bears').select('name');
    res.status(200).json(bears);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const zoos = await db('zoos')
      .select('name')
      .where({ ID: id });
    res.status(200).json(zoos);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/api/bears/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bears = await db('bears')
      .select('name')
      .where({ ID: id });
    res.status(200).json(bears);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const zoos = await db('zoos')
      .select('name')
      .where({ ID: id })
      .del();
    res.status(200).json(zoos);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete('/api/bears/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bears = await db('bears')
      .select('name')
      .where({ ID: id })
      .del();
    res.status(200).json(bears);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put('/api/zoos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const zoos = await db('zoos')
      .where({ ID: id })
      .update({ name: name });
    res.status(200).json(zoos);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put('/api/bears/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const bears = await db('bears')
      .where({ ID: id })
      .update({ name: name });
    res.status(200).json(bears);
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
