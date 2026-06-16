const { createServer } = require('net');
const { spawn } = require('child_process');

function findFreePort(port = 3000) {
  return new Promise(resolve => {
    const server = createServer();
    server.unref();
    server.on('error', () => resolve(findFreePort(port + 1)));
    server.listen(port, () => server.close(() => resolve(port)));
  });
}

findFreePort().then(port => {
  console.log(`> Starting on http://localhost:${port}`);
  const child = spawn('next', ['start', '-p', String(port)], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  child.on('exit', code => process.exit(code ?? 0));
});
