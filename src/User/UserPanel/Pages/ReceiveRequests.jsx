import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Form from "react-bootstrap/Form";
import Web3 from "web3";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

const ReceiveRequests = () => {
  let selectedAccount;
  let ContractInstance;

  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [updateInfoSpinner, setUpdateInfoSpinner] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [requestCount, setRequestCount] = useState([]);
  const [requestInfo, setRequestInfo] = useState([]);
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [idNumber, setIdNumber] = useState(0);
  const [isForSale, setIsForSale] = useState(false);
  const [newInstance, setNewInstance] = useState();

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];
            setNewSlected(selectedAccount);
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            setNewInstance(ContractInstance);
            returnAllRequestIds();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllRequestIds = async () => {
    await ContractInstance.methods
      .myReceivedLandRequests(selectedAccount)
      .call()
      .then((tx) => {
        setRequestCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("count", requestCount);

  const returnAllRequestInfo = async () => {
    setIsLoading(true);
    for (let i = 0; i < requestCount.length; i++) {
      await newInstance.methods
        .LandRequestMapping(requestCount[i])
        .call()
        .then((tx) => {
          setRequestInfo((requestInfo) => [...requestInfo, tx]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLoading(false);
  };

  console.log("req info ", requestInfo);

  const acceptBuyRequest = async (s_id) => {
    await newInstance.methods.acceptRequest(s_id).send({ from: newSelected });

    alert("Request Accepted Successfully");
  };

  const rejectBuyRequest = async (s_id) => {
    await newInstance.methods.rejectRequest(s_id).send({ from: newSelected });

    alert("Request Rejected Successfully");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        Receive Land Requests
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <button
        className="g-btn"
        onClick={() => {
          returnAllRequestInfo();
        }}
      >
        Show Requests
      </button>
      <Row className="mt-5">
        {requestInfo &&
          requestInfo.map((item, index) => (
            <Alert key={"success"} variant={"success"}>
              <Row>
                <Col sm={2}>
                  Request Id:
                  <br />
                  Land Id:
                  <br />
                  Buyer Info:
                  <br />
                  Request Status:
                  <br />
                  Is Payment Done:
                  <br />
                  <hr />
                  <p
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      acceptBuyRequest(item.reqId);
                    }}
                  >
                    Accept Request
                  </p>
                  <p
                    style={{
                      textDecoration: "underline",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      rejectBuyRequest(item.reqId);
                    }}
                  >
                    Reject Request
                  </p>
                </Col>
                <Col sm={1}></Col>
                <Col sm={9}>
                  {item.reqId} <br /> {item.landId} <br /> {item.buyerId} <br />
                  {item.requestStatus * 1 === 0 ? (
                    <span>requested</span>
                  ) : item.requestStatus * 1 === 1 ? (
                    <span>accepted</span>
                  ) : item.requestStatus * 1 === 2 ? (
                    <span>rejected</span>
                  ) : item.requestStatus * 1 === 3 ? (
                    <span>paymentdone</span>
                  ) : item.requestStatus * 1 === 4 ? (
                    <span>commpleted</span>
                  ) : (
                    <span>some problem has occured in getting data</span>
                  )}
                  <br />
                  {item.isPaymentDone === true ? (
                    <span>Payment Done</span>
                  ) : (
                    <span>Payment Pending</span>
                  )}
                </Col>
              </Row>
            </Alert>
          ))}
      </Row>
    </Container>
  );
};

export default ReceiveRequests;
