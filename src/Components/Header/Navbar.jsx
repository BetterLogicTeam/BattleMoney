import React, { useEffect, useState } from "react";
import { API } from "../../API";
import "./Header.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Navbar({updateBal}) {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultusername;
  let userId=ress.resultid
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
          <div className="row">
            <div className="col-md-6 nav_logo_search">
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
            <div className="col-md-6 max_nav_search">
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
                        <span className="fafa">
                          {" "}
              
                        </span>{" "}
                        Level Income
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Direct_Income">
                        <span className="fafa">
                          {" "}
                    
                        </span>{" "}
                        Direct Income
                      </a>
                    </li>

                  
                    <li>
                      <a class="dropdown-item" href="/Statement">
                        <span className="fafa">
                          {" "}
                     
                        </span>{" "}
                        Account Statement
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/ProfitLoss">
                        <span className="fafa">
                          {" "}
                 
                        </span>{" "}
                        Profit Loss Report
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Bet_History_Drop">
                        <span className="fafa">
                          {" "}
                       
                        </span>{" "}
                        Bet History
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Unsellected">
                        <span className="fafa">
                          {" "}
                 
                        </span>{" "}
                        Unsetteled Bet
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Button_value">
                        <span className="fafa">
                          {" "}
                        </span>{" "}
                        Set Button Value
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/Change_Password">
                        <span className="fafa">
                          {" "}
                     
                        </span>{" "}
                        Change Password
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
          <div className="row nav_tab_bg">
            <div className="col-md-12">
              <div className="header_menu">
                <nav className="navbar navbar-expand-md navbar-dark toggle_btn">
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
                        {/* {events_Data.slice(0, 3).map((items, index) => {
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
                        })} */}
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
                        <button
                          className="badge badge-info "
                          style={{ fontSize: "16px" }}
                        >
                          {name}
                        </button>
                        <hr style={{ color: "#fff" }} />
                        <li className="active sideMobile">
                          {eventCatagorydata?.map((item, index) => (
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
                          ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
