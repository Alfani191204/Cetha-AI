const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace hex codes (case-insensitive)
    content = content.replace(/#FBF0EE/gi, 'var(--bg)');
    content = content.replace(/#FFFFFF/gi, 'var(--card)');
    content = content.replace(/#1F0A0A/gi, 'var(--text)');
    content = content.replace(/#8A7070/gi, 'var(--muted)');
    content = content.replace(/#F5D5C8/gi, 'var(--border)');
    
    fs.writeFileSync(file, content);
});

console.log('Replacement complete!');
