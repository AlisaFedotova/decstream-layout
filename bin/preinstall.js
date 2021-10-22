#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../webpack');

let proxyConf = path.resolve(rootDir, 'dev_server.conf.js');
if (!fs.existsSync(proxyConf)) {
  fs.copyFile(path.resolve(rootDir, 'dev_server_template.conf.js'), proxyConf, err => {
    if (err) {
      throw err;
    }
    console.log(`dev_server_template.conf.js was copied to ${proxyConf}`);
  });
}
