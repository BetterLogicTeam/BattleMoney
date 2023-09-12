import React, { useEffect, useState } from "react";
import "./Login_modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API } from "../../API";
import swal from "sweetalert";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export default function Login_modal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const IP_address = async () => {
    try {
      let res = await axios.get(`https://api.ipify.org?format=json`);
      res = res.data;
      console.log("IP_Addressres==>", res);
      setData(res.ip);
    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  };

  useEffect(() => {
    IP_address();
  }, []);

  const Login_APi = async () => {
    try {
      let responce = await API.post("/login", {
        username: UserName,
        password: password,
        ipaddress: data,
      });
      responce = responce.data.data;
      // console.log("res", responce);
      let result = `User Name : ${responce.resultusername} & User Id : ${responce.resultid}`;
      if (responce.result == "Successfull") {
        sessionStorage.setItem("user", JSON.stringify(responce));
        swal({
          title: "Success..!",
          text: "Login has been successfull !!",
          icon: "success",
          button: "OK",
        }).then((okay) => {
          if (okay) {
            window.location.href = "./Dashboard/Cricket/4";
          }
        });
      } else {
        swal({
          title: "Registration Error..!!",
          text: responce.result,
          icon: "error",
          button: "OK",
        });
      }
    } catch (e) {
      console.log("Something Error", e);
    }
  };

  // const handle_close= ()=>{
  //   setModalShow(false)
  // }
  return (
    <div className="Main_lgon_mdoal">
      <Modal
        {...props}
        className="full_modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="login_headr">
          <Modal.Title
            className="arrange_ment"
            id="contained-modal-title-vcenter"
          >
            <h4 className="Main_login_heading">Login</h4>
            <span className="circlue_red ">
              <IoMdClose
                className="login_icons"
                onClick={props.onHide}
              ></IoMdClose>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="conten_body">
          <div className="body_content_login">
            <div className="main_card_login">
              <label htmlFor="username">Username</label> <br />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUserName(e.target.value)}
                    // placeholder="User Id"
                    name="username"
                className="input_login"
             
              />
              <div className="mt-4">
                <label htmlFor="password">Password</label> <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input_login"
                  onChange={(e) => setPassword(e.target.value)}
                   
                    name="pswd"
                />
              </div>
              <p className="term_cond">
                I am at least <span className="red_hu"> 18 years </span> of age
                and I have read, accept and agree to the{" "}
                <span className="green_hun">
                  {" "}
                  Terms and Conditions , Responsible Gaming , GamCare, Gambling
                  Therapy{" "}
                </span>
              </p>
             
                {" "}
                <button className="login_btn" onClick={() => Login_APi() }    >
                  {" "}
                  Login
                </button>
             
              <p className="term_cond">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="green_hun"> Privacy Policy </span> and{" "}
                <span className="green_hun">Terms of Service </span> apply.
              </p>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}
