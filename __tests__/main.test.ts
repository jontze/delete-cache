import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import {expect, test} from '@jest/globals';

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_REPO'] = 'my_repo';
  process.env['INPUT_KEYS'] = 'cache-key-1';
  process.env['INPUT_LIMIT'] = '8';
  process.env['GITHUB_TOKEN'] = '******';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});
