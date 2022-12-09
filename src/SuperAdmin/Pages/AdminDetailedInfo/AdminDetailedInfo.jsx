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
        <Alert key={"secondary"} variant={"secondary"}>
          <Row className="mt-4">
            <Col sm={2} style={{ color: "grey" }}>
              <h6>Name:</h6>
              <h6>Designation:</h6>
              <h6>Age:</h6>
              <h6>City: </h6>
              <h6>Public Address:</h6>
            </Col>
            <Col sm={6}>
              <h6 style={{ color: "black" }}>{adminCount.name}</h6>
              <h6 style={{ color: "black" }}>{adminCount.designation}</h6>
              <h6 style={{ color: "black" }}>{adminCount.age}</h6>
              <h6 style={{ color: "black" }}>{adminCount.city}</h6>
              <h6 style={{ color: "black" }}>{adminCount._addr}</h6>
            </Col>
          </Row>
        </Alert>
      )}
    </Container>
  );
};

export default UsersDetailedInfo;
