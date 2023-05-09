# Vue 3 + Vite

**Sequenza di creazione template in video "54-05MAG23-vue3-vite-axios-template.mp4"**

**Operazioni da eseguire se non si usa il template:**

- Creazione REPO
- Clonazione REPO in vsc
- Aprire terminale in vsc (nella repo)
- npm create vite@latest . -- --template vue (installa vue)
- npm install (installa node modules con dipendenze)
- npm i sass --save-dev (alternativa a: npm add -D sass) (installa sass)
- cancellare o commentare import "style.css" in main.js
- cancellare il file style.css
- creare la cartella style con i files .scss all'interno
- npm i axios (installa axios)
- npm i bootstrap (installa la versione alpha di bootstrap)
- nel nostro caso abbiamo installato la versione 5.3.0 alpha3 con...  npm install bootstrap@5.3.0-alpha3
- in main.js importare bootstrap con.... import "path fino a node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
- in main.scss importare boorstrap scss con.... @import "path fino a node_modules/bootstrap/scss/bootstrap.scss"