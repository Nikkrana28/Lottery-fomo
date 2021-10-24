import web3 from './web3';
import lotteryJson from '../contract/Lottery.json'

var lottery;
if (web3) {
    lottery = new web3.eth.Contract(JSON.parse(lotteryJson.interface),'0xA55EFB67903f0A3e0791aC399dBEe2b9E3bE8443');
}

export default lottery;
