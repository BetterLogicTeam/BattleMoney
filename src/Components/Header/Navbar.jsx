import React, { useEffect, useState } from "react";
import { API } from "../../API";
import "./Header.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import cricket from "../../icoons/cricket.png";
import football from "../../icoons/football.png";
import tennis from "../../icoons/tennis.png";
import table_tennis from "../../icoons/table_tennis.png";
import basketball from "../../icoons/basketball.png";
import volleyball from "../../icoons/volleyball.png";
import snooker from "../../icoons/snooker.png";
import politics from "../../icoons/politics.png";

function Navbar({ updateBal }) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let userId = ress.resultid;
  const [data, setData] = useState("");
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
  let { name, type } = useParams();
  const navigate = useNavigate();

  const Live_Rate = async () => {
    try {
      let res = await API.post("/getbetawallet", {
        username: uId,
      });
      res = res.data.data[0][0].netbal;
      setData(res);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  const getAllEvents = async () => {
    try {
      let res = await axios.get(
        "https://battleminey-api.nakshtech.info/FetchAllMatchesData"
      );
      console.log("getAllEvents=>", res.data);
      setevents_Data(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eventCatagory = async () => {
    try {
      let res = await axios.get(
        `https://battleminey-api.nakshtech.info/GetAllCompetitionsData?EventTypeID=${type}`
      );
      //   console.log("Res", res.data);
      seteventCatagory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    eventCatagory();
  }, [type]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    Live_Rate();
    // }, 2000);

    getAllEvents();
    // return () => clearInterval(intervalId);
  }, [updateBal]);

  function stop() {
    document.getElementById("marquee1").stop();
  }

  function start() {
    document.getElementById("marquee1").start();
  }

  const [dd, setdd] = useState(false);

  function handleClick() {
    setdd(!dd);
  }

  function Logout() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <header className="top_header bet_icon_header">
        <div className="container-fluid head_box">

        <div className="row nav_tab_bg">
            <div className="col-md-12">
              <div className="header_menu">
                <nav className="navbar navbar-expand-lg navbar-dark toggle_btn">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex="-1"
                    id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel"
                  >
                    <div className="offcanvas-header">
                      <button
                        type="button"
                        className="btn-close mob_reset text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="mob">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/Dashboard/Cricket/4">
                            <span className="fafa">
                              {" "}
                              <i className="fa fa-home"></i>
                            </span>{" "}
                            Home
                          </a>
                        </li>
                        {events_Data.slice(0, 3).map((items, index) => {
                          return (
                            <>
                              <li className="nav-item" key={index}>
                                <a
                                  className="nav-link"
                                  onClick={() =>
                                    navigate(
                                      `/Dashboard/${items.name}/${items.eventType}`
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {items.name}
                                </a>
                              </li>
                            </>
                          );
                        })}
                        <li className="nav-item">
                          <a className="nav-link" href="" onClick={Logout}>
                            <span className="fafa">
                              {" "}
                              <i className="fa fa-sign-out"></i>
                            </span>{" "}
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {name && type && (
                    <button
                      className="btn off btn-primary mod-slide"
                      type="button"
                      style={{ height: "32px", marginLeft: "-32%" }}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample2"
                      aria-controls="offcanvasExample2"
                    >
                      <i className="fa fa-bars"></i>
                    </button>
                  )}

                  <div
                    class="offcanvas offcanvas-start offcamp1"
                    tabindex="-1"
                    id="offcanvasExample2"
                    aria-labelledby="offcanvasExampleLabel"
                  >
                    <div className="container can_er1">
                      <button
                        type="button"
                        class="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>

                      <ul className="list-unstyled components">
                        {/* <button
                          className="badge badge-info "
                          style={{ fontSize: "16px" }}
                        >
                          {name}
                        </button>
                        <hr style={{ color: "#fff" }} /> */}

<div className="mob">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/Dashboard/Cricket/4">
                            <span className="fafa">
                              {" "}
                              <i className="fa fa-home"></i>
                            </span>{" "}
                            Home
                          </a>
                        </li>
                        {events_Data.slice(0, 3).map((items, index) => {
                          return (
                            <>
                              <li className="nav-item" key={index}>
                                <a
                                  className="nav-link"
                                  onClick={() =>
                                    navigate(
                                      `/Dashboard/${items.name}/${items.eventType}`
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {items.name}
                                </a>
                              </li>
                            </>
                          );
                        })}
                        <li className="nav-item">
                          <a className="nav-link" href="" onClick={Logout}>
                            <span className="fafa">
                              {" "}
                              <i className="fa fa-sign-out"></i>
                            </span>{" "}
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                        <li className="active sideMobile">
                          {/* {eventCatagorydata?.map((item, index) => (
                            <ul
                              className="collapse list-unstyled show"
                              id="homeSubmenu"
                              key={index}
                            >
                              <li className="lisize">
                                <a
                                  href=""
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      name === "Tennis"
                                        ? `/Tennis/${item.competition.id}/${type}`
                                        : name === "Soccer"
                                        ? `/Soccer/${item.competition.id}/${type}`
                                        : `/scoreboard/${item.competition.id}/${type}`
                                    )
                                  }
                                >
                                  {item?.competition?.name}
                                </a>
                              </li>
                            </ul>
                          ))} */}

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
                                    data-target="#collapseExample200"
                                    aria-expanded="false"
                                    aria-controls="collapseExample200"
                                  >
                                    Horse Racing
                                  </button>
                                  <div class="collapse" id="collapseExample200">
                                    <div class="card card-body">
                                      <div
                                        className="panel-group"
                                        id="accordion"
                                      >
                                        <div className="panel panel-default">
                                          <div className="panel-heading">
                                            <h4 className="panel-title">
                                              <a
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#collapseOne200"
                                              >
                                                <span className="glyphicon glyphicon-folder-close"></span>
                                                Assembly Election
                                              </a>
                                            </h4>
                                          </div>
                                          <div
                                            id="collapseOne200"
                                            className="panel-collapse collapse in"
                                          >
                                            <div className="panel-body">
                                              <table className="table">
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                      Assembly Election 2023
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
                                    data-target="#collapseExample201"
                                    aria-expanded="false"
                                    aria-controls="collapseExample201"
                                  >
                                    Greyhound Racing
                                  </button>
                                  <div class="collapse" id="collapseExample201">
                                    <div class="card card-body">
                                      <div
                                        className="panel-group"
                                        id="accordion"
                                      >
                                        <div className="panel panel-default">
                                          <div className="panel-heading">
                                            <h4 className="panel-title">
                                              <a
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#collapseOne2002"
                                              >
                                                <span className="glyphicon glyphicon-folder-close"></span>
                                                T10 Xl(1)
                                              </a>
                                            </h4>
                                          </div>
                                          <div
                                            id="collapseOne2002"
                                            className="panel-collapse collapse in"
                                          >
                                            <div className="panel-body">
                                              <table className="table">
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                      Assembly Election 2023
                                                    </td>
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
                                                      <span className="badge">
                                                        42
                                                      </span>
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
                                                href="#collapseTwo2003"
                                              >
                                                <span className="glyphicon glyphicon-th"></span>
                                                T10 Xl(1)
                                              </a>
                                            </h4>
                                          </div>
                                          <div
                                            id="collapseTwo2003"
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
                                                href="#collapseThree2004"
                                              >
                                                <span className="glyphicon glyphicon-user"></span>
                                                T5 Xl
                                              </a>
                                            </h4>
                                          </div>
                                          <div
                                            id="collapseThree2004"
                                            className="panel-collapse collapse"
                                          >
                                            <div className="panel-body">
                                              <table className="table">
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                      <a href="">
                                                        GAW 11 vs TKR
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
                                                href="#collapseFour2005"
                                              >
                                                <span className="glyphicon glyphicon-file"></span>
                                                Virtual Cricket
                                              </a>
                                            </h4>
                                          </div>
                                          <div
                                            id="collapseFour2005"
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
                                  data-target="#collapseExample"
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                 <img src={politics} alt="" className="icn_emg"/> Politics
                                </button>
                                <div class="collapse" id="collapseExample">
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
                                                  <td>
                                                    Assembly Election 2023
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
                                  data-target="#collapseExample2"
                                  aria-expanded="false"
                                  aria-controls="collapseExample2"
                                >
                                  <img src={cricket} alt="" className="icn_emg"/> Cricket
                                </button>
                                <div class="collapse" id="collapseExample2">
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
                                              T10 Xl(1)
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
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo"
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
                                              href="#collapseThree"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree"
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
                                              href="#collapseFour"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour"
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
                                  data-target="#collapseExample3"
                                  aria-expanded="false"
                                  aria-controls="collapseExample3"
                                >
                                 <img src={football} alt="" className="icn_emg"/> Football
                                </button>
                                <div class="collapse" id="collapseExample3">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne1"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne1"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo2"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo2"
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
                                              href="#collapseThree3"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree3"
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
                                              href="#collapseFour4"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour4"
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
                                  data-target="#collapseExample4"
                                  aria-expanded="false"
                                  aria-controls="collapseExample4"
                                >
                                 <img src={tennis} alt="" className="icn_emg"/> Tennis
                                </button>
                                <div class="collapse" id="collapseExample4">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne11"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne11"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo22"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo22"
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
                                              href="#collapseThree33"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree33"
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
                                              href="#collapseFour44"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour44"
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
                                  data-target="#collapseExample5"
                                  aria-expanded="false"
                                  aria-controls="collapseExample5"
                                >
                                 <img src={table_tennis} alt="" className="icn_emg"/> Table Tennis
                                </button>
                                <div class="collapse" id="collapseExample5">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne112"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne112"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo222"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo222"
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
                                              href="#collapseThree332"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree332"
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
                                              href="#collapseFour442"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour442"
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
                                  data-target="#collapseExample6"
                                  aria-expanded="false"
                                  aria-controls="collapseExample6"
                                >
                                <img src={basketball} alt="" className="icn_emg"/>  Basketball
                                </button>
                                <div class="collapse" id="collapseExample6">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne113"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne113"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo223"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo223"
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
                                              href="#collapseThree333"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree333"
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
                                              href="#collapseFour443"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour443"
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
                                  data-target="#collapseExample7"
                                  aria-expanded="false"
                                  aria-controls="collapseExample7"
                                >
                                 <img src={volleyball} alt="" className="icn_emg"/> Volleyball
                                </button>
                                <div class="collapse" id="collapseExample7">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne114"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne114"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo224"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo224"
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
                                              href="#collapseThree334"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree334"
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
                                              href="#collapseFour444"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour444"
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
                                  data-target="#collapseExample8"
                                  aria-expanded="false"
                                  aria-controls="collapseExample8"
                                >
                                 <img src={snooker} alt="" className="icn_emg"/> Snooker
                                </button>
                                <div class="collapse" id="collapseExample8">
                                  <div class="card card-body">
                                    <div className="panel-group" id="accordion">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h4 className="panel-title">
                                            <a
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne115"
                                            >
                                              <span className="glyphicon glyphicon-folder-close"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseOne115"
                                          className="panel-collapse collapse in"
                                        >
                                          <div className="panel-body">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Assembly Election 2023
                                                  </td>
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
                                                    <span className="badge">
                                                      42
                                                    </span>
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
                                              href="#collapseTwo225"
                                            >
                                              <span className="glyphicon glyphicon-th"></span>
                                              T10 Xl(1)
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseTwo225"
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
                                              href="#collapseThree335"
                                            >
                                              <span className="glyphicon glyphicon-user"></span>
                                              T5 Xl
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseThree335"
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
                                              href="#collapseFour445"
                                            >
                                              <span className="glyphicon glyphicon-file"></span>
                                              Virtual Cricket
                                            </a>
                                          </h4>
                                        </div>
                                        <div
                                          id="collapseFour445"
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
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
       
          <div className="row">
            <div className="col-6 nav_logo_search">
              <div className="Left_items ">
                <a href="#">
                  <img
                    src="/assets/images/battle_money.png"
                    alt="logo"
                    className="nav_logo"
                  />{" "}
                </a>
              </div>
            </div>
            <div className="col-6 max_nav_search">
              <div className="header_top_righ absulet">
                <div className="bal">
                  <h3>Balance:{data}</h3>
                  <h3>Exposure: 0</h3>
                </div>
                <div className="account-setting">
                  <h3 className="head_name">{userId}</h3>
                </div>
                <div class="dropdown drc1">
                  <a
                    class="btn btn-secondary dropdown-toggle menus"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleClick}
                  ></a>

                  <ul
                    class={`dropdown-menu hit ${dd ? "show" : ""}`}
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="/Dashboard/Cricket/4">
                        <span className="fafa">
                          {" "}
                          {/* <i className="fa fa-home"></i> */}
                        </span>{" "}
                        Home
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Level_Income">
                        <span className="fafa"> </span> Level Income
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Direct_Income">
                        <span className="fafa"> </span> Direct Income
                      </a>
                    </li>

                    <li>
                      <a class="dropdown-item" href="/Statement">
                        <span className="fafa"> </span> Account Statement
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/ProfitLoss">
                        <span className="fafa"> </span> Profit Loss Report
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Bet_History_Drop">
                        <span className="fafa"> </span> Bet History
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Unsellected">
                        <span className="fafa"> </span> Unsetteled Bet
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Button_value">
                        <span className="fafa"> </span> Set Button Value
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Change_Password">
                        <span className="fafa"> </span> Change Password
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a class="dropdown-item" href="" onClick={Logout}>
                        <span className="fafa">
                          {" "}
                          <i className="fa fa-sign-out"></i>
                        </span>{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="top_marque">
                <marquee
                  id="marquee1"
                  direction="left"
                  scrollamount="4"
                  onMouseOver={stop}
                  onMouseOut={start}
                >
                  Welcome to demo. For Buy Fund Call Our India Coordinator.
                  12345
                </marquee>
              </div>
            </div>
          </div>
          
          
        </div>
      </header>
    </div>
  );
}

export default Navbar;
