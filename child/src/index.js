import 'dotenv/config';
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send(
    'Hello from child',
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
