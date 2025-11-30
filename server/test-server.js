import express from 'express';

const app = express();
console.log('Express app created');

app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Server is working!' });
  console.log('GET /test received');
});

const PORT = 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
