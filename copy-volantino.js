import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crea la directory di destinazione se non esiste
const destDir = './dist/src/stores';
mkdirSync(destDir, { recursive: true });

// Copia i file volantino
try {
  // Copia volantino.html (versione pubblica - solo visualizzazione)
  copyFileSync('./src/stores/volantino.html', './dist/src/stores/volantino.html');
  console.log('✅ volantino.html copiato con successo in dist/src/stores/');
  
  // Copia volantino-editor.html (versione admin - con editor)
  copyFileSync('./src/stores/volantino-editor.html', './dist/src/stores/volantino-editor.html');
  console.log('✅ volantino-editor.html copiato con successo in dist/src/stores/');
} catch (error) {
  console.error('❌ Errore durante la copia dei file volantino:', error);
  process.exit(1);
}
