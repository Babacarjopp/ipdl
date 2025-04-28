const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const PORT = 3000;

// Utilitaire pour servir des fichiers HTML
function serveHTML(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Erreur serveur</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

// Serveur HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    serveHTML(res, path.join(__dirname, 'views', 'index.html'));
  }

  else if (req.method === 'GET' && req.url === '/contact') {
    serveHTML(res, path.join(__dirname, 'views', 'contact.html'));
  }

  else if (req.method === 'POST' && req.url === '/contact') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsed = parse(body);
      const message = {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
        date: new Date()
      };

      // Lire l'existant ou créer un tableau vide
      fs.readFile('messages.json', (err, data) => {
        let messages = [];
        if (!err && data.length > 0) {
          messages = JSON.parse(data);
        }

        messages.push(message);

        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Erreur lors de l’enregistrement</h1>');
          } else {
            res.writeHead(302, { Location: '/contact' });
            res.end();
          }
        });
      });
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page non trouvée</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
