// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'income away sad punch hope build struggle fold solution custom twice frog',
  'https://rinkeby.infura.io/v3/b040a2428ea545f39456672111c886eb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
  .deploy({data: compiledFactory.evm.bytecode.object})
  .send({from: accounts[0], gas: '10000000'});

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();