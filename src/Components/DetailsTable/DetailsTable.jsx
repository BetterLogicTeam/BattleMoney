import React from "react";
import "./DetailsTable.css"

function DetailsTable() {
  return (
    <div>
      <div className="table-responsive-sm">
        <table className="table tblBG">
          <thead>
            <tr>
              <th className="new_table" scope="col">Name</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col" className="temp new_table"></th>
              <th scope="col" className="temp new_table">
                1
              </th>
              <th scope="col" className="temp new_table">
                X
              </th>
              <th scope="col" className="temp new_table">
                2
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="borber">
              <th  className="clr_the"scope="row"> Live</th>
              <td className="glo  clr_the">
                <span className="Today clr_the">Today</span>{" "}
                <span className="Today clr_the">16:30</span> <br />{" "}
              </td>
              <td className="eng clr_the ">
                England vs Newzland <br /> (One Day International)
                <span className="fon ms-1">F1 F BM</span>

              </td>
              <td></td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className=" simplexb">--</div>
                  <div className=" simplexb">--</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
            </tr>

            <tr  className="borber">
              <th scope="row"></th>
              <td className="glo">
                <span className="Today">Today</span>{" "}
                <span className="Today">16:30</span> <br />{" "}
             
              </td>
              <td className="eng ">
                England vs Newzland <br /> (One Day International)
                <span className="fon ms-1">F1 F BM</span>
              </td>
              <td></td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className=" simplexb">--</div>
                  <div className=" simplexb">--</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
            </tr>

            <tr  className="borber" >
              <th scope="row"></th>
              <td className="glo">
                <span className="Today">Today</span>{" "}
                <span className="Today">16:30</span> <br />{" "}
             
              </td>
              <td className="eng ">
                England vs Newzland <br /> (One Day International)
                <span className="fon">F1 F BM</span>
              </td>
              <td></td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className=" simplexb">--</div>
                  <div className=" simplexb">--</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
            </tr>

            <tr  className="borber">
              <th scope="row"></th>
              <td className="glo">
                <span className="Today">Today</span>{" "}
                <span className="Today">16:30</span> <br />{" "}
             
              </td>
              <td className="eng ">
                England vs Newzland <br /> (One Day International)
                <span className="fon ms-1">F1 F BM</span>
              </td>
              <td></td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className=" simplexb">--</div>
                  <div className=" simplexb">--</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
            </tr>

            <tr  >
              <th scope="row"></th>
              <td className="glo">
                <span className="Today">Today</span>{" "}
                <span className="Today">16:30</span> <br />{" "}
             
              </td>
              <td className="eng ">
                England vs Newzland <br /> (One Day International)
               
              </td>
              <td></td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className=" simplexb">--</div>
                  <div className=" simplexb">--</div>
                </div>
              </td>
              <td className="tbldta">
                <div className="d-flex UpPrdtalay ">
                  <div className="blubx">2.74</div>
                  <div className="pinkbx">2.8</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailsTable;
