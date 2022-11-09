const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const KNOToken = await hre.ethers.getContractFactory('KNOToken');
  const knoToken = await KNOToken.deploy();
  await knoToken.deployed();

  const KNOV1 = await hre.ethers.getContractFactory('KNOV1');
  const knoV1 = await KNOV1.deploy(knoToken.address);
  await knoV1.deployed();

  console.log('KNOV1 deployed to:', knoV1.address);

  const initialMintTx = await knoToken.mint(knoV1.address);
  await initialMintTx.wait();

  /* -----  Save Contract addresses ----- */
  const data = {
    KNOV1: knoV1.address,
    KNOToken: knoToken.address,
  };

  fs.writeFile(
    './frontend/src/artifacts/contracts/addresses.json',
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
      console.log('KNOToken deployed to:', knoToken.address);
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
