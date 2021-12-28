#!/usr/bin/env node

const { program } = require('commander');
const { resolve } = require('path');
const fs = require('fs');
const process = require('process');
const https = require('https');

const prefix = '[JSFIX dependency scanner]';

program
  .name('@jsfix/dependency-scanner')
  .version('0.1.3')
  .requiredOption('-p, --project <ID>', 'project ID (see https://jsfix.live/dependency-scanner)')
  .option('-d, --dir <path>', 'project directory', '.')
  .action(send)
  .showHelpAfterError()
  .parse();

function send() {
  const projectId = program.opts().project;
  const basedir = program.opts().dir;
  const packageJson = readFile(basedir, 'package.json');
  const packageLockJson = readFile(basedir, 'package-lock.json');
  const dependencies = packageJson.dependencies || {};
  const peerDependencies = packageJson.peerDependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  const postData = JSON.stringify({
    projectId,
    dependencies,
    peerDependencies,
    devDependencies,
    packageLock: packageLockJson,
  });
  const options = {
    hostname: 'backend.jsfix.live',
    port: 443,
    path: '/dependencies',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };
  const req = https
    .request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(data);
        process.exit(res.statusCode === 200 ? 0 : -1);
      });
    })
    .on('error', (e) => {
      console.error(prefix, 'Error:', e.message);
      process.exit(-1);
    });
  req.write(postData);
  req.end();
}

function readFile(basedir, filename) {
  try {
    return JSON.parse(fs.readFileSync(resolve(basedir, filename)));
  } catch (e) {
    console.error(prefix, 'Unable to read file:', e.message);
    process.exit(-1);
  }
}
