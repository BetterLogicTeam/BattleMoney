import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import moment from "moment/moment";
import "./Dashboard.css"
import tv from "./tv-solid.svg"

//import io from "socket.io-client";

// const SOCKET_URL = "https://live-game-api.nakshtech.info";

function Dashboard() {

  let {name, type}=useParams()
  const [data, setData] = useState([]);

  const [cricketMatches, setCricketMatches] = useState([]);
  const [events_Data, setevents_Data] = useState([]);
  const [eventCatagory_Data, seteventCatagory_Data] = useState([]);
  const [eventCatagorydata, seteventCatagory] = useState([]);
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
      seteventCatagory_Data(res.data.data);
      console.log("Current_Match", res.data.data);
    } catch (e) {
      console.log("Error While Fatch Current_Match API", e);
    }
  };

  useEffect(() => {
    Live_Match_Api();
    getAllEvents()
  }, []);

  

  


  const getAllEvents = async () => {
    try {
      let res = await axios.get(
        "https://battleminey-api.nakshtech.info/FetchAllMatchesData"
      );
      // console.log("getAllEvents=>", res.data);
      setevents_Data(res.data);
    } catch (error) {
      console.log("Something Error in getAllEvents API",error);
    }
  };

  const eventCatagory = async (EventTypeID) => {
    try {
      // console.log("EventType=>", EventTypeID, event_name);
      let res = await axios.get(
        `https://battleminey-api.nakshtech.info/GetAllCompetitionsData?EventTypeID=${EventTypeID}`
      );
      // console.log("Res", res.data);
      seteventCatagory(res.data);
    } catch (error) {
      console.log("Something Error in eventCatagory API",error);
    }
  };


  function handleClick(){
    let eventType1=type??'4'
    let name1=name??'Cricket'
    eventCatagory(eventType1)
    Current_Match(eventType1)
    setevent_Type(eventType1)
    setevent_name(name1)
  }
  

  useEffect(()=>{
    handleClick()
  },[name,type])

  return (
    <div>
      <Navbar/>
   
      <main className="main_root wrapper">
        {/* <!-- Sidebar start  --> */}
        <nav id="sidebar" className="sidemenu">
          <ul className="list-unstyled components">
          <button
                              className="badge badge-info "
                              style={{fontSize:'16px'}}
                              >{event_name}</button>
                              <hr style={{color:'#fff'}}/>
          {/* <input className="btn btn-info" value={event_name} /> */}
            <li class="active">
              {eventCatagorydata?.map((item, index) => (
                <ul class="collapse list-unstyled show" id="homeSubmenu">
                  {/* <span>{event_name}</span */}
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
          </ul>
        </nav>


        
        {/* <!-- Sidebar end  -->
	    <!-----=======body section start=======----> */}
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className=" tab-content_bg">
                  <ul className="nav nav-pills" role="tablist">
                    {events_Data.slice(0,3).map((items, index) => {
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
                               navigate(`/Dashboard/${items.name}/${items.eventType}`)
                              )}
                            >
                              {items.name}
                            </a>
                          </li>
                        </>
                      );
                    })}
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
                                  <th scope="col" className="temp">1</th>
                                  <th scope="col" className="temp">X</th>
                                  <th scope="col" className="temp">2</th>
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
                                          textAlign:'center'
                                        }}
                                        onClick={() =>
                                          navigate(
                                            event_name === "Tennis"
                                            ? `/Tennis_Matches?Id=${item.id}&Time=${item.openDate}`
                                            : event_name === "Soccer"
                                            ? `/Football_Matches?Id=${item.id}&Time=${item.openDate}`
                                            :`/Live_Matches?Id=${item.id}&Time=${item.openDate}`
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
                                    <th scope="row">{(new Date(item.openDate)<= new Date())&&<span className="circle"> </span>}</th>
                                    <td><img src={tv} alt="" width="25" /></td>
                                    <th className="temp"><span className="back_space">-</span><span className="back_space1">-</span></th>
                                    <th className="temp"><span className="back_space">-</span><span className="back_space1">-</span></th>
                                    <td className="temp"><span className="back_space">-</span><span className="back_space1">-</span></td>
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
