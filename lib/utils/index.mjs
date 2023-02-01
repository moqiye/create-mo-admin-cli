import {promisify} from 'util';
import download from 'download-git-repo';
import ora from 'ora';

export const clone = async (repo, desc) => {
  const process = ora(`下载......${repo}`);
  process.start();
  await promisify(download)(repo,desc);
  process.succeed();
}

export default clone;