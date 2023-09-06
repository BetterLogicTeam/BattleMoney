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
        `https://live-game-api.nakshtech.info/GetAllCurrentMatches?eventTypeID=${EventTypeID}`
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

      <main className="main_root wrapper">
        {/* <!-- Sidebar start  --> */}
        <nav id="sidebar" className="sidemenu">
          {/* <ul className="list-unstyled components">
            <button className="badge badge-info " style={{ fontSize: "16px" }}>
              {event_name}
            </button>
            <hr style={{ color: "#fff" }} />
            <li class="active">
              {eventCatagorydata?.map((item, index) => (
                <ul class="collapse list-unstyled show" id="homeSubmenu">
                  <li>
                    <a
                      href=""
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                      }}
                      onClick={() =>
                        navigate(
                          event_name === "Tennis"
                            ? `/Tennis/${item.competition.id}/${event_Type}`
                            : event_name === "Soccer"
                            ? `/Soccer/${item.competition.id}/${event_Type}`
                            : `/scoreboard/${item.competition.id}/${event_Type}`
                        )
                      }
                    >
                      {item?.competition?.name}
                    </a>
                  </li>
                </ul>
              ))}
            </li>
          </ul> */}
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
                  Horse Racing
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
                                  </td>
                                </tr>
                                {/* <tr>
              <td>
                <a href="">Invoices</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Shipments</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Tex</a>
              </td>
            </tr> */}
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
                 <img src={politics} alt="" className="icn_emg"/> Politics
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
                 <img src={cricket} alt="" className="icn_emg"/> Cricket
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
                                  </td>
                                </tr>
                                {/* <tr>
              <td>
                <a href="">Invoices</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Shipments</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="">Tex</a>
              </td>
            </tr> */}
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
                 <img src={football} alt="" className="icn_emg"/> Football
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
                 <img src={tennis} alt="" className="icn_emg"/> Tennis
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
                <img src={table_tennis} alt="" className="icn_emg"/> Table Tennis
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
                 <img src={basketball} alt="" className="icn_emg"/> Basketball
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
                 <img src={volleyball} alt="" className="icn_emg"/> Volleyball
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
                 <img src={snooker} alt="" className="icn_emg"/> Snooker
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
                                    <a href="">
                                      News
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Newsletters
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="">
                                      Comments
                                    </a>
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
                                    <a href="">
                                      Sydney vs Auk
                                    </a>{" "}
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
            </ul>
          </div>
        </nav>

        {/* <Sidebar /> */}

        {/* <!-- Sidebar end  -->
	    <!-----=======body section start=======----> */}
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className=" tab-content_bg">
                  <ul className="nav nav-pills" role="tablist">
                    {/* {events_Data.slice(0, 3).map((items, index) => {
                      return (
                        <>
                          <li className="nav-item" key={index}>
                            <a
                              href=""
                              className="nav-link"
                              data-toggle="pill"
                              onClick={() => (
                                eventCatagory(items.eventType),
                                Current_Match(items.eventType),
                                setevent_Type(items.eventType),
                                setevent_name(items.name),
                                navigate(
                                  `/Dashboard/${items.name}/${items.eventType}`
                                )
                              )}
                            >
                              {items.name}
                            </a>
                          </li>
                        </>
                      );
                    })} */}
                  </ul>
                  {/* <!-----tab pane------>  */}
                  <div className="tab-content">
                    <div className="tab-content">
                      <div id="Home3" className="container tab-pane active">
                        <div className="">
                          <div className="table-responsive-sm">
                            <table className="table">
                              <thead>
                                <tr>
                                  {/* <th scope="col">#</th>
                                  <th scope="col">id</th> */}
                                  <th scope="col">Name</th>
                                  <th scope="col">OpenDate</th>
                                  <th scope="col"></th>
                                  <th scope="col" className="temp"></th>
                                  <th scope="col" className="temp">
                                    1
                                  </th>
                                  <th scope="col" className="temp">
                                    X
                                  </th>
                                  <th scope="col" className="temp">
                                    2
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-white">
                                {eventCatagory_Data?.map((item, index) => (
                                  <tr>
                                    {/* <th scope="row">{index + 1}</th>
                                    <td>{item.id}</td> */}
                                    <td>
                                      <a
                                        href=""
                                        style={{
                                          color: "#fff",
                                          textDecoration: "none",
                                          textAlign: "center",
                                        }}
                                        onClick={() =>
                                          navigate(
                                            event_name === "Tennis"
                                              ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                                              : event_name === "Soccer"
                                              ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                                              : `/Live_Matches?Id=${item.id}&Time=${item.openDate}`
                                          )
                                        }
                                      >
                                        {item.name}
                                      </a>
                                    </td>
                                    <td>
                                      {moment(item.openDate).format(
                                        "DD/MM/YYYY h:m:s A"
                                      )}
                                    </td>
                                    <th scope="row">
                                      {new Date(item.openDate) <=
                                        new Date() && (
                                        <span className="circle"> </span>
                                      )}
                                    </th>
                                    <td>
                                      <img src={tv} alt="" width="25" />
                                    </td>
                                    <th className="temp">
                                      <span className="back_space">-</span>
                                      <span className="back_space1">-</span>
                                    </th>
                                    <th className="temp">
                                      <span className="back_space">-</span>
                                      <span className="back_space1">-</span>
                                    </th>
                                    <td className="temp">
                                      <span className="back_space">-</span>
                                      <span className="back_space1">-</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="Home3"
                      class="container tab-pane active"
                      style={{ display: "none" }}
                    >
                      <div class="">
                        <div class="table-responsive-sm">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {eventCatagory_Data?.map((item, index) => (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.id}</td>
                                  <td>
                                    <a
                                      href=""
                                      style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                      }}
                                      onClick={() =>
                                        navigate(
                                          event_name === "Tennis"
                                            ? `/Tennis/${item.id}/${event_Type}`
                                            : event_name === "Soccer"
                                            ? `/Soccer/${item.id}/${event_Type}`
                                            : `/scoreboard/${item.id}/${event_Type}`
                                        )
                                      }
                                    >
                                      {item.name}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div id="Home4" class="container tab-pane fade">
                      <br />
                      <h3>Home4</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home5" class="container tab-pane fade">
                      <br />
                      <h3>Home5</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home6" class="container tab-pane fade">
                      <br />
                      <h3>Home6</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home7" class="container tab-pane fade">
                      <br />
                      <h3>Home7</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home8" class="container tab-pane fade">
                      <br />
                      <h3>Home8</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home9" class="container tab-pane fade">
                      <br />
                      <h3>Home9</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home10" class="container tab-pane fade">
                      <br />
                      <h3>Home10</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home11" class="container tab-pane fade">
                      <br />
                      <h3>Home11</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                    <div id="Home12" class="container tab-pane fade">
                      <br />
                      <h3>Home12</h3>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="games_images">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/1.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/2.png" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/3.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/4.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/5.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/6.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/7.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/8.png" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/9.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/10.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/11.jpg" />
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="img_item">
                          <a>
                            <img src="/assets/images/games/12.jpg" />
                          </a>
                        </div>
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

export default Dashboard;
