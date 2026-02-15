const [, , mode, portEnvName] = process.argv;

if (mode !== 'dev' && mode !== 'start') {
  console.error('Usage: bun --env-file=../../.env ../../scripts/next-with-global-port.ts <dev|start> <PORT_ENV_NAME>');
  process.exit(1);
}

if (!portEnvName) {
  console.error('Missing port env variable name.');
  process.exit(1);
}

const port = process.env[portEnvName];

if (!port) {
  console.error(`Missing environment variable: ${portEnvName}`);
  process.exit(1);
}

const proc = Bun.spawn([process.execPath, 'x', 'next', mode, '--port', port], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'inherit'],
});

const exitCode = await proc.exited;
process.exit(exitCode);
