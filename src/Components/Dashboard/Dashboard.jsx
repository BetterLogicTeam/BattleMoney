import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import moment from "moment/moment";
import "./Dashboard.css";
import tv from "./tv-solid.svg";
import Sidebar from "./Sidebar";
import cricket from "../../icoons/cricket.png";
import football from "../../icoons/football.png";
import tennis from "../../icoons/tennis.png";
import table_tennis from "../../icoons/table_tennis.png";
import basketball from "../../icoons/basketball.png";
import volleyball from "../../icoons/volleyball.png";
import snooker from "../../icoons/snooker.png";
import politics from "../../icoons/politics.png";
import cycling from "../../icoons/cycling.png";
import horse_racing from "../../icoons/horse_racing.png";
import greyhound_racing from "../../icoons/greyhound_racing.png";
import ice_hockey from "../../icoons/ice_hockey.png";
import boxing from "../../icoons/boxing.png";
import mixed_martial_art from "../../icoons/mixed_martial_art.png";
import moto_gp from "../../icoons/moto_gp.png";
import rugby_league from "../../icoons/rugby_league.png";
import e_games from "../../icoons/e_games.png";
import futsal from "../../icoons/futsal.png";
import handball from "../../icoons/handball.png";
import kabaddi from "../../icoons/kabaddi.png";
import beach_volleyball from "../../icoons/beach_volleyball.png";
import golf from "../../icoons/golf.png";
import chess from "../../icoons/chess.png";
import moterbikes from "../../icoons/moterbikes.png";
import badminton from "../../icoons/badminton.png";
import athelitics from "../../icoons/athelitics.png";
import sumo from "../../icoons/sumo.png";
import virtual_sports from "../../icoons/virtual_sports.png";
import motor_sports from "../../icoons/motor_sports.png";
import baseball from "../../icoons/baseball.png";
import rugby_union from "../../icoons/rugby_union.png";
import dart from "../../icoons/dart.png";
import american_football from "../../icoons/american_football.png";
import soccer from "../../icoons/soccer.png";
import boat_racing from "../../icoons/boat_racing.png";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import Vertical from "../Vertical/Vertical";
import Vertical2 from "../Vertical2/Vertical2";
import { IoIosTennisball } from "react-icons/io";
import { FaBasketballBall } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { BiFootball } from "react-icons/bi";
import DashboardMatch_Slider from "../DashboardMatch_Slider/DashboardMatch_Slider";
import DashboardMatchDetail_Tab from "../DashboardMatchDetail_Tab/DashboardMatchDetail_Tab";
import logo from "../Assets/battle_money.png";

//import io from "socket.io-client";

// const SOCKET_URL = "https://live-game-api.nakshtech.info";

