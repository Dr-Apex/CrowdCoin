import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x62a222c899120708c15E171593173Ea509C6261c'
);

export default instance;