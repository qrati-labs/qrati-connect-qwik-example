import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

 test('PNG favicon and touch icon resolve from the Qwik subpath deployment', () => {
    const deployedIcon = '/connect/qwik-example/qrati-connect-logo-square.png';
    assert.match(html, new RegExp(`<link rel="icon"[^>]*href="${deployedIcon}"`));
    assert.match(html, new RegExp(`<link rel="apple-touch-icon"[^>]*href="${deployedIcon}"`));
 });
