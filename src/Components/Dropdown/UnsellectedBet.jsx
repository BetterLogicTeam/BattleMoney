import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";

function Unsellected() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  
  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const UnsettledBet_Api = async () => {
    try {
      let res = await axios.get(
        `https://battlemoney-match-api.nakshtech.info/getUnSetteled_Bet?uid=${uId}`
      );
      res = res.data.data;
      console.log("PlaceBet_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Bet_History API", e);
    }
  };

  useEffect(() => {
    UnsettledBet_Api();
  }, []);

  

  const indexOfLastPost = currentPage * listPerpage;
  const indexOfFirstPage = indexOfLastPost - listPerpage;
  const currentPost = tableData.slice(indexOfFirstPage, indexOfLastPost);

  return (
    <div>
      <Navbar />
      <main class="main_root wrapper">
        <AllSide />
        {/* <!-----=======body section start=======----> */}
        <div id="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="section_bg">
                  <div class="mybet_wedget">
                    <div class="bars_bg">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="section_heading">
                            <h2>Un-Setteled Bet</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="col-md-12 mod_12" >
                          {/* <div className="col-md-2">
                          <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                
                              </label>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                               Matched
                              </label>
                            </div>
                          </div> */}
                          <div className="col-md-2">
                          <label
                                class="form-check-label"
                                for="flexRadioDefault2"
                              >
                                
                              </label>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked={true}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault2"
                              >
                                UnSettled
                              </label>
                            </div>
                          </div>
                          {/* <div className="col-md-2">
                          <label
                                class="form-check-label"
                                for="flexRadioDefault3"
                              >
                                
                              </label>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault3"
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault3"
                              >
                               Deleted
                              </label>
                            </div>
                          </div> */}

                          {/* <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn btn-info"
                              type="submit"
                              value="Submit"
                            />
                          </div> */}
                        </div>
                        <br />
                      </from>
                    </div>
                    <div class="mybet_table">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Event Name</th>
                              <th>Nation</th>
                              <th>Event Type</th>
                              {/* <th>Market Name</th>
                              <th>Side</th>
                              <th>Rate</th> */}
                              <th>Amount</th>
                              <th>Place Date</th>
                              {/* <th>Match Date</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item,index) => (
                              <tr key={item.id}>
                                <td>{(currentPage - 1) * listPerpage +index+1}</td>
                                <td>{item.remark}</td>
                                <td>{item.team}</td>
                                <td>{item.type}</td>
                                {/* <td>{' '}</td>
                                <td>{' '}</td>
                                <td>{' '}</td> */}
                                <td>{item.stake}</td>
                                <td>{moment(item.edate).format(  "DD/MM/YYYY h:m:s A")}</td>
                                {/* <td>{''}</td> */}
                             
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Table_Buttons
                    indexOfFirstPage={indexOfFirstPage}
                    indexOfLastPost={indexOfLastPost}
                    setcurrentPage={setcurrentPage}
                    currentPage={currentPage}
                    totalData={tableData.length}
                    listPerpage={listPerpage}
                  />
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

export default Unsellected;
