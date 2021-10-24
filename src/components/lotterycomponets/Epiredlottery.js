import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import lotteryGeneratorJson from './contract/LotteryGenerator.json';



function Epiredlottery({ winner, id }) {
  const [winneris, setWinneris] = useState()
  var web3
  var contractobj
  useEffect(() => {
    getwinner();
  }, [])

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contractobj = new web3.eth.Contract(lotteryGeneratorJson, "0xa2D52E6F7c4488680FFb62397913be9718724eA2")
  }

  const getwinner = async () => {
    let win = await contractobj.methods.getLotteryStats(id).call();
    setWinneris(win[2])
  }
  console.log('ids3 and winner', id, winneris)


  return (
    <div>

      <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Pot Value: <span className="card-title"> 1 BNB </span> </h5>
          <h6 className="card-subtitle mb-2 ">Lottery ID: {id}</h6>
          <br />
          <h5 className='winner'><span>Winner was: {winneris}  </span></h5>
          {/* <button onClick={() => { setShowexpired(true) }} class="play-btn">See more</button> */}
          <br />
          <br />
          <h6 className='lottery-expired'>Lottery Expired</h6>
        </div>
      </div>
    </div>
  )
}


export default Epiredlottery
