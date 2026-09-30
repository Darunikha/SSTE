// Smoke tests: boot the real server with no database and no email credentials,
// then exercise the public API. Run with `npm test` (node's built-in test runner).
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

const PORT = 5099;
const BASE = `http://127.0.0.1:${PORT}`;
let server;

const waitForHealth = async (timeoutMs = 30000) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/api/health`);
      if (res.ok) return;
    } catch {
      // server not listening yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Server did not become healthy in time');
};

before(async () => {
  server = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: 'test',
      // Unreachable DB: the API must fall back to built-in data
      MONGO_URI: 'mongodb://127.0.0.1:1/ci_unreachable',
      SMTP_USER: '',
      SMTP_PASS: '',
      BREVO_API_KEY: '',
    },
    stdio: 'ignore',
  });
  await waitForHealth();
  // Let the DB connection attempt fail so queries fall back immediately
  await new Promise((r) => setTimeout(r, 6500));
});

after(() => {
  if (server) server.kill();
});

test('GET /api/health reports the API is operational', async () => {
  const res = await fetch(`${BASE}/api/health`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.success, true);
});

for (const route of ['services', 'expertise', 'stats', 'team', 'faqs', 'catalog']) {
  test(`GET /api/${route} returns built-in data without a database`, async () => {
    const res = await fetch(`${BASE}/api/${route}`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data) && body.data.length > 0, `${route} should not be empty`);
  });
}

test('POST /api/quotes rejects a request missing required fields', async () => {
  const res = await fetch(`${BASE}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'CI' }),
  });
  assert.equal(res.status, 400);
});

test('POST /api/quotes accepts a valid request and responds quickly', async () => {
  const started = Date.now();
  const res = await fetch(`${BASE}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'CI', email: 'ci@example.com', service: 'Spare Parts', message: 'ci' }),
  });
  const body = await res.json();
  assert.equal(res.status, 201);
  assert.equal(body.success, true);
  assert.ok(Date.now() - started < 5000, 'must not wait on the database or email');
});

test('unknown API route returns 404', async () => {
  const res = await fetch(`${BASE}/api/does-not-exist`);
  assert.equal(res.status, 404);
});