function Dashboard() {
  let { name, type } = useParams();
  const [data, setData] = useState([]);

  const [cricketMatches, setCricketMatches] = useState([]);
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  // const [eventCatagorydata, seteventCatagory] = useState([]);
  const [event_Type, setevent_Type] = useState(0);
  const [event_name, setevent_name] = useState("");
  let navigate = useNavigate();

  const Live_Match_Api = async () => {
    try {
      let res = await axios.get(
        `http://live-game-api.nakshtech.info/getcricketmatches`
      );
      res = res.data.data;
      let data = res;
      console.log("setCricketMatches", data);
      setCricketMatches(data);
      setData(data);
    } catch (e) {
      console.log("Error While Fatch Live_Match_Api", e);
    }
  };

  const Current_Match = async (EventTypeID) => {
    // console.log("EventTypeIDCurrent_Match", EventTypeID);
    try {
      let res = await axios.get(
        `https://battlemoney-match-api.nakshtech.info/GetAllCurrentMatches?eventTypeID=${EventTypeID}`
      );
      // res = res.data.data;
      // seteventCatagory_Data(res.data.data);
      console.log("Current_Match", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Current_Match API", e);
    }
  };

  useEffect(() => {
    Live_Match_Api();
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      let res = await axios.get(
        "https://battleminey-api.nakshtech.info/FetchAllMatchesData"
      );
      // console.log("getAllEvents=>", res.data);
      // setevents_Data(res.data);
    } catch (error) {
      console.log("Something Error in getAllEvents API", error);
    }
  };

  const eventCatagory = async (EventTypeID) => {
    try {
      // console.log("EventType=>", EventTypeID, event_name);
      let res = await axios.get(
        `https://battleminey-api.nakshtech.info/GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      // console.log("Res", res.data);
      // seteventCatagory(res.data);
    } catch (error) {
      console.log("Something Error in eventCatagory API", error);
    }
  };

  function handleClick() {
    let eventType1 = type ?? "4";
    let name1 = name ?? "Cricket";
    eventCatagory(eventType1);
    Current_Match(eventType1);
    setevent_Type(eventType1);
    setevent_name(name1);
  }

  useEffect(() => {
    handleClick();
  }, [name, type]);

  return (
    <div>
      <Navbar />

      {/* desktop upper links  */}
      <div className="upper_links_dashboR d-none d-lg-block">
        <ul className="d-flex justify-content-center ps-0">
          <li className="li_upper_dash">Lottery</li>
          <li className="li_upper_dash">SportBook1</li>
          <li className="li_upper_dash">Exchange</li>
          <li className="li_upper_dash">Live Casino</li>
          <li className="li_upper_dash">Slot</li>
          <li className="li_upper_dash">Fantasy Games</li>
        </ul>
      </div>

      {/* ends here  */}

      <div className="main_root margin_top wrapper">
        <nav id="sidebar" className="sidemenu">
          <div className="text-center py-3">
            <img src={logo} className="w-50" alt="" />
          </div>

          <div className="search-box">
            <div className="form-group">
              <input
                type="text"
                placeholder="Search"
                autoComplete="off"
                className="form-control"
                style={{ textTransform: "lowercase" }}
              />{" "}
              <img
                src="https://wver.sprintstaticdata.com/v14/static/front/img/search.svg"
                className="search-icon"
              />
            </div>
          </div>

          <div className="special-menu">
            <h5 className="text-yellow pl-2">
              <u>Racing Sport</u>
            </h5>

            <ul>
              <ul>
                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample200hxn"
                    aria-expanded="false"
                    aria-controls="collapseExample200hxn"
                  >
                    <img src={horse_racing} alt="" className="icn_emg" /> Horse
                    Racing
                  </button>
                  <div class="collapse" id="collapseExample200hxn">
                    <div class="card card-body">
                      <div className="panel-group" id="accordion">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseOne200alna"
                              >
                                <span className="glyphicon glyphicon-folder-close"></span>
                                Assembly Election
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseOne200alna"
                            className="panel-collapse collapse in"
                          >
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>Assembly Election 2023</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <button
                    class="btn ml-3 hxn_btn"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample201hxn"
                    aria-expanded="false"
                    aria-controls="collapseExample201hxn"
                  >
                    <img src={greyhound_racing} alt="" className="icn_emg" />{" "}
                    Greyhound Racing
                  </button>
                  <div class="collapse" id="collapseExample201hxn">
                    <div class="card card-body">
                      <div className="panel-group" id="accordion">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseOne2002alna"
                              >
                                <span className="glyphicon glyphicon-folder-close"></span>
                                T10 Xl(1)
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseOne2002alna"
                            className="panel-collapse collapse in"
                          >
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>Assembly Election 2023</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">News</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">Newsletters</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">Comments</a>
                                      <span className="badge">42</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseTwo2003alna"
                              >
                                <span className="glyphicon glyphicon-th"></span>
                                T10 Xl(1)
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseTwo2003alna"
                            className="panel-collapse collapse"
                          >
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="">Sydney vs Auk</a>{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseThree2004alna"
                              >
                                <span className="glyphicon glyphicon-user"></span>
                                T5 Xl
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseThree2004alna"
                            className="panel-collapse collapse"
                          >
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="">GAW 11 vs TKR</a>{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseFour2005alna"
                              >
                                <span className="glyphicon glyphicon-file"></span>
                                Virtual Cricket
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseFour2005alna"
                            className="panel-collapse collapse"
                          >
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="">Ind vs Pak</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">Bng vs Nz</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">Afg vs Nep</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="">Sa vs Wi</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </ul>
          </div>

          <div className="special-menu">
            <h5 className="text-yellow pl-2">
              <u>All Sport</u>
            </h5>

            <ul>
              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplehxn"
                  aria-expanded="false"
                  aria-controls="collapseExamplehxn"
                >
                  <img src={politics} alt="" className="icn_emg" /> Politics
                </button>
                <div class="collapse" id="collapseExamplehxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              Assembly Election
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample2hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample2hxn"
                >
                  <img src={cricket} alt="" className="icn_emg" /> Cricket
                </button>
                <div class="collapse" id="collapseExample2hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOnehxn"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOnehxn"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwohxn"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwohxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThreehxn"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThreehxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFourhxn"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFourhxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample3hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample3hxn"
                >
                  <img src={football} alt="" className="icn_emg" /> Football
                </button>
                <div class="collapse" id="collapseExample3hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne1hxn"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne1hxn"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo2hxn"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo2hxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree3hxn"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree3hxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour4hxn"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour4hxn"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample4hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample4hxn"
                >
                  <img src={tennis} alt="" className="icn_emg" /> Tennis
                </button>
                <div class="collapse" id="collapseExample4hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne11alna"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne11alna"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo22alna"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo22alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree33alna"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree33alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour44alna"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour44alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample5hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample5hxn"
                >
                  <img src={table_tennis} alt="" className="icn_emg" /> Table
                  Tennis
                </button>
                <div class="collapse" id="collapseExample5hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne112alna"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne112alna"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo222alna"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo222alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree332alna"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree332alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour442alna"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour442alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample6hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample6hxn"
                >
                  <img src={basketball} alt="" className="icn_emg" /> Basketball
                </button>
                <div class="collapse" id="collapseExample6hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne113alna"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne113alna"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo223alna"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo223alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree333alna"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree333alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour443alna"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour443alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample7hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample7hxn"
                >
                  <img src={volleyball} alt="" className="icn_emg" /> Volleyball
                </button>
                <div class="collapse" id="collapseExample7hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne114alna"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne114alna"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo224alna"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo224alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree334alna"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree334alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour444alna"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour444alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxn"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxn"
                >
                  <img src={snooker} alt="" className="icn_emg" /> Snooker
                </button>
                <div class="collapse" id="collapseExample8hxn">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115alna"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115alna"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225alna"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335alna"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445alna"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445alna"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxnice_hockey"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxnice_hockey"
                >
                  <img src={ice_hockey} alt="" className="icn_emg" /> Ice Hockey
                </button>
                <div class="collapse" id="collapseExample8hxnice_hockey">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115ice_hockey"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115ice_hockey"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225ice_hockey"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225ice_hockey"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335ice_hockey"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335ice_hockey"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445ice_hockey"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445ice_hockey"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxne_games"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxne_games"
                >
                  <img src={e_games} alt="" className="icn_emg" /> E Games
                </button>
                <div class="collapse" id="collapseExample8hxne_games">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115e_games"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115e_games"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225e_games"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225e_games"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335e_games"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335e_games"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445e_games"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445e_games"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxnfutsal"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxnfutsal"
                >
                  <img src={futsal} alt="" className="icn_emg" /> Futsal
                </button>
                <div class="collapse" id="collapseExample8hxnfutsal">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115futsal"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115futsal"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225futsal"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225futsal"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335futsal"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335futsal"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445futsal"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445futsal"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxnhandball"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxnhandball"
                >
                  <img src={handball} alt="" className="icn_emg" /> Handball
                </button>
                <div class="collapse" id="collapseExample8hxnhandball">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115handball"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115handball"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225handball"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225handball"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335handball"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335handball"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445handball"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445handball"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxnkabaddi"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxnkabaddi"
                >
                  <img src={kabaddi} alt="" className="icn_emg" /> Kabaddi
                </button>
                <div class="collapse" id="collapseExample8hxnkabaddi">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115kabaddi"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115kabaddi"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225kabaddi"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335kabaddi"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445kabaddi"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8hxnkabaddi"
                  aria-expanded="false"
                  aria-controls="collapseExample8hxnkabaddi"
                >
                  <img src={golf} alt="" className="icn_emg" /> Golf
                </button>
                <div class="collapse" id="collapseExample8hxnkabaddi">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115kabaddi"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115kabaddi"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225kabaddi"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335kabaddi"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445kabaddi"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445kabaddi"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8rugby_league"
                  aria-expanded="false"
                  aria-controls="collapseExample8rugby_league"
                >
                  <img src={rugby_league} alt="" className="icn_emg" /> Rugby
                  League
                </button>
                <div class="collapse" id="collapseExample8rugby_league">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115rugby_league"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115rugby_league"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225rugby_league"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225rugby_league"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335rugby_league"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335rugby_league"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445rugby_league"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445rugby_league"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample8boxing"
                  aria-expanded="false"
                  aria-controls="collapseExample8boxing"
                >
                  <img src={boxing} alt="" className="icn_emg" /> Boxing
                </button>
                <div class="collapse" id="collapseExample8boxing">
                  <div class="card card-body">
                    <div className="panel-group" id="accordion">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne115boxing"
                            >
                              <span className="glyphicon glyphicon-folder-close"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseOne115boxing"
                          className="panel-collapse collapse in"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Assembly Election 2023</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">News</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Newsletters</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Comments</a>
                                    <span className="badge">42</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo225boxing"
                            >
                              <span className="glyphicon glyphicon-th"></span>
                              T10 Xl(1)
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseTwo225boxing"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Sydney vs Auk</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree335boxing"
                            >
                              <span className="glyphicon glyphicon-user"></span>
                              T5 Xl
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseThree335boxing"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">GAW 11 vs TKR</a>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseFour445boxing"
                            >
                              <span className="glyphicon glyphicon-file"></span>
                              Virtual Cricket
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour445boxing"
                          className="panel-collapse collapse"
                        >
                          <div className="panel-body">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="">Ind vs Pak</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Bng vs Nz</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Afg vs Nep</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">Sa vs Wi</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={beach_volleyball} alt="" className="icn_emg" />{" "}
                  Beach Volleyball
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={mixed_martial_art} alt="" className="icn_emg" />{" "}
                  Mixed Martial Arts
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={moto_gp} alt="" className="icn_emg" /> Moto GP
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={chess} alt="" className="icn_emg" /> Chess
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={badminton} alt="" className="icn_emg" /> Badminton
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={cycling} alt="" className="icn_emg" /> Cycling
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={moterbikes} alt="" className="icn_emg" /> moterbikes
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={athelitics} alt="" className="icn_emg" /> Athletics
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={basketball} alt="" className="icn_emg" /> Basketball
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={sumo} alt="" className="icn_emg" /> Sumo
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={virtual_sports} alt="" className="icn_emg" />{" "}
                  Virtual Sports
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={motor_sports} alt="" className="icn_emg" /> Motor
                  Sports
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={baseball} alt="" className="icn_emg" /> Baseball
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={rugby_union} alt="" className="icn_emg" /> Rugby
                  Union
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={dart} alt="" className="icn_emg" /> Darts
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={american_football} alt="" className="icn_emg" />{" "}
                  American Football
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={soccer} alt="" className="icn_emg" /> Soccer
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={e_games} alt="" className="icn_emg" /> Esports
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>

              <li>
                <button
                  class="btn ml-3 hxn_btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExamplebeach_volleyball"
                  aria-expanded="false"
                  aria-controls="collapseExamplebeach_volleyball"
                >
                  <img src={boat_racing} alt="" className="icn_emg" /> Boat
                  Racing
                </button>
                <div
                  class="collapse"
                  id="collapseExamplebeach_volleyball"
                ></div>
              </li>
            </ul>
          </div>
        </nav>

        <div id="content">
          <div className="container">
            <div className="row  m-0 desktop_row_here_testing">
              <div className="col-md-9 FFl">
                <div className="First_bar_main">
                  <div className="First_bar1 ">
                    <div className="fixure_title">
                      Upcoming <br /> Fixure
                    </div>
                    <div className="sldrr">
                      <Vertical2 />
                    </div>
                  </div>

                  <div className="First_bar2">
                    <marquee
                      behavior=""
                      scrollamount="4"
                      direction="left"
                      className="meqi"
                    >
                      Experience the Excitement of Live Sports, Live Casinos,
                      Virtual Casinos and Fantasy Games On Our Exchange. Play
                      Now To Win Unlimited.
                    </marquee>
                    <div className="bellUpper">
                      <img
                        src="https://wver.sprintstaticdata.com/v14/static/front/img/icons/speaker.svg"
                        alt="#"
                        className="bells"
                      />
                    </div>
                  </div>
                </div>

                <div className="second_bar_main">
                  <div className="dv1">
                    <a
                      href=""
                      className="my-3 dv1Inner d-flex justify-content-center align-items-center gap-2"
                    >
                      <div className="icn">
                        <IoIosTennisball className="mnicn" />
                      </div>
                      <div>
                        <p className="mb-0 mchDtl">
                          US Open <br /> Women 2023
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="dv1">
                    <a
                      href=""
                      className="my-3 dv1Inner d-flex justify-content-center align-items-center gap-2"
                    >
                      <div className="icn">
                        <IoIosTennisball className="mnicn" />
                      </div>
                      <div>
                        <p className="mb-0 mchDtl">
                          US Open <br /> Men 2023
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="dv1 basketball">
                    <a
                      href=""
                      className="my-3 dv1Inner d-flex justify-content-center align-items-center gap-2"
                    >
                      <div className="icn">
                        <FaBasketballBall className="mnicn" />
                      </div>
                      <div>
                        <p className="mb-0 mchDtl">
                          FIBA World <br /> Cup 2023
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="dv1 cricket">
                    <a
                      href=""
                      className="my-3 dv1Inner d-flex justify-content-center align-items-center gap-2"
                    >
                      <div className="icn">
                        <MdSportsCricket className="mnicn" />
                      </div>
                      <div>
                        <p className="mb-0 mchDtl">
                          Pakistan <br /> Women 2023
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="dv1 football">
                    <a
                      href=""
                      className="my-3 dv1Inner d-flex justify-content-center align-items-center gap-2"
                    >
                      <div className="icn">
                        <BiFootball className="mnicn" />
                      </div>
                      <div>
                        <p className="mb-0 mchDtl">
                          Georgia vs <br /> Spain
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="MatchSlider_Bar">
                  <DashboardMatch_Slider />
                </div>

                <div className="Match_detailsTab">
                  <DashboardMatchDetail_Tab />
                </div>

                <footer className="footer">
                  <div className="support">
                    <div>
                      <div className="w-100 text-center">
                        <b>24X7 Support</b>
                      </div>{" "}
                      <div className="text-center w-100"></div>
                    </div>{" "}
                    {/* <div className="footer-social">
                      <a href="https://wa.me/+917517849541" target="_blank">
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/whatsapp.png" />
                      </a>{" "}
                      <a
                        href="https://www.facebook.com/Veronica777-111522977707208"
                        target="_blank"
                      >
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/facebook.png" />
                      </a>{" "}
                      <a
                        href="https://instagram.com/veronica_7_7_7?igshid=1wz9bjrzbqtdp"
                        target="_blank"
                      >
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/instagram.png" />
                      </a>{" "}
                      <a href="https://t.me/veronica777T" target="_blank">
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/telegram.png" />
                      </a>{" "}
                      <a
                        href="https://twitter.com/VERONICA77713"
                        target="_blank"
                      >
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/twitter.png" />
                      </a>{" "}
                      <a
                        href="https://www.youtube.com/channel/UCBNf7RhPm-lKzxwYFTu8vBQ"
                        target="_blank"
                      >
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/youtube.png" />
                      </a>{" "}
                      <a href="undefined" target="_blank">
                        <img src="https://wver.sprintstaticdata.com/v14/static/front/img/home-banners/social/news.png" />
                      </a>
                    </div> */}
                  </div>{" "}
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <a href="/about-us" className="" target="_blank">
                          About Us
                        </a>
                      </li>{" "}
                      <li>
                        <a href="/faq" className="">
                          FAQ
                        </a>
                      </li>{" "}
                      <li>
                        <a href="javascript:void(0);">Rules</a>
                      </li>{" "}
                      <li>
                        <a
                          href="/terms-and-conditions"
                          className=""
                          target="_blank"
                        >
                          Terms and Conditions
                        </a>
                      </li>{" "}
                      <li>
                        <a
                          href="/responsible-gaming"
                          className=""
                          target="_blank"
                        >
                          Responsible Gaming
                        </a>
                      </li>{" "}
                      {/**/}
                    </ul>
                  </div>{" "}
                  <div className="footer-box">
                    <div className="footer-top">
                      <div className="secure-logo">
                        <div>
                          <img src="https://wver.sprintstaticdata.com/v14/static/front/img/ssl.png" />
                        </div>{" "}
                        <div className="ml-2">
                          <b>100% SAFE</b>{" "}
                          <div>Protected connection and encrypted data.</div>
                        </div>
                      </div>{" "}
                      <div className="d-inline-block footer-other">
                        <a href="javascript:void(0)" role="button">
                          <img src="https://wver.sprintstaticdata.com/v14/static/front/img/18plus.png" />
                        </a>{" "}
                        <a href="https://www.gamcare.org.uk/" target="_blank">
                          <img src="https://wver.sprintstaticdata.com/v14/static/front/img/gamecare.png" />
                        </a>{" "}
                        <a
                          href="https://www.gamblingtherapy.org/en"
                          target="_blank"
                        >
                          <img src="https://wver.sprintstaticdata.com/v14/static/front/img/gt.png" />
                        </a>{" "}
                      </div>
                    </div>{" "}
                    <div className="footer-bottom">{/**/}</div>
                  </div>{" "}
                  <div className="text-center mt-1 w-100 copyright">
                    © Copyright 2020. All Rights Reserved.
                  </div>{" "}
                </footer>
              </div>
              <div className="col-lg-3 left_imgesa ps-0">
                <div className="to_btn_here d-flex gap-2 justify-content-around">
                  <div className="wallet text-end d-flex gap-1">
                    <div className="icons_daskPDa">
                      {" "}
                      <FaWallet></FaWallet>
                    </div>{" "}
                    <div>
                      <span>pts::1500</span> <br />
                      <span>exp:0</span>
                    </div>
                  </div>
                  <div className="wallet text-end d-flex gap-1">
                    <div className="icons_daskPDa">
                      {" "}
                      <FaUserAlt></FaUserAlt>
                    </div>{" "}
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn New_das_bord_drop dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Demo
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <a className="dropdown-item" href="#">
                              Account Statement
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Current Bets
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              {" "}
                              Casion Results
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              {" "}
                              Set Button Value
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              {" "}
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightSliDr text-danger">
                  <>
                    <Vertical />
                  </>
                </div>
              </div>
                        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
