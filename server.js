const express = require('express');
const path = require('path');
const app = express();

// ✅ Dossier correct pour Angular 17+
const angularAppPath = path.join(__dirname, 'dist/sakai-ng/browser');
app.use(express.static(angularAppPath));

// Route de fallback (pour SPA Angular)
app.use((req, res) => {
    res.sendFile(path.join(angularAppPath, 'index.html'));
});

// Démarrage du serveur
const PORT = 4200;
app.listen(PORT, () => {
    console.log(`✅ Application Angular lancée sur http://localhost:${PORT}`);
});
