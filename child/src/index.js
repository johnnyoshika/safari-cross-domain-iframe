import 'dotenv/config';
import express from 'express';
const app = express();

app.post('/login-get', (req, res) => {
  res.redirect(`${process.env.PARENT_URL}/authorize-redirect-get`);
});

app.post('/login-post', (req, res) => {
  res.redirect(`${process.env.PARENT_URL}/authorize-redirect-post`);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
