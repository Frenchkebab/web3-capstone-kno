import { Web3Storage, Blob, File } from 'web3.storage';
import axios from 'axios';

function getAccessToken() {
  return process.env.REACT_APP_WEB3_STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
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

/* 
  Reading Files
*/

// async function retrieveFile() {
//   const client = makeStorageClient();
//   const res = await client.get(
//     'bafybeia3mgg7jjjp5rvrahpy2svts2hpzh5br7r6xz2fcr5wdvpo3lxhda'
//   );

//   const files = await res.files();
//   for (const file of files) {
//     console.log(file);
//   }
// }

// axios({
//   url: 'https://ipfs.io/ipfs/bafybeia3mgg7jjjp5rvrahpy2svts2hpzh5br7r6xz2fcr5wdvpo3lxhda/hello.json',
// }).then((res) => {
//   console.log(res.data.hello);
// });

// retrieveFile();

// async function main() {
//   const files = makeFileObjects();
//   storeFiles(files);
// }

// main();
