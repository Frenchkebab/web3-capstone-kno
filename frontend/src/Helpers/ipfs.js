import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import axios from 'axios';

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecret = process.env.REACT_APP_API_KEY_SECRET;

const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

async function ipfsClient() {
  const ipfs = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
}

export async function uploadData(data) {
  let ipfs = await ipfsClient();
  let result = await ipfs.add(JSON.stringify(data));
  console.log('cid: ', result);
  return result;
}

export async function getData(cid) {
  const res = await axios.get(`https://ipfs.io/ipfs/${cid}`);
  console.log(res.data);
  return res;
}
