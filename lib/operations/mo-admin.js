/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-01-09 14:44:54
 * @LastEditTime: 2023-01-09 17:26:27
 */
import {clone} from '../utils/index.mjs';
import inquirer from 'inquirer';
// node
import fs from 'fs';

import chalk from 'chalk';

import handlebars from 'handlebars';

const log = (...args) => console.log(chalk.green(...args));

/**
 * 编译模板文件
 * @param {*} meta 数据定义
 * @param {*} filePath 目标文件路径
 * @param {*} templatePath 模板文件路径
 */
const compile = (meta, filePath, templatePath) => {
  if(fs.existsSync(templatePath)){
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
    log(`📚 ${filePath} 修改成功`);
  }else{
    log(`❌ ${filePath} 修改失败`);
  }
}

export default async () => {
  // 1 设置项目名
  const {name} = await inquirer.prompt([{
    type: 'input',
    message: '请输入项目名称？',
    name: 'name'
  }]);
  log('🚌 创建项目 ', name);

  // 2 从 github 克隆项目到指定文件夹
  await clone('github:moqiye/mo-admin-template', name);

  // 3 编译模板文件
  compile({
      name,
    },
    `./${name}/package.json`,
    `./${name}/template/package.hbs.json`
  );
  
  // 4 打印操作指引
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

