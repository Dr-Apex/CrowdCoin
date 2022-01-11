// compile code will go here
const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = JSON.stringify({
  language: 'Solidity',
  sources: {
    'Campaign.sol' : {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
});
const abiString = solc.compile(input);
const contracts = JSON.parse(abiString).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);
for (let contract in contracts) {
  fs.outputJSONSync(
      path.resolve(buildPath, contract + ".json"),
      contracts[contract]
  );
}
