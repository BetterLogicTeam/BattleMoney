import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Matches/./Match.css";
import Navbar from "../Header/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import AllSide from "./AllSide";
import "./AllSide.css";
import { API } from "../../API";
import Table_Buttons from "../Table_Buttons/Table_Button";
import moment from "moment";

function Statement() {
  const user = sessionStorage.getItem("user");
  let ress = JSON.parse(user);
  let uId = ress.resultid;
  const [tableData, setTableData] = useState([]);
  const [todate, settodate] = useState("");
  const [fromdate, setfromdate] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [listPerpage, setlistPerpage] = useState(100);

  const Statement_History = async () => {
    try {
      let res = await axios.post(
        `https://live-game-api.nakshtech.info/account_statement`,
        {
          uid: uId,
          fromDate: fromdate,
          toDate: todate,
        }
      );
      res = res.data.data;
      console.log("Statement_History", res);
      setTableData(res);
    } catch (e) {
      console.log("Error While Fatch Bet_History API", e);
    }
  };

  useEffect(() => {
    Statement_History();
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
                            <h2>Account Statement</h2>
                            {/* <a className="btn" href="/Bet_History" >Bet History</a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <from>
                        <div className="col-md-12 mod_12" >
                          <div className="col-md-2">
                            <label className="fromdate">From Date</label><br/>
                            <input
                              className="from-control"
                              type="date"
                              value={fromdate}
                              onChange={(e) => setfromdate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                            <label className="todate">To Date</label>
                            <br />
                            <input
                              className="from-control"
                              type="date"
                              value={todate}
                              onChange={(e) => settodate(e.target.value)}
                            />
                          </div>
                          </div>
                          {/* <div className="col-md-2 ">
                            <label className="fromdate"></label>
<br/>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                            >
                              <option selected>All </option>
                              <option>Deposit/Withdraw </option>
                              <option>Cricket </option>
                              <option>Football </option>
                              <option>Tennis </option>
                            </select>
                          </div> */}
                          <div className="col-md-3">
                            <label className="todate"></label>
                            <br />
                            <input
                              className="btn btn-info"
                              // type="submit"
                              value="Submit"
                              onClick={() => Statement_History()}
                              readOnly
                            />
                          </div>{" "}
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
                              <th>Date</th>
                              <th>Credit</th>
                              <th>Debit</th>
                              <th>Balance</th>
                              <th>Sports</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPost?.map((item, index) => (
                              <tr key={item.id}>
                                <td>{(currentPage - 1) * listPerpage +index+1}</td>
                                <td>{moment(item.edate[0]).format(
                                        "DD/MM/YYYY h:m:s A"
                                      )}</td>
                                <td>{item.amount}</td>
                                <td>{item.debit}</td>
                                <td>{item.amount}</td>
                                <td>{item.remark[0]}</td>
                                <td>{item.remark[1]}</td>
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

export default Statement;
