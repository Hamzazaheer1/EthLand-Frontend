import React, { useEffect, useState, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { themeContext } from "../../../Context";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";

const UsersDetailedInfo = () => {
  let selectedAccount;
  let ContractInstance;
  let { addr } = useParams();
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [adminCount, setAdminCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            returnAllUsersData();
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllUsersData = async () => {
    await ContractInstance.methods
      .AdminMapping(addr)
      .call()
      .then((tx) => {
        setAdminCount(tx);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <Container className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        <i
          onClick={() => {
            Navigate("/superadminpanel");
          }}
          className="bi bi-arrow-left-circle-fill cursor-pointer"
          style={{ marginRight: "1rem" }}
        ></i>
        Admin's
        <p style={{ color: "gray", fontSize: "1rem", marginTop: "1rem" }}>
          &nbsp;&nbsp;Detailed Information
        </p>
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        // <Alert key={"secondary"} variant={"secondary"}>
        //   <Row className="mt-4">
        //     <Col sm={2} style={{ color: "grey" }}>
        //       <h6>Name:</h6>
        //       <h6>Designation:</h6>
        //       <h6>Age:</h6>
        //       <h6>City: </h6>
        //       <h6>Public Address:</h6>
        //     </Col>
        //     <Col sm={6}>
        //       <h6 style={{ color: "black" }}>{adminCount.name}</h6>
        //       <h6 style={{ color: "black" }}>{adminCount.designation}</h6>
        //       <h6 style={{ color: "black" }}>{adminCount.age}</h6>
        //       <h6 style={{ color: "black" }}>{adminCount.city}</h6>
        //       <h6 style={{ color: "black" }}>{adminCount._addr}</h6>
        //     </Col>
        //   </Row>
        // </Alert>
        <div class="page-content page-container mob" id="page-content">
          <div class="padding">
            <div class="row container d-flex justify-content-center">
              <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-4 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
                            style={{ width: "80px", height: "80px" }}
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 class="f-w-600">{adminCount.name}</h6>
                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Designation</p>
                            <h6 class="text-muted f-w-400">
                              {adminCount.designation}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Age</p>
                            <h6 class="text-muted f-w-400">{adminCount.age}</h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <p class="m-b-10 f-w-600">City</p>
                            <h6 class="text-muted f-w-400">
                              {adminCount.city}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <p class="m-b-10 f-w-600">Public Address</p>
                            <h6 class="text-muted f-w-400">
                              {adminCount._addr}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UsersDetailedInfo;
