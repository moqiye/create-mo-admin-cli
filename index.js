#!/usr/bin/env node

import figlet from 'figlet';
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';

const log = (content) => console.log(chalk.green(content));

// 打印欢迎画面
const printLogo = () => {
  clear();
  const logo = figlet.textSync('MO Admin!',{
    // font: 'ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  });
  const rainbow = chalkAnimation.rainbow(logo);
  return rainbow;
}

// 模板选择对话
async function query(){
  // 选项
  const opt = {
    'MOAdmin应用模板（Vite + element-plus）': 'mo-admin',
    '退出': 'quit'
  }
  const question = [
    {
      type: 'rawlist', // 选择框
      message: '请选择要创建的项目',
      name: 'operation',
      choices: Object.keys(opt)
    }
  ]
  const answer = await inquirer.prompt(question);
  if(answer.operation === '退出') return;
  const {default: op} = await import(`./lib/operations/${opt[answer.operation]}.js`);
  await op();
}

const init = () => {
  const rainbow = printLogo();
  setTimeout(() => {
    // 1. 彩虹对话结束
    rainbow.stop(); 
    // 2. 模板选择对话
    query();
  }, 500);
}

init();
