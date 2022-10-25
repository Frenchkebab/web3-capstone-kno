import { NFTStorage, Blob } from 'nft.storage';

const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

async function makeFiles(data) {
  const storageRes = await NFTStorage.encodeBlob(
    new Blob([JSON.stringify(data)])
  );
  return storageRes;
}

export async function uploadData(data) {
  const storageRes = await makeFiles(data);
  const uri = await client.storeCar(storageRes.car);
  console.log('stored file with cid:', `uri`);
  return uri;
}
