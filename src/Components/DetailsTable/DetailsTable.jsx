import React from "react";

function DetailsTable() {
  return (
    <div>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th>
                                  <th scope="col">id</th> */}
              <th scope="col">Name</th>
              <th scope="col"></th>
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
          <tbody>
            <tr>
              <th scope="row"></th>
              <td className="glo">
                <span className="Today">Today</span>{" "}
                <span className="Today">16:30</span> <br />{" "}
                <span className="fon">F1 F BM</span>
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
