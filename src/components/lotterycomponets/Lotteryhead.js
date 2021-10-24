import React, { useState, useEffect } from 'react'
import LotteryGenerator from "./web3/LotteryGenerator";
import './lotterystyle.css'
import Playlottery from './Playlottery';
import Web3 from 'web3';
import lotteryGeneratorJson from './contract/LotteryGenerator.json';
import Expiredlottery from './Epiredlottery'
import previouslotteries from './previous.json'

function Lotteryhead({ lotteryadd, id, players, lotterystats, winners, winningamount, idslist, accounts, price }) {

  const [expiredlottery, setExpiredlottery] = useState(true);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false)
  const [lastwinner, setLastwinner] = useState()
  const [account, setAccount] = useState(false)
  const [expirdid, setExpiredid] = useState([])
  const [showwinner, setShowwinner] = useState(false)
  const [eth, setEth] = useState()
  var web3
  var contractobj
  
  var pri = Number(price).toFixed(0)
  console.log("price fomo", Number(pri).toFixed(0))
  // useEffect(() => {
  //   getaccountaddress();
  // }, [])

  console.log('account ', accounts)
  // const getaccountaddress = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   setAccount(accounts[0]);
  // }
  console.log("preiv", previouslotteries[0]['Pot-value'] )

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contractobj = new web3.eth.Contract(lotteryGeneratorJson, "0xa954e7Ed2DDFdFDdEAb7C66D09e96DE48d9A04dd")
  }


  const submit = (event) => {
    event.preventDefault();
    if (eth > 25) {
      window.alert("Max Tickets Purches 25 only")
    }

    else {
      try {
        contractobj.methods.enterLottery().send({
          from: accounts,
          value: eth * 10 ** 16
        })
          .then(res =>
            console.log('Success', res))
          .catch(err => console.log(err))

      }
      catch (error) {
        console.log(error)
      }
    }
  };


  // const getlastwinner = async (value) => {
  //   return await contractobj.methods.getLotteryStats(value).call();
  // }

  // function get(value) {
  //   (async () => {
  //     let win = await getlastwinner(value)
  //     setLastwinner(win[2])
  //   })()
  //   return lastwinner
  // }

  console.log('ids2', idslist)


  return (
    <div>
      <div className="paraent1" style={{maxWidth:""}}>
        <div className="card" style={{ minWidth: "25rem", padding:"40px" }}>
        {lotterystats ? <div className='card-link'> <h3 className='card-link'>Live</h3></div> : <div className='not-live'> <h3 className='not-live'>Lottery is not live</h3> </div>}
        <div className='Pot-value'> <h5>Pot value: <span className='Pot-price'> $ {winningamount * pri}   </span></h5></div>
        <div className='lottery-id'><h5>Lottery ID: <span className='lottery-id'> {id} </span> </h5></div>
        <div className='entery-lottery'>
          {lotterystats ? <div className='playlottery'>
            <div id='form-flex' className='child-flex'>
              <form onSubmit={submit} className='child-flex'>
                <br />
                <div class="form-group">
                  <label for="formGroupExampleInput2">Number of Tickets</label>
                  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="1 ticket equals 0.01 BNB" value={eth} onChange={(e) => setEth(e.target.value)}></input>
                </div>
                <button type="submit" className='submit-btn'>Submit</button>
              </form>
            </div>
            <div>
              <table class="table table-bordered table-striped mb-0 table-responsive">
                <thead>
                  <tr>
                    <th scope="col">-----------  Participants ({players.length}) ----------- </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(items =>
                    <tr>
                      <td>{items}</td>
                    </tr>

                  )}
                </tbody>
              </table>

            </div>

          </div> : <div> <h5>Winner is</h5> <h4 className='winner'> {winners}</h4></div>}
        </div>
        <div className='lottery-address'><h5>Lottery Address <span className='Pot-price'> {lotteryadd}</span></h5> </div>
        </div>
      </div>
      <br />
      {expiredlottery ?
        <div style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          <h2>Expired Lotteries</h2>
          <div className='paraent mt-3'>
            {idslist.map(item =>
              <Expiredlottery winner={'sdfhjdhfjsdhfkjs'} id={idslist.indexOf(item)} />)}
          </div>
          <br />
          <br />
          <br />
          <br />
          <h2>Previous Lotteries</h2>
          <div className='paraent mt-3'>
            {previouslotteries.map(item => 

            <div className="card" style={{ width: "20rem" }}>
              <div className="card-body">
                <h5 className="card-title">Pot Value: <span className="card-title"> {item['Pot-value']} </span> </h5>
                <br />
                <h5 className='winner'><span>Lottery Address:  {item['Lottery-address']} </span></h5>
                {/* <button onClick={() => { setShowexpired(true) }} class="play-btn">See more</button> */}
                <br />
                <h5 className='winner'><span>Winner was: {item['winner']} </span></h5>
                <br />
                <h6 className='lottery-expired'>Lottery Expired</h6>
              </div>
            </div>)}


          </div>
        </div> : null}
      <br />
      <br />
      <br />
    </div>
  )
}

export default Lotteryhead





