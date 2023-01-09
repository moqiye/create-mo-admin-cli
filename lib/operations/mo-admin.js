import clone from '../utils/clone';
import inquirer from 'inquirer';
// node
import {resolve} from 'path';
// node
import fs from 'fs';

import chalk from 'chalk';

const log = (...args) => console.log(chalk.green(...args));

import handlebars from 'handlebars';

export default async () => {
  const {name} = await inquirer.prompt([{
    type: 'input',
    message: '请输入项目名称？',
    name: 'name'
  }]);

  log('🚌 创建项目', + name);
  // 从 github 克隆项目到指定文件夹
  await clone('');
  log(`
  👌 安装完成：
  To get Start:
  ===========================
  cd ${name}
  npm i
  npm run dev
  ===========================
  `);
}

