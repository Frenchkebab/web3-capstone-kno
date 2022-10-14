// const fs = require('fs');
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

async function ipfsClient() {
  const ipfs = await create({
    host: '127.0.0.1',
    port: '5001',
    protocol: 'http',
  });
  return ipfs;
}

// Create Directory
async function createDir(userAddress) {
  //질문,답변 디렉토리 생성
  const ipfs = await ipfsClient();
  await ipfs.files.mkdir('/root/' + userAddress + '/question', {
    parents: true,
  });
  await ipfs.files.mkdir('/root/' + userAddress + '/answer', {
    parents: true,
  });
  const root = await ipfs.files.stat('/root');
  const questionDir = await ipfs.files.stat(
    '/root/' + userAddress + '/question'
  );
  const answerDir = await ipfs.files.stat('/root/' + userAddress + '/answer');
  console.log(`root: ${root.cid}`);
  console.log(`qusetionDir: ${questionDir.cid}`);
  console.log(`answerDir: ${answerDir.cid}`);
}

// Upload file
async function uploadPostQuestion(userAddress, content) {
  const ipfs = await ipfsClient();
  // let qFile = fs.readFileSync('./test.json');
  await ipfs.files.write(
    '/root/' + userAddress + '/question/questiontest.json',
    content,
    { create: true }
  );

  const fileStat = await ipfs.files.stat(
    '/root/' + userAddress + '/question/questiontest.json'
  );
  console.log('uploaded file: ', fileStat.cid.toString());

  return fileStat.cid;
}

async function uploadPostAnswer(userAddress, content) {
  const ipfs = await ipfsClient();
  // let qFile = fs.readFileSync('./test.json');
  await ipfs.files.write(
    '/root/' + userAddress + '/answer/answertest.json',
    content,
    { create: true }
  );

  const fileStat = await ipfs.files.stat(
    '/root/' + userAddress + '/question/questiontest.json'
  );
  console.log('file: ', fileStat);
}

// Read file
async function getData(hash) {
  //해시값 입력해서 파일내용 읽기
  let ipfs = await ipfsClient();
  let asyncitr = await ipfs.cat(hash);

  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString();
    console.log('data: ', data);
  }
}

// View Contents of a Directory
async function viewDirectory(userAddress) {
  const ipfs = await ipfsClient();
  const viewQuestionDirectory = await ipfs.files.ls(
    '/root/' + userAddress + '/question'
  );
  console.log(viewQuestionDirectory);
  // await ipfs.files.ls('/root/' + userAddress + '/question');

  return viewQuestionDirectory;
}

export const ipfs = () => {
  return {
    createDir,
    uploadPostQuestion,
    uploadPostAnswer,
    getData,
    viewDirectory,
  };
};
