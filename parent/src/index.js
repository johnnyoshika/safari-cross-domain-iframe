import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());

const cookieValue = req =>
  `<p>Cookie value:
    <strong>${
      req.cookies['foo']
        ? `<span style="color: green;">${req.cookies['foo']}</span>`
        : '<span style="color: red;">undefined</span>'
    }
    </strong>
  </p>`;

app.get('/', (req, res) => {
  res.send(
    `<html>
      <body>
        ${cookieValue(req)}
        <ul>
          <li><a href="/set-cookie">Set Cookie</a></li>
          <li><a href="/delete-cookie">Delete Cookie</a></li>
          <li><a href="/cross-domain-get">Cross domain GET</a></li>
          <li><a href="/cross-domain-post">Cross domain POST</a></li>
        </ul>
      </body>
    </html>`,
  );
});

app.get('/set-cookie', (req, res) => {
  res.cookie('foo', 'bar', {
    maxAge: 86400 * 1000, // 24 hours
    httpOnly: true,
    secure: true,
  });

  res.redirect('/');
});

app.get('/delete-cookie', (req, res) => {
  res.cookie('foo', 'bar', {
    maxAge: 0,
  });

  res.redirect('/');
});

const loginRedirect = url => `
  <html>
    <body>
      <p><a href="/">Go home</a></p>
      <iframe src="about:blank" id="tool_content" name="tool_content" title="tool_content" style="width:460px;height:200px;border:1px solid #ccc;"></iframe>
      <form action="${url}" method="POST" id="tool_form" target="tool_content">
        <input type="hidden" name="iss" id="iss" value="https://canvas.instructure.com" />
        <input type="hidden" name="client_id" id="client_id" value="10000000000005" />
      </form>
      <script>
        document.querySelector("#tool_form").submit();
      </script>
    </body>
  </html>`;

app.get('/cross-domain-get', (req, res) => {
  res.send(loginRedirect(`${process.env.CHILD_URL}/login-get`));
});

app.get('/cross-domain-post', (req, res) => {
  res.send(loginRedirect(`${process.env.CHILD_URL}/login-post`));
});

app.get('/authorize-redirect-get', (req, res) => {
  res.redirect('/authorize');
});

app.get('/authorize-redirect-post', (req, res) => {
  res.send(`
    <form id="form" style="display: none;" action="/authorize" method="POST">
    <input type="hidden" name="repost" value="true" /></form>
    <script>
      document.querySelector('#form').submit()
    </script>
  `);
});

app.all('/authorize', (req, res) => {
  res.send(
    `<html>
      <body>
        <p>I'm at
        <span style="color:blue;">
          ${req.protocol + '://' + req.get('host') + req.originalUrl}
        </span>
        inside an iframe</p>
        ${cookieValue(req)}
      </body>
    </html>`,
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
