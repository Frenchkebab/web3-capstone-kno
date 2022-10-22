import { Web3Storage, Blob, File } from 'web3.storage';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_WEB3_STORAGE_TOKEN;

function makeStorageClient() {
  return new Web3Storage({ token: TOKEN });
}

async function makeFiles(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  if (data.type === 'Question') {
    const files = [new File([blob], `q${data.qid}.json`)];
    return files;
  } else if (data.type === 'Answer') {
    const files = [new File([blob], `a${data.aid}.json`)];
    return files;
  }
}

export async function uploadData(data) {
  const client = makeStorageClient();
  const files = await makeFiles(data);
  const cid = await client.put(files);
  let fileName = '';
  if (data.type === 'Question') {
    fileName = `q${data.qid}.json`;
  } else if (data.type === 'Answer') {
    fileName = `a${data.aid}.json`;
  }
  console.log('stored file with cid:', `${cid}/${fileName}`);
  return `${cid}/${fileName}`;
}
