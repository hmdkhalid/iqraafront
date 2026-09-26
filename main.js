const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    // ✅ Construction du chemin absolu vers le fichier Angular compilé
    const indexPath = path.join(__dirname, 'dist', 'iqraa2027', 'browser', 'index.html');
    console.log('🔍 Tentative de chargement du fichier :', indexPath);

    // ✅ Vérifie si le fichier Angular existe
    if (!fs.existsSync(indexPath)) {
        console.error('❌ Fichier index.html introuvable :', indexPath);
        console.error('💡 Vérifie que ton build Angular a bien été généré avec :');
        console.error('   👉 ng build --base-href ./');
        return;
    }

    // ✅ Création de la fenêtre principale Electron
    const win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 1000,
        minHeight: 700,
        title: 'Sakai App',
        icon: path.join(__dirname, 'src', 'favicon.ico'), // ou 'public/icon.png' selon ton dossier
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // ✅ Charge la page Angular
    win.loadFile(indexPath);

    // 🔧 Optionnel : ouvrir les DevTools (console)
    win.webContents.openDevTools();

    win.on('closed', () => {
        console.log('🪟 Fenêtre fermée');
    });
}

// ✅ Quand Electron est prêt, on lance la fenêtre
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// ✅ Quitte complètement l'app quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
