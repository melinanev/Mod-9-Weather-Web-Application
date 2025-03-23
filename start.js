// Simple entry point for Render deployment
console.log('Starting application from start.js');

// For ESM/import style modules
import('./server/dist/server.js').catch(err => {
  console.error('Error importing server.js:', err);
  process.exit(1);
});
