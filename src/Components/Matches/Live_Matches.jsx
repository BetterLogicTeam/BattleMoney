import Navbar from "../Header/Navbar";
import axios from "axios";
import moment from "moment/moment";
import io from "socket.io-client";
import "./Match.css";
import { useSearchParams } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Rule from "../Popup/popup";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

function Live_Matches() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("Id"));
  const [date_time, setTime] = useState(searchParams.get("Time"));
  let [updateBal, setUpdateBal] = useState(false);
  const [t1, setT1] = useState("0.0");
  const [t2, setT2] = useState("0.0");
  const [t3, setT3] = useState("0.0");
  const [t4, setT4] = useState("0.0");
  const [t5, setT5] = useState("0.0");
  const [t6, setT6] = useState("0.0");
  const [t7, setT7] = useState("0.0");
  const [t8, setT8] = useState("0.0");
  const [remark1, setRemark1] = useState("");
  const [data, setData] = useState([]);
  // console.log("dataall",data);
  const [sid, setSid] = useState("");
  const [sr, setSr] = useState("");
  const [sess, setBall] = useState("");
  const [size, setSize] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [matchType, setMatchType] = useState("");
  const [firstCountry, setFirstCountry] = useState("");
  const [secondCountry, setSecondCountry] = useState("");
  const [match, setMatch] = useState("");
  const [sessionMarket, setSessionMarket] = useState("");
  const [bookMarket, setBookMarket] = useState("");
  const [score, setScore] = useState("");
  const [ballOver, setBallOver] = useState("");
  const [teams, setTeams] = useState("");
  const [bookSuspend, setBookSuspend] = useState("");
  const [bookSuspend1, setBookSuspend1] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [sessName, setSessName] = useState("");
  const [oddBet, setOddBet] = useState("");
  const [bmm, setbMM] = useState("");
  const [dataValue, setValue] = useState("0");
  const [country, setCountry] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [back, setback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [LayPrice1, setLayPrice1] = useState("");
  const [LaySize1, setLaySize1] = useState("");
  const [BackPrice1, setBackPrice1] = useState("");
  const [BackSize1, setBackSize1] = useState("");
  const [gtype, setgtype] = useState("");
  const SOCKET_URL = "https://battleminey-api.nakshtech.info";
  // const SOCKET_URL = "http://localhost:3344";

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("selectMatch", id);
    cricketMatchesSocket.on("FromAPI", (data) => {
      let res = data;
      console.log("Session_Market", res);
      if (res.message != "perhapes matchid  not exist or match not active.") {
        setData(res);
      }
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketOddMatch", id);
    cricketMatchesSocket.on("CricketOddMatch_FromAPI", (data) => {
      let res = data[0];
      // console.log("Match_data", res);
      setSessName(res);
      setMatchType(res?.marketId);
      setFirstCountry(res?.runners[0]);
      setSecondCountry(res?.runners[1]);
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketScore", id);
    cricketMatchesSocket.on("CricketScore_FromAPI", (data) => {
      let res = data.data;
      // console.log("Score_match==>", res);
      setScore(res);
      setBallOver(res.last24ballsNew);
      setTeams(res.teams);
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Market_Id_Data:",matchType);
    if (matchType) {
      const cricketMatchesSocket = io(SOCKET_URL);
      cricketMatchesSocket.emit("CricketOddMatchType", matchType);
      cricketMatchesSocket.on("CricketOddMatchType_FromAPI", (data) => {
        let res = data[0];
        console.log("Market_Id_Data", res);
        setOddBet(res.runners);
        setMatch(res.market);
        setT1(res?.runners[0]?.ex?.availableToBack);
        setT2(res?.runners[0]?.ex?.availableToLay);
        setT3(res?.runners[1]?.ex?.availableToBack);
        setT4(res?.runners[1]?.ex?.availableToLay);
      });

      return () => {
        cricketMatchesSocket.disconnect();
      };
    }
  }, [matchType]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    const cricketMatchesSocket = io(SOCKET_URL);
    cricketMatchesSocket.emit("CricketBookMarket1", id);
    cricketMatchesSocket.on("CricketBookMarket1_FromAPI", (data) => {
      let res = data[0];
      // console.log("BookMarket1", res);
      setBookMarket(res?.marketId);
    });

    return () => {
      cricketMatchesSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // console.log("Cricketmatchesdata:",id);
    if (bookMarket) {
      const cricketMatchesSocket = io(SOCKET_URL);
      cricketMatchesSocket.emit("CricketBookMarket2", bookMarket);
      cricketMatchesSocket.on("CricketBookMarket2_FromAPI", (data) => {
        let res = data[0];

        // console.log("BookMarket2==>", res);
        setbMM(res.runners);
        setMaxValue(res);
        setBookSuspend(res?.runners[0]);
        setBookSuspend1(res?.runners[1]);
        setT5(res?.runners[0]?.ex?.availableToBack);
        setT6(res?.runners[0]?.ex?.availableToLay);
        setT7(res?.runners[1]?.ex?.availableToBack);
        setT8(res?.runners[1]?.ex?.availableToLay);
      });

      return () => {
        cricketMatchesSocket.disconnect();
      };
    }
  }, [bookMarket]);

  const popupRef = useRef(null);
  function BetValue(
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
  ) {
    popupRef.current.scrollIntoView({ behavior: "smooth" });

    if (value4 == "back") {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setSize(value8);
      setMin(value9);
      setMax(value10);
      setLayPrice1(value11);
      setLaySize1(value12);
      setBackPrice1(value13);
      setBackSize1(value14);
      setgtype(value15)

    } else {
      setShowPopup(true);
      setModalIsOpen(true);
      setValue(value1);
      setCountry(value2);
      setSessionMarket(value3);
      setback(value4);
      setSid(value5);
      setSr(value6);
      setBall(value7);
      setSize(value8);
      setMin(value9);
      setMax(value10);
      setLayPrice1(value11);
      setLaySize1(value12);
      setBackPrice1(value13);
      setBackSize1(value14);
      setgtype(value15)
    }
  }

  const [betValue, setbetValue] = useState("");
  function handleClick(value) {
    // console.log("value",value);
    setbetValue(value);
  }

  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const encryptdata=async(payload)=>{
    try{
      let response = await axios.get("https://battlemoney-match-api.nakshtech.info/getPublicKey");
                let publicKey = response.data.publicKey;
                if (publicKey) {
                  const data = JSON.stringify(payload);
        
                  const textBuffer = new TextEncoder().encode(data);
        
                  // Convert base64 publicKey to Uint8Array
                  const binaryString = window.atob(publicKey);
                  const len = binaryString.length;
                  const bytes = new Uint8Array(len);
                  for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
        
                  const cryptoKey = await window.crypto.subtle.importKey(
                    "spki",
                    bytes,
                    {
                      name: "RSA-OAEP",
                      hash: "SHA-256",
                    },
                    true,
                    ["encrypt"]
                  );
        
                  const encryptedData = await window.crypto.subtle.encrypt(
                    {
                      name: "RSA-OAEP",
                    },
                    cryptoKey,
                    textBuffer
                  );
        
                  // Convert encryptedData to base64
                  const base64EncryptedData = btoa(
                    String.fromCharCode(...new Uint8Array(encryptedData))
                  );
                  return base64EncryptedData;
                }
         
    }catch(e){
      console.log('encrypt Api error:',e)
    }
  }
  const Live_Bet_Api = async () => {
    if (dataValue > 0) {
      if (
        sessionMarket == "Session Market" ||
        sessionMarket == "Over by Over Session Market" ||
        sessionMarket == "Ball by Ball Session Market"
      ) {
        const filteredData = data?.filter(
          (item) =>
            item.RunnerName == country &&
            item.SelectionId == sid &&
            item.sr_no == sr
        );
        
        // console.log("dataMatch1==>", filteredData);
        // console.log("dataMatch2==>", country, sid, sr, dataValue);
        if (
          (filteredData[0]?.RunnerName == country &&
            filteredData[0]?.SelectionId == sid &&
            filteredData[0]?.sr_no == sr &&
            filteredData[0]?.GameStatus == "" &&
            filteredData[0]?.BackPrice1 == dataValue) ||
          filteredData[0]?.LayPrice1 == dataValue
        ) {
          if (back == "back" && filteredData[0]?.BackPrice1 == dataValue) {
            try {
              // if (back == "back") {
                let body =await encryptdata({
                  uid: uId,
                  type: sessionMarket,
                  team: country,
                  stake: betValue,
                  back: dataValue,
                  BackSize1: size,
                  LaySize1: "",
                  min: min,
                  max: max,
                  lay: "0",
                  matchid: id,
                  ballsess: sess,
                  sid: sid,
                  srno: sr,
                  WinPerc: "0",
                  LayPrice2: LayPrice1,
                  LaySize2: LaySize1,
                  BackPrice2: BackPrice1,
                  BackSize2: BackSize1,
                  GameStatus: '',
                  gtype: gtype,
                  rem: "",
                })
                let res = await  axios.post("https://battlemoney-match-api.nakshtech.info/PlaceBet", {
                  encryptedData: body,
                });
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else if (back == "lay" && filteredData[0]?.LayPrice1 == dataValue) {
            try {
              // if (back == "back") {
                let body= await encryptdata( {
                  uid: uId,
                  type: sessionMarket,
                  team: country,
                  stake: betValue,
                  back: "0",
                  lay: dataValue,
                  BackSize1: "",
                  LaySize1: size,
                  min: min,
                  max: max,
                  matchid: id,
                  ballsess: sess,
                  sid: sid,
                  srno: sr,
                  WinPerc: "",
                  LayPrice2: LayPrice1,
                  LaySize2: LaySize1,
                  BackPrice2: BackPrice1,
                  BackSize2: BackSize1,
                  GameStatus: '',
                  gtype: gtype,
                  rem: "",
                })
              let res = await axios.post(
                "https://battlemoney-match-api.nakshtech.info/PlaceBet",{
                  encryptedData: body,
                }
               
              );
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else {
            toast.error("Odd Value is miss Match");
          }
        } else {
          toast.error("Odd Value is miss Match");
        }
      } else if (sessionMarket == "MATCH_ODDS") {
        // console.log("dataMatch3", oddBet);
        // console.log("dataMatch4==>", country, sid, dataValue);
        if (
          oddBet[0]?.runner == country ||
          (oddBet[1]?.runner == country && oddBet[0]?.selectionId == sid) ||
          (oddBet[1]?.selectionId == sid && oddBet[0]?.status == "") ||
          (oddBet[1]?.status == "" &&
            oddBet[0]?.ex?.availableToBack[0]?.price == dataValue) ||
          oddBet[0]?.ex?.availableToBack[1]?.price == dataValue ||
          oddBet[0]?.ex?.availableToBack[2]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[0]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[1]?.price == dataValue ||
          oddBet[1]?.ex?.availableToBack[2]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[0]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[1]?.price == dataValue ||
          oddBet[0]?.ex?.availableToLay[2]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[0]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[1]?.price == dataValue ||
          oddBet[1]?.ex?.availableToLay[2]?.price == dataValue
        ) {
          // console.log("back123=>",back);
          if (
            (back == "back",
            {
              /*&& t6.b1 == dataValue*/
            })
          ) {
            try {
              // if (back == "back") {
                let body=await encryptdata({
                  uid: uId,
                  type: sessionMarket,
                  team: country,
                  stake: betValue,
                  back: dataValue,
                  BackSize1: size,
                  LaySize1: "",
                  min: min,
                  max: max,
                  lay: "0",
                  matchid: id,
                  ballsess: sess,
                  sid: sid,
                  srno: sr,
                  WinPerc: "",
                  LayPrice2: LayPrice1,
                  LaySize2: LaySize1,
                  BackPrice2: BackPrice1,
                  BackSize2: BackSize1,
                  GameStatus: '',
                  gtype: gtype,
                  rem: "",                })
              let res = await axios.post(
                "https://battlemoney-match-api.nakshtech.info/PlaceBet",{
                  encryptedData: body,                }
              
              );
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                alert("Minimum Bet amount is 100 INR !!");
              } else {
                alert(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else if ((back == "lay", {})) {
            try {
              let body=await encryptdata(                {
                uid: uId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: "0",
                lay: dataValue,
                BackSize1: "",
                LaySize1: size,
                min: min,
                max: max,
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: "",
                LayPrice2: LayPrice1,
                LaySize2: LaySize1,
                BackPrice2: BackPrice1,
                BackSize2: BackSize1,
                GameStatus: '',
                gtype: gtype,
                rem: "",              }
)
              let res = await axios.post(
                "https://battlemoney-match-api.nakshtech.info/PlaceBet",
              {   encryptedData: body,
              });
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                alert("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                alert(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else {
            alert("Odd Value is miss Match");
          }
        } else {
          alert("Odd Value is miss Match");
        }
      } else if (sessionMarket == "Bookmaker Market") {
        if (
          bmm[0]?.runnerName == country ||
          (bmm[1]?.runnerName == country && bookSuspend.selectionId == sid) ||
          (bookSuspend1.selectionId == sid && bookSuspend.status == "") ||
          (bookSuspend1.status == "" &&
            bmm[0]?.ex?.availableToBack[0]?.price1 == dataValue) ||
          bmm[0]?.ex?.availableToBack[1]?.price1 == dataValue ||
          bmm[0]?.ex?.availableToBack[2]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToBack[0]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToBack[1]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToBack[2]?.price1 == dataValue ||
          bmm[0]?.ex?.availableToLay[0]?.price1 == dataValue ||
          bmm[0]?.ex?.availableToLay[1]?.price1 == dataValue ||
          bmm[0]?.ex?.availableToLay[2]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToLay[0]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToLay[1]?.price1 == dataValue ||
          bmm[1]?.ex?.availableToLay[2]?.price1 == dataValue
        ) {
          // console.log("back123=>",back);
          if (
            (back == "back",
            {
              /*&& t6.b1 == dataValue*/
            })
          ) {
            try {
              // if (back == "back") {
                let body=await encryptdata( {
                  uid: uId,
                  type: sessionMarket,
                  team: country,
                  stake: betValue,
                  back: dataValue,
                  BackSize1: size,
                  LaySize1: "",
                  min: min,
                  max: max,
                  lay: "0",
                  matchid: id,
                  ballsess: "",
                  sid: sid,
                  srno: "",
                  WinPerc: "",
                  LayPrice2: LayPrice1,
                  LaySize2: LaySize1,
                  BackPrice2: BackPrice1,
                  BackSize2: BackSize1,
                  GameStatus: '',
                  gtype: gtype,
                  rem: "",
                                })
              let res = await axios.post(
                "https://battlemoney-match-api.nakshtech.info/PlaceBet",{
                  encryptedData: body,
                }
               
              );
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api ", e);
            }
          } else if (
            (back == "lay",
            {
              /* && t6.l1 == dataValue*/
            })
          ) {
            try {
              let body=await encryptdata( {
                uid: uId,
                type: sessionMarket,
                team: country,
                stake: betValue,
                back: "0",
                BackSize1: "",
                LaySize1: size,
                min: min,
                max: max,
                lay: dataValue,
                matchid: id,
                ballsess: sess,
                sid: sid,
                srno: sr,
                WinPerc: "",
                LayPrice2: LayPrice1,
                LaySize2: LaySize1,
                BackPrice2: BackPrice1,
                BackSize2: BackSize1,
                GameStatus: '',
                gtype: gtype,
                rem: "",
                            })
              let res = await axios.post(
                "https://battlemoney-match-api.nakshtech.info/PlaceBet",
               {
                encryptedData: body,
               }
              );
              res = res.data.data;
              console.log("Live_Bet_Api", res);
              if (res == "Minimum Bet amount is 100 Usd !!") {
                toast.error("Minimum Bet amount is 100 INR !!");
                // window.location.reload();
              } else {
                toast.success(res);
                PlaceBet_History();
                setUpdateBal(!updateBal);
                // window.location.reload();
              }
            } catch (e) {
              console.log("Error While Fatch Live_Bet_Api API", e);
            }
          } else {
            toast.error("Odd Value is miss Match");
          }
        } else {
          toast.error("Odd Value is miss Match");
        }
      } else {
        console.log("Something Error in betting API");
      }
    } else {
      toast.error("Invalid Request !");
    }
  };

  const [tableData, setTableData] = useState([]);
  const PlaceBet_History = async () => {
    try {
      let res = await axios.get(
        `https://battlemoney-match-api.nakshtech.info/BetHistory?id=${uId}`
      );
      res = res.data.data;
      // console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch PlaceBet_History API", e);
    }
  };

  const handleReset = () => {
    setbetValue("");
    setValue("");
    setCountry("");
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const [abhi, setabhi] = useState([]);

  const Result_By_Game = async () => {
    try {
      let res = await axios.post(
        "https://battlemoney-match-api.nakshtech.info/resultbygame",
        {
          gameId: id,
        }
      );
      res = res?.data;
      // console.log("Game_Result===>", res);
      setabhi(res);
    } catch (e) {
      console.log("Error While Fatch Result_By_Game API", e);
    }
  };

  const data_filter = async () => {
    const filteredArray = abhi?.filter((item) => item.result != "...");

    for (let i = 0; i < filteredArray.length; i++) {
      //  console.log("Fillter",filteredArray[i])
      let res = await axios.post(
        "https://battlemoney-match-api.nakshtech.info/Result_Declare",
        {
          uid: uId,
          matchid: filteredArray[i]["gameId"],
          sid: filteredArray[i]["sid"],
          srno: filteredArray[i]["srno"],
          result: filteredArray[i]["result"],
          type: "",
        }
      );
      // console.log("res1", res);
      res = res.Promise;
    }
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    // Result_By_Game();
    // data_filter();
    // PlaceBet_History();
    // }, 2000);
    // return () => clearInterval(intervalId);
  }, [abhi, uId]);

  const Completionist = () => {
    return (
      <>
        {/* <h6>PreSale Started</h6> */}

        {/* <div className="text_days fs-5 ">Presale ended!</div> */}
      </>
    );
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown

      return (
        <>
          <div></div>
        </>
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fixed_top);
    return () => {
      window.removeEventListener("scroll", fixed_top);
    };
  });
  const fixed_top = (e) => {
    const header = document.querySelector("#bettingSection");
    const scrollTop = window.scrollY;
    scrollTop >= 50
      ? header.classList.add("set_sticky")
      : header.classList.remove("set_sticky");
  };

  return (
    <div>
      <Navbar updateBal={updateBal} />
      <main class="main_root wrapper">
        {/* <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="section_bg">
                  <div className="bars_bg">
                    <div className="game_timer">
                      <div className="game_vs">
                        <div className="countryName">
                          <h1>{firstCountry?.runnerName}</h1>
                        </div>
                        <div className="countVs">
                          <h1>vs</h1>
                        </div>
                        <div className="countryName">
                          <h1>{secondCountry?.runnerName}</h1>
                        </div>
                        <div class="section_heading streaming">
                          <p className="btn btn-primary" onClick={toggleShow}>
                            <i
                              class="fa fa-television"
                              style={{ color: "white" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#040e3a" }}>
                    <div className="bars_bg_vs_2">
                      <div className="col-md-4 midVSes_flex">
                        <div className="mid_left_icon">
                          <img src="assets/images/cricket_bat.png" />
                          {score != "" ? (
                            <>
                              <span className="ml_5">
                                {teams[0]?.team_name} {": "}
                                {teams[0]?.score}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4 midVSes_flex">
                        <div className="mid_left_icon">
                          <p>
                            <h6 className="score">
                              Target : {score?.target} Over :
                              {
                                (score?.current_over ?? "")
                                  .replace(/[()]/g, "")
                                  .split(".")[0]
                              }
                            </h6>
                            <>
                              Ball :
                              {
                                (score?.current_over ?? "")
                                  .replace(/[()]/g, "")
                                  .split(".")[1]
                              }{" "}
                              CRR : {score?.currentRunRate} : RR :{" "}
                              {score?.requireRunRate}
                              <br />
                              Wide: 0 No Ball: 0 Leg Bye: 0
                            </>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 midVSes_flex ball_map">
                        <div className="mid_left_icon">
                          <img
                            src="assets/images/ball_icon.png"
                            className="ml_5"
                          />{" "}
                          {score != "" ? (
                            <>
                              <span>
                                {teams[1]?.team_name} {": "}
                                {teams[1]?.score}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mid_left_icon">
                      <td _ngcontent-rro-c88="" class="text-right ng-tns-c88-2">
                        {score != "" ? (
                          <ul
                            _ngcontent-rro-c88=""
                            class="ball-part ng-tns-c88-2"
                          >
                            {ballOver[0]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[0]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[0]?.score_card}
                                </p>
                              </li>
                            )}
                            {ballOver[1]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[1]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[1]?.score_card}
                                </p>
                              </li>
                            )}
                            {ballOver[2]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[2]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[2]?.score_card}
                                </p>
                              </li>
                            )}
                            {ballOver[3]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[3]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[3]?.score_card}
                                </p>
                              </li>
                            )}
                            {ballOver[4]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[4]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[4]?.score_card}
                                </p>
                              </li>
                            )}
                            {ballOver[5]?.score_card == "ww" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wk</p>
                              </li>
                            ) : ballOver[5]?.score_card == "w" ? (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">Wd</p>
                              </li>
                            ) : (
                              <li
                                _ngcontent-rro-c88=""
                                class="ng-tns-c88-2 ng-star-inserted live"
                              >
                                <p className="score_ball">
                                  {ballOver[5]?.score_card}
                                </p>
                              </li>
                            )}
                          </ul>
                        ) : (
                          <></>
                        )}
                      </td>
                    </div>
                    <div className="text_data_flex">
                      <h6
                        className="score"
                        style={{ textAlign: "center", color: "#ffff" }}
                      >
                        {" "}
                        {score?.msg}
                      </h6>
                    </div>
                    <br />
                  </div>

                  <Countdown
                    date={Date.now() + (parseInt(1681918116689) - Date.now())}
                    renderer={renderer}
                  />

                  {show && (
                    <div class="live_video streaming">
                      <iframe
                        allowfullscreen="true"
                        style={{
                          width: "100%",
                          height: "210px",
                          border: "none",
                          opacity: "1",
                          visibility: "visible",
                        }}
                        id="frame_video"
                        // https://nikhilm.gq/bettingapi/matchtv_v1.php?Action=match&EventID=32473058
                        src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${id}`}
                      ></iframe>
                    </div>
                  )}

                  {/* <!-----================match odds row============------> */}
                  <div class="bars_bg">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="section_heading">
                          <h2>{sessName?.marketName}</h2>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="section_heading">
                          <h2>
                            {moment(date_time).format("DD/MM/YYYY h:m:s A")}
                          </h2>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="section_heading">
                          <h3>
                            Maximum Bet 1500K <Rule />
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Box
                    sx={{
                      width: "100%",
                      backgroundImage:
                        "radial-gradient(circle farthest-corner at 83.7% 4.3%,rgba(173,0,171,.72) 0,#0d3c71 90%)",
                    }}
                  >
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className=""
                    ></Box>
                    {/* <TabPanel value={valueTab} index={0}> */}
                    <div class="match_odds_table">
                      <div class="table-responsive-sm">
                        <table class="table table-borderless">
                          {/* {t1 != 0 ? ( */}
                          <tbody>
                            <tr>
                              <td class="min_width">
                                <div class="td1">
                                  <h4></h4>
                                  <p></p>
                                </div>
                              </td>
                              <td class="td_width display">
                                <div class="td_item tdbg1 dp">
                                  <h4></h4>
                                  <p></p>
                                </div>
                              </td>
                              <td class="td_width display">
                                <div class="td_item tdbg2 dp">
                                  <h4></h4>
                                  <p></p>
                                </div>
                              </td>
                              <td class="td_width">
                                <div class="td_item tdbg3">
                                  <h4>BACK</h4>
                                </div>
                              </td>
                              <td class="td_width">
                                <div class="td_item tdbg4">
                                  <h4>LAY</h4>
                                </div>
                              </td>
                              <td class="td_width display">
                                <div class="td_item tdbg5 dp">
                                  <h4></h4>
                                  <p></p>
                                </div>
                              </td>
                              <td class="td_width display">
                                <div class="td_item tdbg6 dp">
                                  <h4></h4>
                                  <p></p>
                                </div>
                              </td>
                            </tr>
                            {/* {t1.status == "SUSPENDED" ? (
                              <tr className="tr_data_2">{t1.status}</tr>
                            ) : (
                              <></>
                            )} */}
                            <tr>
                              <td class="min_width">
                                <div class="td1">
                                  <h4>{firstCountry?.runnerName}</h4>
                                  {/* <p>{u1t1}</p> */}
                                </div>
                              </td>
                              {isNaN(t1[2]?.price) || t1[2]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg1 tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t1[2]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t1[2]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t1[2]?.price}</h4>
                                    {t1[2]?.size < 1000 ? (
                                      <p>{t1[2]?.size}</p>
                                    ) : (
                                      <p>{(t1[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t1[1]?.price) || t1[1]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg2  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t1[1]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t1[1]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t1[1]?.price}</h4>
                                    {t1[1]?.size < 1000 ? (
                                      <p>{t1[1]?.size}</p>
                                    ) : (
                                      <p>{(t1[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t1[0]?.price) || t1[0]?.price == 0 ? (
                                <td class="td_width pp">
                                  <div class="td_item tdbg1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg3"
                                    onClick={() =>
                                      BetValue(
                                        t1[0]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t1[0]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t1[0]?.price}</h4>
                                    {t1[0]?.size < 1000 ? (
                                      <p>{t1[0]?.size}</p>
                                    ) : (
                                      <p>{(t1[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[0]?.price) || t2[0]?.price == 0 ? (
                                <td class="td_width pp1">
                                  <div class="td_item tdbg4">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg4"
                                    onClick={() =>
                                      BetValue(
                                        t2[0]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t2[0]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t2[0]?.price}</h4>
                                    {t2[0]?.size < 1000 ? (
                                      <p>{t2[0]?.size}</p>
                                    ) : (
                                      <p>{(t2[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[1]?.price) || t2[1]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg5  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t2[1]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t2[1]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t2[1]?.price}</h4>
                                    {isNaN(t2[1]?.size) ? (
                                      <p></p>
                                    ) : t2[1]?.size < 1000 ? (
                                      <p>{t2[1]?.size}</p>
                                    ) : (
                                      <p>{(t2[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t2[2]?.price) || t2[2]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg6  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t2[2]?.price,
                                        firstCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[0]?.selectionId,
                                        0,
                                        0,
                                        t2[2]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t2[2]?.price}</h4>
                                    {t2[2]?.size < 1000 ? (
                                      <p>{t2[2]?.size}</p>
                                    ) : (
                                      <p>{(t2[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                            </tr>
                            {/* {t2.status == "SUSPENDED" ? (
                              <tr className="tr_data_2">{t2.status}</tr>
                            ) : (
                              <></>
                            )} */}
                            <tr>
                              <td class="min_width">
                                <div class="td1">
                                  <h4>{secondCountry?.runnerName}</h4>
                                  {/* <p>{u2t2}</p> */}
                                </div>
                              </td>
                              {isNaN(t3[2]?.price) || t3[2]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg1 tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t3[2]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t3[2]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t3[2]?.price}</h4>
                                    {t3[2]?.size < 1000 ? (
                                      <p>{t3[2]?.size}</p>
                                    ) : (
                                      <p>{(t3[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t3[1]?.price) || t3[1]?.price == 0 ? (
                                <td class="td_width pp display">
                                  <div class="td_item tdbg1  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg2  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t3[1]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t3[1]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t3[1]?.price}</h4>
                                    {t3[1]?.size < 1000 ? (
                                      <p>{t3[1]?.size}</p>
                                    ) : (
                                      <p>{(t3[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t3[0]?.price) || t3[0]?.price == 0 ? (
                                <td class="td_width pp">
                                  <div class="td_item tdbg1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg3"
                                    onClick={() =>
                                      BetValue(
                                        t3[0]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "back",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t3[0]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t3[0]?.price}</h4>
                                    {t3[0]?.size < 1000 ? (
                                      <p>{t3[0]?.size}</p>
                                    ) : (
                                      <p>{(t3[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[0]?.price) || t4[0]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width">
                                  <div
                                    class="td_item tdbg4"
                                    onClick={() =>
                                      BetValue(
                                        t4[0]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t4[0]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t4[0]?.price}</h4>
                                    {t4[0]?.size < 1000 ? (
                                      <p>{t4[0]?.size}</p>
                                    ) : (
                                      <p>{(t4[0]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[1]?.price) || t4[1]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg5  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t4[1]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t4[1]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t4[1]?.price}</h4>
                                    {t4[1]?.size < 1000 ? (
                                      <p>{t4[1]?.size}</p>
                                    ) : (
                                      <p>{(t4[1]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                              {isNaN(t4[2]?.price) || t4[2]?.price == 0 ? (
                                <td class="td_width pp1 display">
                                  <div class="td_item tdbg4  tdw1">
                                    <h4></h4>
                                    <p></p>
                                  </div>
                                </td>
                              ) : (
                                <td class="td_width display">
                                  <div
                                    class="td_item tdbg6  tdw1"
                                    onClick={() =>
                                      BetValue(
                                        t4[2]?.price,
                                        secondCountry?.runnerName,
                                        "MATCH_ODDS",
                                        "lay",
                                        oddBet[1]?.selectionId,
                                        0,
                                        0,
                                        t4[2]?.size,
                                        "100",
                                        "1500000"
                                      )
                                    }
                                  >
                                    <h4>{t4[2]?.price}</h4>
                                    {t4[2]?.size < 1000 ? (
                                      <p>{t4[2]?.size}</p>
                                    ) : (
                                      <p>{(t4[2]?.size / 1000).toFixed(1)}K</p>
                                    )}
                                  </div>
                                </td>
                              )}
                            </tr>
                          </tbody>{" "}
                          {/* ) : (
                            <>
                              <p>No real-time records found</p>
                            </>
                          )} */}
                        </table>
                      </div>
                    </div>
                    {/* <!----===============Book maker row=================-----> */}
                    <div class="row">
                      <div class="col-md-12">
                        <div class="bars_bg">
                          <div class="row">
                            <div class="col-md-6 width1">
                              <div class="section_heading">
                                <h2>Bookmaker Market </h2>
                              </div>
                            </div>
                            <div class="col-md-6 width2">
                              <div class="section_heading">
                                <h3>
                                  <i
                                    class="fa fa-info-circle"
                                    onclick="openNav10()"
                                  ></i>
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="match_odds_table">
                          <div class="table-responsive-sm">
                            <table class="col-md-6 table table-borderless">
                              {t4 != 0 ? (
                                <tbody>
                                  <tr>
                                    <td class="min_width">
                                      <div class="td1">
                                        <h4 class="txt_color">
                                          Min: {Math.round(maxValue.min)} Max:{" "}
                                          {Math.round(maxValue.max / 1000)}K
                                        </h4>
                                      </div>
                                    </td>
                                    <td class="td_width display">
                                      <div class="td_item tdbg1 dp">
                                        <h4></h4>
                                      </div>
                                    </td>
                                    <td class="td_width display">
                                      <div class="td_item tdbg2 dp">
                                        <h4></h4>
                                      </div>
                                    </td>
                                    <td class="td_width">
                                      <div class="td_item tdbg3">
                                        <h4>BACK</h4>
                                      </div>
                                    </td>
                                    <td class="td_width">
                                      <div class="td_item tdbg4">
                                        <h4>LAY</h4>
                                      </div>
                                    </td>
                                    <td class="td_width display">
                                      <div class="td_item tdbg5 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                    <td class="td_width display">
                                      <div class="td_item tdbg6 dp">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  </tr>
                                  {bookSuspend.status == "SUSPENDED" ? (
                                    <tr className="tr_data">
                                      {bookSuspend.status}
                                    </tr>
                                  ) : (
                                    <></>
                                  )}
                                  <tr>
                                    {/* <td className="tr_data"></td> */}
                                    <td class="min_width">
                                      <div class="td1">
                                        <h4>{firstCountry?.runnerName}</h4>
                                        {/* <p>{u2t3}</p> */}
                                      </div>
                                    </td>

                                    {isNaN(t5[2]?.price1) ||
                                    t5[2]?.price1 == 0 ? (
                                      <td class="td_width pp display">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg1"
                                          onClick={() =>
                                            BetValue(
                                              t5[2]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t5[2]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t5[2]?.price1}</h4>
                                          {t5[2]?.size < 1000 ? (
                                            <p>{t5[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t5[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>{" "}
                                      </td>
                                    )}
                                    {isNaN(t5[1]?.price1) ||
                                    t5[1]?.price1 == 0 ? (
                                      <td class="td_width pp display">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg2"
                                          onClick={() =>
                                            BetValue(
                                              t5[1]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t5[1]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t5[1]?.price1}</h4>
                                          {t5[1]?.size < 1000 ? (
                                            <p>{t5[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t5[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t5[0]?.price1) ||
                                    t5[0]?.price1 == 0 ? (
                                      <td class="td_width pp">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width">
                                        <div
                                          class="td_item tdbg3"
                                          onClick={() =>
                                            BetValue(
                                              t5[0]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t5[0]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t5[0]?.price1}</h4>

                                          {t5[0]?.size < 1000 ? (
                                            <p>{t5[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t5[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t6[0]?.price1) ||
                                    t6[0]?.price1 == 0 ? (
                                      <td class="td_width pp1">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width">
                                        <div
                                          class="td_item tdbg4"
                                          onClick={() =>
                                            BetValue(
                                              t6[0]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t6[0]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t6[0]?.price1}</h4>

                                          {t6[0]?.size < 1000 ? (
                                            <p>{t6[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t6[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t6[1]?.price1) ||
                                    t6[1]?.price1 == 0 ? (
                                      <td class="td_width pp1 display">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg5"
                                          onClick={() =>
                                            BetValue(
                                              t6[1]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t6[1]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t6[1]?.price1}</h4>
                                          {isNaN(t6[1]?.price1) ? (
                                            <p></p>
                                          ) : t6[1]?.size < 1000 ? (
                                            <p>{t6[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t6[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t6[2]?.price1) ||
                                    t6[2]?.price1 == 0 ? (
                                      <td class="td_width pp1 display">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg6"
                                          onClick={() =>
                                            BetValue(
                                              t6[2]?.price1,
                                              firstCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend.selectionId,
                                              0,
                                              0,
                                              t6[2]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t6[2]?.price1}</h4>
                                          {t6[2]?.size < 1000 ? (
                                            <p>{t6[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t6[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                  {bookSuspend1.status == "SUSPENDED" ? (
                                    <tr className="tr_data">
                                      {bookSuspend1.status}
                                    </tr>
                                  ) : (
                                    <></>
                                  )}
                                  <tr>
                                    <td class="min_width">
                                      <div class="td1">
                                        <h4>{secondCountry?.runnerName}</h4>
                                        {/* <p>{u2t1}</p> */}
                                      </div>
                                    </td>
                                    {isNaN(t7[2]?.price1) ||
                                    t7[2]?.price1 == 0 ? (
                                      <td class="td_width pp display">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg1"
                                          onClick={() =>
                                            BetValue(
                                              t7[2]?.price1,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend1.selectionId,
                                              0,
                                              0,
                                              t7[2]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t7[2]?.price1}</h4>
                                          {t7[2]?.size < 1000 ? (
                                            <p>{t7[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t7[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t7[1]?.price1) ||
                                    t7[1]?.price1 == 0 ? (
                                      <td class="td_width pp display">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg2"
                                          onClick={() =>
                                            BetValue(
                                              t7[1]?.price,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend1.selectionId,
                                              0,
                                              0,
                                              t7[1]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t7[1]?.price}</h4>
                                          {t7[1]?.size < 1000 ? (
                                            <p>{t7[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t7[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t7[0]?.price1) ||
                                    t7[0]?.price1 == 0 ? (
                                      <td class="td_width pp">
                                        <div class="td_item tdbg1">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width">
                                        <div
                                          class="td_item tdbg3"
                                          onClick={() =>
                                            BetValue(
                                              t7[0]?.price1,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "back",
                                              bookSuspend1.selectionId,
                                              0,
                                              0,
                                              t7[0]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t7[0]?.price1}</h4>

                                          {t7[0]?.size < 1000 ? (
                                            <p>{t7[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t7[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t8[0]?.price1) ||
                                    t8[0]?.price1 == 0 ? (
                                      <td class="td_width pp1">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width">
                                        <div
                                          class="td_item tdbg4"
                                          onClick={() =>
                                            BetValue(
                                              t8[0]?.price1,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend1.selectionId,
                                              0,
                                              0,
                                              t8[0]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t8[0]?.price1}</h4>
                                          {t8[0]?.size < 1000 ? (
                                            <p>{t8[0]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t8[0]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t8[1]?.price1) ||
                                    t8[1]?.price1 == 0 ? (
                                      <td class="td_width pp1 display">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg5"
                                          onClick={() =>
                                            BetValue(
                                              t8[1]?.price1,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend1.selectionId,
                                              0,
                                              0,
                                              t8[1]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t8[1]?.price1}</h4>
                                          {t8[1]?.size < 1000 ? (
                                            <p>{t8[1]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t8[1]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {isNaN(t8[2]?.price1) ||
                                    t8[2]?.price1 == 0 ? (
                                      <td class="td_width pp1 display">
                                        <div class="td_item tdbg4">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    ) : (
                                      <td class="td_width display">
                                        <div
                                          class="td_item tdbg6"
                                          onClick={() =>
                                            BetValue(
                                              t8[2]?.price1,
                                              secondCountry?.runnerName,
                                              "Bookmaker Market",
                                              "lay",
                                              bookSuspend1.selectionId,
                                              0,
                                              "",
                                              t8[2]?.size,
                                              maxValue.min,
                                              maxValue.max
                                            )
                                          }
                                        >
                                          <h4>{t8[2]?.price1}</h4>
                                          {t8[2]?.size < 1000 ? (
                                            <p>{t8[2]?.size}</p>
                                          ) : (
                                            <p>
                                              {(t8[2]?.size / 1000).toFixed(1)}K
                                            </p>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              ) : (
                                <>
                                  <p>No real-time records found</p>
                                </>
                              )}
                            </table>
                          </div>
                          <div class="match_discription">
                            <p>{remark1}</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* <!----===============session market row=================-----> */}
                    <div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="bars_bg">
                            <div class="row">
                              <div class="col-md-6 width1">
                                <div class="section_heading">
                                  <h2>Session Market</h2>
                                </div>
                              </div>
                              <div class="col-md-6 width2">
                                <div class="section_heading">
                                  <h3>
                                    <i
                                      class="fa fa-info-circle"
                                      onclick="openNav10()"
                                    ></i>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="match_odds_table">
                            <div class="table-responsive-sm">
                              <table class="table table-borderless">
                                {data.message == "Match score fetched." ? (
                                  <>
                                    {" "}
                                    <p>No real-time records found</p>
                                  </>
                                ) : (
                                  <tbody>
                                    <tr>
                                      <td class="min_width">
                                        <div class="td1">
                                          <h4>&nbsp;</h4>
                                        </div>
                                      </td>
                                      <td class="min_width">
                                        <div class="td1">
                                          <h4>&nbsp;</h4>
                                        </div>
                                      </td>

                                      <td class="td_width">
                                        <div class="td_item tdbg4">
                                          <h4>No</h4>
                                        </div>
                                      </td>
                                      <td class="td_width">
                                        <div class="td_item tdbg3">
                                          <h4>Yes</h4>
                                        </div>
                                      </td>
                                      <td class="td_width display">
                                        <div class="td_item bd">
                                          <h4>&nbsp;</h4>
                                        </div>
                                      </td>
                                    </tr>

                                    {data?.map((item, index) => {
                                      if (item.ballsess == "1") {
                                        return (
                                          <tr>
                                            <tr>
                                              {item.GameStatus ==
                                              "SUSPENDED" ? (
                                                <tr className=" tr_data_3">
                                                  {item.GameStatus}
                                                </tr>
                                              ) : item.GameStatus ==
                                                "Ball Running" ? (
                                                <>
                                                  {" "}
                                                  <tr className=" tr_data_3">
                                                    {item.GameStatus}
                                                  </tr>
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </tr>
                                            <td class="min_width">
                                              <div class="td1">
                                                <h4>{item.RunnerName}</h4>
                                                <p>{item.utime}</p>
                                              </div>
                                            </td>
                                            {item.LayPrice1 != 0.0 ? (
                                              <td class="td_width">
                                                <div
                                                  class="td_item tdbg4"
                                                  onClick={() =>
                                                    BetValue(
                                                      item.LayPrice1,
                                                      item.RunnerName,
                                                      "Session Market",
                                                      "lay",
                                                      item.SelectionId,
                                                      item.sr_no,
                                                      item.ballsess,
                                                      item.LaySize1,
                                                      item.min,
                                                      item.max,
                                                      item.LayPrice1,
                                                      item.LaySize1,
                                                      item.BackPrice1,
                                                      item.BackSize1,
                                                      item.gtype
                                                    )
                                                  }
                                                >
                                                  <h4>
                                                    {Math.round(item.LayPrice1)}
                                                  </h4>
                                                  <p>
                                                    {Math.round(item.LaySize1)}
                                                  </p>
                                                </div>
                                              </td>
                                            ) : (
                                              <td class="td_width pp1">
                                                <div class="td_item tdbg4">
                                                  <h4></h4>
                                                  <p></p>
                                                </div>
                                              </td>
                                            )}
                                            {item.BackPrice1 != 0.0 ? (
                                              <td class="td_width">
                                                <div
                                                  class="td_item tdbg3"
                                                  onClick={() =>
                                                    BetValue(
                                                      item.BackPrice1,
                                                      item.RunnerName,
                                                      "Session Market",
                                                      "back",
                                                      item.SelectionId,
                                                      item.sr_no,
                                                      item.ballsess,
                                                      item.BackSize1,
                                                      item.min,
                                                      item.max,
                                                      item.LayPrice1,
                                                      item.LaySize1,
                                                      item.BackPrice1,
                                                      item.BackSize1,
                                                      item.gtype
                                                    )
                                                  }
                                                >
                                                  <h4>
                                                    {Math.round(
                                                      item.BackPrice1
                                                    )}
                                                  </h4>
                                                  <p>
                                                    {Math.round(item.BackSize1)}
                                                  </p>
                                                </div>
                                              </td>
                                            ) : (
                                              <td class="td_width pp">
                                                <div class="td_item tdbg1">
                                                  <h4></h4>
                                                  <p></p>
                                                </div>
                                              </td>
                                            )}
                                            <td class="td_width display">
                                              <div class="td_item bd">
                                                <h4>
                                                  Min:{Math.round(item.min)}
                                                </h4>
                                                <p>
                                                  Max:
                                                  {Math.round(item.max / 1000)}K
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      } else {
                                        return null; // Return null if age is less than or equal to 18
                                      }
                                    })}
                                  </tbody>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="bars_bg">
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="section_heading">
                                      <h2>Over by Over Session Market</h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="match_odds_table">
                                <div class="table-responsive-sm">
                                  <table class="table table-borderless">
                                    {data.message == "Match score fetched." ? (
                                      <>
                                        {" "}
                                        <p>No real-time records found</p>
                                      </>
                                    ) : (
                                      <tbody>
                                        <tr>
                                          <td class="min_width">
                                            <div class="td1">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>
                                          <td class="min_width">
                                            <div class="td1">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>
                                          <td class="td_width">
                                            <div class="td_item tdbg4 rc1">
                                              <h4>No</h4>
                                            </div>
                                          </td>
                                          <td class="td_width">
                                            <div class="td_item tdbg3">
                                              <h4>Yes</h4>
                                            </div>
                                          </td>
                                          <td class="td_width display">
                                            <div class="td_item bd">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>
                                        </tr>

                                        {data?.map((item, index) => {
                                          if (item.ballsess == "2") {
                                            return (
                                              <tr>
                                                <tr>
                                                  {item.GameStatus ==
                                                  "SUSPENDED" ? (
                                                    <tr className="tr_data_3">
                                                      {item.GameStatus}
                                                    </tr>
                                                  ) : item.GameStatus ==
                                                    "Ball Running" ? (
                                                    <>
                                                      {" "}
                                                      <tr className="tr_data_3">
                                                        {item.GameStatus}
                                                      </tr>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </tr>
                                                <td class="min_width">
                                                  <div class="td1">
                                                    <h4>{item.RunnerName}</h4>
                                                    <p>{item.utime}</p>
                                                  </div>
                                                </td>
                                                {item.LayPrice1 != 0.0 ? (
                                                  <td class="td_width">
                                                    <div
                                                      class="td_item tdbg4"
                                                      onClick={() =>
                                                        BetValue(
                                                          item.LayPrice1,
                                                          item.RunnerName,
                                                          "Over by Over Session Market",
                                                          "lay",
                                                          item.SelectionId,
                                                          item.sr_no,
                                                          item.ballsess,
                                                          item.LaySize1,
                                                          item.min,
                                                          item.max,
                                                          item.LayPrice1,
                                                          item.LaySize1,
                                                          item.BackPrice1,
                                                          item.BackSize1,
                                                          item.gtype
                                                        )
                                                      }
                                                    >
                                                      <h4>
                                                        {Math.round(
                                                          item.LayPrice1
                                                        )}
                                                      </h4>
                                                      <p>
                                                        {Math.round(
                                                          item.LaySize1
                                                        )}
                                                      </p>

                                                      {/* <h4>{item.b1}</h4>
                                                    <p>{item.bs1}</p> */}
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td class="td_width pp">
                                                    <div class="td_item tdbg1">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                )}
                                                {item.BackPrice1 != 0.0 ? (
                                                  <td class="td_width">
                                                    <div
                                                      class="td_item tdbg3"
                                                      onClick={() =>
                                                        BetValue(
                                                          item.BackPrice1,
                                                          item.RunnerName,
                                                          "Over by Over Session Market",
                                                          "back",
                                                          item.SelectionId,
                                                          item.sr_no,
                                                          item.ballsess,
                                                          item.BackSize1,
                                                          item.min,
                                                          item.max,
                                                          item.LayPrice1,
                                                          item.LaySize1,
                                                          item.BackPrice1,
                                                          item.BackSize1,
                                                          item.gtype
                                                        )
                                                      }
                                                    >
                                                      <h4>
                                                        {Math.round(
                                                          item.BackPrice1
                                                        )}
                                                      </h4>
                                                      <p>
                                                        {Math.round(
                                                          item.BackSize1
                                                        )}
                                                      </p>

                                                      {/* <h4>{item.l1}</h4>
                                                    <p>{item.ls1}</p> */}
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td class="td_width pp1">
                                                    <div class="td_item tdbg4">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                )}
                                                <td class="td_width display">
                                                  <div class="td_item bd">
                                                    <h4>
                                                      Min:
                                                      {Math.round(item.min)}
                                                    </h4>
                                                    <p>
                                                      Max:
                                                      {Math.round(
                                                        item.max / 1000
                                                      )}
                                                      K
                                                    </p>
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          } else {
                                            return null; // Return null if age is less than or equal to 18
                                          }
                                        })}
                                      </tbody>
                                    )}
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="bars_bg">
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="section_heading">
                                      <h2>Ball by Ball Session Market</h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="match_odds_table">
                                <div class="table-responsive-sm">
                                  <table class="table table-borderless">
                                    {data.message == "Match score fetched." ? (
                                      <>
                                        {" "}
                                        <p>No real-time records found</p>
                                      </>
                                    ) : (
                                      <tbody>
                                        <tr>
                                          <td class="min_width">
                                            <div class="td1">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>

                                          <td class="min_width">
                                            <div class="td1">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>

                                          <td class="td_width">
                                            <div class="td_item tdbg4 rc1">
                                              <h4>No</h4>
                                            </div>
                                          </td>
                                          <td class="td_width">
                                            <div class="td_item tdbg3">
                                              <h4>Yes</h4>
                                            </div>
                                          </td>
                                          <td class="td_width display">
                                            <div class="td_item bd">
                                              <h4>&nbsp;</h4>
                                            </div>
                                          </td>
                                        </tr>
                                        {data?.map((item, index) => {
                                          if (item.ballsess == "3") {
                                            return (
                                              <tr>
                                                <tr>
                                                  {item.GameStatus ==
                                                  "SUSPENDED" ? (
                                                    <tr className="tr_data_4">
                                                      {item.GameStatus}
                                                    </tr>
                                                  ) : item.GameStatus ==
                                                    "Ball Running" ? (
                                                    <>
                                                      {" "}
                                                      <tr className="tr_data_4">
                                                        {item.GameStatus}
                                                      </tr>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </tr>
                                                <td class="min_width">
                                                  <div class="td1">
                                                    <h4>{item.RunnerName}</h4>
                                                    <p>{item.utime}</p>
                                                  </div>
                                                </td>
                                                {item.BackPrice1 != 0.0 ? (
                                                  <td class="td_width">
                                                    <div
                                                      class="td_item tdbg4"
                                                      onClick={() =>
                                                        BetValue(
                                                          item.BackPrice1,
                                                          item.RunnerName,
                                                          "Ball by Ball Session Market",
                                                          "lay",
                                                          item.SelectionId,
                                                          item.sr_no,
                                                          item.ballsess,
                                                          item.LaySize1,
                                                          item.min,
                                                          item.max,
                                                          item.LayPrice1,
                                                          item.LaySize1,
                                                          item.BackPrice1,
                                                          item.BackSize1,
                                                          item.gtype
                                                        )
                                                      }
                                                    >
                                                      <h4>
                                                        {Math.round(
                                                          item.BackPrice1
                                                        )}
                                                      </h4>
                                                      <p>
                                                        {Math.round(
                                                          item.BackSize1
                                                        )}
                                                      </p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td class="td_width pp">
                                                    <div class="td_item tdbg4">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                )}
                                                {item.LayPrice1 != 0.0 ? (
                                                  <td class="td_width">
                                                    <div
                                                      class="td_item tdbg3"
                                                      onClick={() =>
                                                        BetValue(
                                                          item.LayPrice1,
                                                          item.RunnerName,
                                                          "Ball by Ball Session Market",
                                                          "back",
                                                          item.SelectionId,
                                                          item.sr_no,
                                                          item.ballsess,
                                                          item.BackSize1,
                                                          item.min,
                                                          item.max,
                                                          item.LayPrice1,
                                                          item.LaySize1,
                                                          item.BackPrice1,
                                                          item.BackSize1,
                                                          item.gtype
                                                        )
                                                      }
                                                    >
                                                      <h4>
                                                        {Math.round(
                                                          item.LayPrice1
                                                        )}
                                                      </h4>
                                                      <p>
                                                        {Math.round(
                                                          item.LaySize1
                                                        )}
                                                      </p>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td class="td_width pp1">
                                                    <div class="td_item tdbg1">
                                                      <h4></h4>
                                                      <p></p>
                                                    </div>
                                                  </td>
                                                )}
                                                <td class="td_width display">
                                                  <div class="td_item bd">
                                                    <h4>
                                                      Min:
                                                      {Math.round(item.min)}
                                                    </h4>
                                                    <p>
                                                      Max:
                                                      {Math.round(
                                                        item.max / 1000
                                                      )}
                                                      K
                                                    </p>
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          } else {
                                            return null; // Return null if age is less than or equal to 18
                                          }
                                        })}
                                      </tbody>
                                    )}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* // data missing */}
                    </div>
                  </Box>
                </div>
              </div>

              <div class="col-md-4 bet_icon ">
                <div class="section_bg" id="bettingSection">
                  <div class="bars_bg live_stream">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="section_heading">
                          <h2>Live Match</h2>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="section_heading" id="video_tab">
                          <p>
                            <i class="fa fa-television"></i> live stream started
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="live_video video_tab_pan"
                    style={{ display: "none" }}
                  >
                    <iframe
                      allowfullscreen="true"
                      style={{
                        width: "100%",
                        height: "210px",
                        border: "none",
                        opacity: "1",
                        visibility: "visible",
                      }}
                      id="frame_video"
                      src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${id}`}
                    ></iframe>
                  </div>
                  {back == "back" ? (
                    <div class="Back_color bars_bg ngb1" ref={popupRef}>
                      <div class="row">
                        <div class="card m-b-10 place-bet" id="betting_data">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6 class="card-title d-inline-block ">
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <div>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            // autocomplete="off"
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.000
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("2000")}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : back == "lay" ? (
                    <div class="Lay_color bars_bg ngb1" ref={popupRef}>
                      <div class="row">
                        <div class="card m-b-10 place-bet " id="betting_data">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6
                              class="card-title d-inline-block 
                            "
                            >
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <>
                              <input
                                type="hidden"
                                id="back-lay"
                                value=""
                                class="ng-tns-c85-1"
                              />
                              <ngx-spinner
                                bdcolor="rgba(51,51,51,0.8)"
                                size="medium"
                                color="#fff"
                                type="ball-scale-multiple"
                                _nghost-hvs-c75=""
                                class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                              ></ngx-spinner>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            // autocomplete="off"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.00
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("2000")}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      class="dp_none bars_bg"
                      ref={popupRef}
                      id="betting_data"
                    >
                      <div class="row">
                        <div class="card m-b-10 place-bet " id="betting_data">
                          <div _ngcontent-hvs-c85="" class="card-header ">
                            <h6 class="card-title d-inline-block ">
                              Place Bet
                            </h6>
                          </div>
                          {showPopup ? (
                            <>
                              <input
                                type="hidden"
                                id="back-lay"
                                value=""
                                class="ng-tns-c85-1"
                              />
                              <ngx-spinner
                                bdcolor="rgba(51,51,51,0.8)"
                                size="medium"
                                color="#fff"
                                type="ball-scale-multiple"
                                _nghost-hvs-c75=""
                                class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                              ></ngx-spinner>
                              <div
                                class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                style={{ paddingBottom: "4px;" }}
                              >
                                {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                  <thead
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <th
                                        style={{
                                          width: "35%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        (Bet for)
                                      </th>
                                      <th
                                        style={{
                                          width: "25%",
                                          textAlign: "left;",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        odds{" "}
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          textAlign: "left",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        Stake
                                      </th>
                                      <th
                                        id="profit-head"
                                        style={{
                                          width: "15%",
                                          textAlign: "right",
                                        }}
                                        class="ng-tns-c85-1"
                                      >
                                        {" "}
                                        Profit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    _ngcontent-hvs-c85=""
                                    class="ng-tns-c85-1"
                                  >
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        id="team_nm"
                                        class=" country_color ng-tns-c85-1"
                                      >
                                        {country}
                                      </td>
                                      <td
                                        style={{ width: "75px" }}
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group ng-tns-c85-1">
                                          <input
                                            placeholder="0"
                                            name="odds"
                                            type="text"
                                            required=""
                                            value={dataValue}
                                            id="odds"
                                            readonly=""
                                            class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            style={{
                                              width: "45px",
                                              verticalAlign: "middle",
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <div class="form-group bet-stake ng-tns-c85-1">
                                          <input
                                            id="btn_val"
                                            required=""
                                            value={betValue}
                                            type="text"
                                            // autocomplete="off"
                                            onChange={(e) =>
                                              setbetValue(e.target.value)
                                            }
                                            style={{ width: "82px" }}
                                            class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                          />
                                        </div>
                                      </td>
                                      <td
                                        id="prft"
                                        class="text-right ng-tns-c85-1 ng-star-inserted"
                                        style={{ color: "#fff" }}
                                      >
                                        {" "}
                                        0.00
                                      </td>
                                    </tr>
                                    <tr
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <td
                                        colspan="5"
                                        class="value-buttons ng-tns-c85-1"
                                        style={{ padding: "5px;" }}
                                      >
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick("1000")}
                                          value="1000"
                                        >
                                          1000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={() => handleClick(2000)}
                                          value="2000"
                                        >
                                          2000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) => handleClick(5000)}
                                          value="5000"
                                        >
                                          5000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(10000)
                                          }
                                          value="10000"
                                        >
                                          10000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(20000)
                                          }
                                          value="20000"
                                        >
                                          20000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(50000)
                                          }
                                          value="50000"
                                        >
                                          50000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(100000)
                                          }
                                          value="100000"
                                        >
                                          100000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(250000)
                                          }
                                          value="250000"
                                        >
                                          250000
                                        </button>
                                        <button
                                          class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                          onClick={(value) =>
                                            handleClick(500000)
                                          }
                                          value="500000"
                                        >
                                          500000
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  _ngcontent-hvs-c85=""
                                  class="col-md-12 ng-tns-c85-1"
                                >
                                  <button
                                    type=""
                                    onClick={handleReset}
                                    class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                  >
                                    Reset
                                  </button>
                                  <button
                                    type="submit"
                                    id="submit_btn"
                                    onClick={() => Live_Bet_Api()}
                                    class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    id="tmp_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_section_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    id="bet_market_id"
                                    type="hidden"
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                  <input
                                    type="hidden"
                                    id="lst_update_lambi"
                                    value=""
                                    class="ng-tns-c85-1"
                                  />
                                </div>
                                {/* </form> */}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <button onClick={openModal}>Open Popup</button> */}
                  <Modal
                    isOpen={modalIsOpen}
                    className="mobile_popup"
                    onRequestClose={closeModal}
                  >
                    {back == "back" ? (
                      <div class="Back_color bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet " id="betting_data">
                            <div _ngcontent-hvs-c85="" class="card-header ">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                              <button
                                onClick={closeModal}
                                className="close_button"
                              >
                                <img
                                  src="assets/images/xmark-solid.svg"
                                  width="100%"
                                  alt=""
                                />
                              </button>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick(2000)}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : back == "lay" ? (
                      <div class="Lay_color bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet " id="betting_data">
                            <div _ngcontent-hvs-c85="" class="card-header ">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                              <button
                                onClick={closeModal}
                                className="close_button"
                              >
                                <img
                                  src="assets/images/xmark-solid.svg"
                                  width="100%"
                                  alt=""
                                />
                              </button>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("2000")}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div class="dp_none bars_bg">
                        <div class="row">
                          <div class="card m-b-10 place-bet " id="betting_data">
                            <div _ngcontent-hvs-c85="" class="card-header">
                              <h6 class="card-title d-inline-block ">
                                Place Bet
                              </h6>
                            </div>
                            {showPopup ? (
                              <>
                                <input
                                  type="hidden"
                                  id="back-lay"
                                  value=""
                                  class="ng-tns-c85-1"
                                />
                                <ngx-spinner
                                  bdcolor="rgba(51,51,51,0.8)"
                                  size="medium"
                                  color="#fff"
                                  type="ball-scale-multiple"
                                  _nghost-hvs-c75=""
                                  class="ng-tns-c75-2 ng-tns-c85-1 ng-star-inserted"
                                ></ngx-spinner>
                                <div
                                  class="card-body table-responsive hide-box-click ng-tns-c85-1 back-color ng-star-inserted"
                                  style={{ paddingBottom: "4px;" }}
                                >
                                  {/* <form _ngcontent-hvs-c85="" novalidate="" method="post" id="frm_placebet" action="" class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid" /> */}

                                  <table class="coupon-table table table-borderedless ng-tns-c85-1">
                                    <thead
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <th
                                          style={{
                                            width: "35%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          (Bet for)
                                        </th>
                                        <th
                                          style={{
                                            width: "25%",
                                            textAlign: "left;",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          odds{" "}
                                        </th>
                                        <th
                                          style={{
                                            width: "15%",
                                            textAlign: "left",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          Stake
                                        </th>
                                        <th
                                          id="profit-head"
                                          style={{
                                            width: "15%",
                                            textAlign: "right",
                                          }}
                                          class="ng-tns-c85-1"
                                        >
                                          {" "}
                                          Profit{" "}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      _ngcontent-hvs-c85=""
                                      class="ng-tns-c85-1"
                                    >
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          id="team_nm"
                                          class=" country_color ng-tns-c85-1"
                                        >
                                          {country}
                                        </td>
                                        <td
                                          style={{ width: "75px" }}
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group ng-tns-c85-1">
                                            <input
                                              placeholder="0"
                                              name="odds"
                                              type="text"
                                              required=""
                                              value={dataValue}
                                              id="odds"
                                              readonly=""
                                              class="amountint ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                              style={{
                                                width: "45px",
                                                verticalAlign: "middle",
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td
                                          _ngcontent-hvs-c85=""
                                          class="ng-tns-c85-1"
                                        >
                                          <div class="form-group bet-stake ng-tns-c85-1">
                                            <input
                                              id="btn_val"
                                              required=""
                                              value={betValue}
                                              type="text"
                                              // autocomplete="off"
                                              onChange={(e) =>
                                                setbetValue(e.target.value)
                                              }
                                              style={{ width: "82px" }}
                                              class="ng-tns-c85-1 ng-untouched ng-pristine ng-valid"
                                            />
                                          </div>
                                        </td>
                                        <td
                                          id="prft"
                                          class="text-right ng-tns-c85-1 ng-star-inserted"
                                          style={{ color: "#fff" }}
                                        >
                                          {" "}
                                          0.00
                                        </td>
                                      </tr>
                                      <tr
                                        _ngcontent-hvs-c85=""
                                        class="ng-tns-c85-1"
                                      >
                                        <td
                                          colspan="5"
                                          class="value-buttons ng-tns-c85-1"
                                          style={{ padding: "5px;" }}
                                        >
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("1000")}
                                            value="1000"
                                          >
                                            1000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={() => handleClick("2000")}
                                            value="2000"
                                          >
                                            2000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(5000)
                                            }
                                            value="5000"
                                          >
                                            5000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(10000)
                                            }
                                            value="10000"
                                          >
                                            10000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(20000)
                                            }
                                            value="20000"
                                          >
                                            20000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(50000)
                                            }
                                            value="50000"
                                          >
                                            50000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(100000)
                                            }
                                            value="100000"
                                          >
                                            100000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(250000)
                                            }
                                            value="250000"
                                          >
                                            250000
                                          </button>
                                          <button
                                            class="btn btn-success btn_dyn ng-tns-c85-1 ng-star-inserted"
                                            onClick={(value) =>
                                              handleClick(500000)
                                            }
                                            value="500000"
                                          >
                                            500000
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    _ngcontent-hvs-c85=""
                                    class="col-md-12 ng-tns-c85-1"
                                  >
                                    <button
                                      type=""
                                      onClick={handleReset}
                                      class="btn btn-sm btn-danger float-left ng-tns-c85-1"
                                    >
                                      Reset
                                    </button>
                                    <button
                                      type="submit"
                                      id="submit_btn"
                                      onClick={() => Live_Bet_Api()}
                                      class="btn btn-sm btn-success float-right ng-tns-c85-1"
                                    >
                                      Submit
                                    </button>
                                    <input
                                      id="tmp_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_section_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      id="bet_market_id"
                                      type="hidden"
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                    <input
                                      type="hidden"
                                      id="lst_update_lambi"
                                      value=""
                                      class="ng-tns-c85-1"
                                    />
                                  </div>
                                  {/* </form> */}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </Modal>

                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div
                            class="section_heading"
                            style={{ display: "flex" }}
                          >
                            <h2>My Bet</h2>
                            <a
                              className="Bet_button btn"
                              href="/Bet_History_Drop"
                            >
                              Bet History
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mybet_table">
                      <div
                        class="table-responsive"
                        style={{
                          overflowY: "scroll",
                          overflowX: "hidden",
                          maxHeight: "400px",
                        }}
                      >
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Matched Bet</th>
                              <th>Odds</th>
                              <th>Result</th>
                              <th>Stake</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData?.map((item) => (
                              <tr key={item.id}>
                                <td>{item.team}</td>
                                <td>{item.type}</td>
                                {item.status == "1" ? (
                                  <td>
                                    {item.MatchStatus == "0" ? (
                                      <div className="result2">-</div>
                                    ) : (
                                      <div className="result1">+</div>
                                    )}
                                  </td>
                                ) : (
                                  <td>
                                    <div className="result5">.</div>
                                  </td>
                                )}
                                <td>{item.stake}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-----=======body section end=========----> */}
      </main>
    </div>
  );
}

export default Live_Matches;
