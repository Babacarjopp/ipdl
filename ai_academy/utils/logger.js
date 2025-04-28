const fs = require('fs');
const path = require('path');

// Chemin vers le fichier log
const logFilePath = path.join(__dirname, '..', 'logs', 'server.log');

// S'assurer que le dossier "logs" existe
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath));
}

const logRequest = (req) => {
  const now = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.socket.remoteAddress;

  const log = `[${now}] ${method} ${url} - IP: ${ip}\n`;

  // Écrire dans le fichier (append mode)
  fs.appendFile(logFilePath, log, err => {
    if (err) console.error('Erreur lors de l\'écriture dans le journal :', err);
  });
};

module.exports = { logRequest };
