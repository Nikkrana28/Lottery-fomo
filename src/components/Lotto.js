import React, { useState, useEffect } from "react";
import Lottery from './lotterycomponets/web3/LotteryGenerator'
import Lotteryhead from './lotterycomponets/Lotteryhead'
import Web3 from 'web3';
import lotteryGeneratorJson from './lotterycomponets/contract/LotteryGenerator.json';
import Logo from './../assets/lottery-page-header1.png'
import { isDOMComponent } from "react-dom/test-utils";
const Moralis = require('moralis');
Moralis.initialize("ytH3woEzPKiNgQwkQAonknEFXsE4UtLEMimK0Bu9");
Moralis.serverURL = 'https://zvqbzpgdjj8d.moralishost.com:2053/server'


const ComingSoon = () => {

  const [currentlottery, setCurrentlottery] = useState([]);
  const [winner, setWinner] = useState()
  const [winningamount, setWinningamount] = useState()
  const [idslist, setIdslist] = useState([])
  const [id, setId] = useState()
  const [account, setAccount] = useState(false)
  var web3
  var contractobj

  try {
    useEffect(() => {
      connect();
      get();
    }, [])
    
    const connect = async () => {
      if (window.ethereum) {
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
        contractobj = new web3.eth.Contract(lotteryGeneratorJson, "0xa2D52E6F7c4488680FFb62397913be9718724eA2")
      }
    }
    const getaccount = async() => {
      
    }
    
    getaccount();
    const get = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      
      let currentlotteryid = await contractobj.methods.currentLotteryID().call();
   
      let lotdata = await contractobj.methods.getLotteryStats(currentlotteryid).call();
      setCurrentlottery(lotdata)
      const id = currentlotteryid
      setId(currentlotteryid)

      let win = await contractobj.methods.getLotteryStats(id).call();
      setWinner(win[2])
      setWinningamount(win[3] / (10 ** 18))
    }
  }
  catch (erroe) {

  }
  
  

  if (id > 0) {
    for (let i = id - 1; i >= 0; i--) {
      if (!idslist.includes(i)) {
        idslist.push(i)
      }
    }
  }


  //role="alert" style={{justifyContent:"center",alignContent:"center",alignItems:"center",}}
  return (

    <div className="wrapper-lottery">
      <div class="alert lotto-alter">
          <img src={Logo}  />
         
          <br />
          <br />
          <br />
        </div>

      <div className='paraent-grid lotto-alter'>
        <div class="lotto-com">
          <Lotteryhead lotteryadd={currentlottery[0]} id={id} players={currentlottery[1]} lotterystats={currentlottery[6]} winners={winner} winningamount={winningamount} idslist={idslist} accounts={account} />
        </div>
      </div>
    </div>

  )
};

export default ComingSoon;
