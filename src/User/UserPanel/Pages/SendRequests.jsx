import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";

const SendRequests = () => {
  let selectedAccount;
  let ContractInstance;

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [requestCount, setRequestCount] = useState([]);
  const [requestInfo, setRequestInfo] = useState([]);
  const [price, setPrice] = useState(0);
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
      .mySentLandRequests(selectedAccount)
      .call()
      .then((tx) => {
        setRequestCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const getLandPrice = async (s_id) => {
    await newInstance.methods
      .landPrice(s_id)
      .call()
      .then((tx) => {
        setPrice(tx);
      });
  };

  const makeLandPayment = async (s_id) => {
    await newInstance.methods.makePayment(s_id).send({ from: newSelected });

    alert("Payment has been made Successfully");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>Send Requests</h2>
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
                  Land Price:
                  <br />
                  <hr />
                  <p
                    style={{
                      textDecoration: "underline",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getLandPrice(item.landId);
                    }}
                  >
                    Revel Land Price
                  </p>
                  <p
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      makeLandPayment(item.reqId);
                    }}
                  >
                    Make Payment
                  </p>
                </Col>
                <Col sm={1}></Col>
                <Col sm={9}>
                  {item.reqId} <br /> {item.landId} <br /> {item.buyerId} <br />
                  {item.requestStatus * 1 === 0 ? (
                    <span>Requested</span>
                  ) : item.requestStatus * 1 === 1 ? (
                    <span>Accepted</span>
                  ) : item.requestStatus * 1 === 2 ? (
                    <span>Rejected</span>
                  ) : item.requestStatus * 1 === 3 ? (
                    <span>Payment Done</span>
                  ) : item.requestStatus * 1 === 4 ? (
                    <span>Completed</span>
                  ) : (
                    <span>some problem has occured in getting data</span>
                  )}
                  <br />
                  {item.isPaymentDone === true ? (
                    <span>Payment Done</span>
                  ) : (
                    <span>Payment Pending</span>
                  )}
                  <br />
                  {price} PKR
                </Col>
              </Row>
            </Alert>
          ))}
      </Row>
    </Container>
  );
};

export default SendRequests;
