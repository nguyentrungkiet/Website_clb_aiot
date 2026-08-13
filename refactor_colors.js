const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace bg-[#F5F9FC] -> bg-background
  content = content.replace(/bg-\[#F5F9FC\]/g, 'bg-background');
  
  // Replace text-[#0B2F55] -> text-foreground
  content = content.replace(/text-\[#0B2F55\]/g, 'text-foreground');
  
  // Replace bg-[#0B2F55] -> bg-navy dark:bg-card
  // Only do this if it doesn't already have dark:bg
  content = content.replace(/bg-\[#0B2F55\](?!\s*dark:)/g, 'bg-navy dark:bg-card');

  // Replace border-[#F5F9FC] -> border-background
  content = content.replace(/border-\[#F5F9FC\]/g, 'border-background');
  
  // Replace border-light-border -> border-border
  content = content.replace(/border-light-border/g, 'border-border');

  // Replace bg-white -> bg-card (for containers/cards)
  // Be careful with bg-white, might want to keep it white in light mode but bg-card in dark
  content = content.replace(/bg-white(?!\/)/g, 'bg-white dark:bg-card');
  
  // text-gray-600 -> text-gray-600 dark:text-gray-300
  content = content.replace(/text-gray-600/g, 'text-gray-600 dark:text-gray-300');
  content = content.replace(/text-gray-700/g, 'text-gray-700 dark:text-gray-300');

  // hover:bg-[#F5F9FC] -> hover:bg-background
  content = content.replace(/hover:bg-\[#F5F9FC\]/g, 'hover:bg-background');
  
  // text-[#F5F9FC] -> text-background
  content = content.replace(/text-\[#F5F9FC\]/g, 'text-background');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walk('./src', processFile);
console.log('Done refactoring colors.');
