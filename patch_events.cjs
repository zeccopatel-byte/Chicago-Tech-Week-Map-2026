const fs = require('fs');

const file = fs.readFileSync('companies.txt', 'utf-8');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /const COMPANIES = \[[\s\S]*?\];/m;
app = app.replace(regex, file.trim());

fs.writeFileSync('src/App.tsx', app);
console.log("Patched");
