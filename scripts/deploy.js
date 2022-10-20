const fs = require('fs');
const hre = require('hardhat');

async function main() {
  const KNOV1 = await hre.ethers.getContractFactory('KNOV1');
  const knoV1 = await KNOV1.deploy();

  await knoV1.deployed();

  console.log('KNOV1 deployed to:', knoV1.address);

  const data = {
    KNOV1: knoV1.address,
  };

  fs.writeFile(
    './frontend/src/artifacts/contracts/addresses.json',
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
      console.log('Contract addresses saved successfully');
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
