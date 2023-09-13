import React from "react";
// import {PiTelevisionSimple} from "react-icons/pi"
import "./DetailsTable.css";
import DashboardMatch_Slider from "../DashboardMatch_Slider/DashboardMatch_Slider";
import Dashboard_mobile_slider from "../Dashboard_mobile_slider/Dashboard_mobile_slider";

function DetailsTable() {
  return (
    <div>
      <div className="table-responsive-sm d-none d-lg-block">
        <table className="table tblBG">
          <thead>
            <tr>
              <th className="new_table" scope="col">
                Name
              </th>
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
              <th className="clr_the" scope="row">
                {" "}
                Live
              </th>
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

            <tr className="borber">
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

            <tr className="borber">
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

            <tr className="borber">
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

            <tr>
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

      <div className="table_for_mobile  d-block d-lg-none">
      <div>
        <div className="row mt-3">
          <div className="col-2 right_borde">
            <span className="mbl_libe">Live</span>
          </div>
          <div className="col-7">
            <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
            <p className="about_game text-truncate">(County Championship Division 1)</p>
          </div>
          <div className="col-2">
            <span className="me-1 last_icons">F</span>
            <span className="last_icons">F1</span>
            <i class="icon-tv d-icon"></i>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
        </div>
</div>
      <div>
        <div className="row mt-3">
          <div className="col-2 right_borde">
            <span className="mbl_libe">Live</span>
          </div>
          <div className="col-7">
            <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
            <p className="about_game text-truncate">(County Championship Division 1)</p>
          </div>
          <div className="col-2">
            <span className="me-1 last_icons">F</span>
            <span className="last_icons">F1</span>
            <i class="icon-tv d-icon"></i>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
        </div>
</div>
      <div>
        <div className="row mt-3">
          <div className="col-2 right_borde">
            <span className="mbl_libe">Live</span>
          </div>
          <div className="col-7">
            <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
            <p className="about_game text-truncate">(County Championship Division 1)</p>
          </div>
          <div className="col-2">
            <span className="me-1 last_icons">F</span>
            <span className="last_icons">F1</span>
            <i class="icon-tv d-icon"></i>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
        </div>
</div>
      <div>
        <div className="row mt-3">
          <div className="col-2 right_borde">
            <span className="mbl_libe">Live</span>
          </div>
          <div className="col-7">
            <p className="about_game mb-0 text-truncate">Warwickshire v Northamptonshire</p>
            <p className="about_game text-truncate">(County Championship Division 1)</p>
          </div>
          <div className="col-2">
            <span className="me-1 last_icons">F</span>
            <span className="last_icons">F1</span>
            <i class="icon-tv d-icon"></i>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">2.73</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">2.73</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">10</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
          <div className="col-4">
            <div className="clr_two_boxes d-flex gap-1">
              <div className="blue_box"><p className="mb-0 text-dark  ">6</p></div>
              <div className="pink_box"><p className="mb-0 text-dark  ">3</p></div>
            </div>
          </div>
        </div>
</div>



      
{/* <Dashboard_mobile_slider/> */}
      
      </div>
    </div>
  );
}

export default DetailsTable;
