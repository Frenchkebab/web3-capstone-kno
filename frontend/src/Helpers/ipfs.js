// const { create, globSource } = require('ipfs-http-client');
import { create, globSource } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import axios from 'axios';

const projectId = '2GIsdlncK6cMXQgmq0l7hdkYxCD';
const projectSecret = '1b954962da6547b4ff21bf4759ef9342';
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
