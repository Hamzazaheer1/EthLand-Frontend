import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { themeContext } from "../../Context";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";

const TransferOwnership = () => {
  let selectedAccount;
  let ContractInstance;

  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [requestCount, setRequestCount] = useState([]);
  const [requestInfo, setRequestInfo] = useState([]);
  const [newInstance, setNewInstance] = useState();
  const [landInfo, setLandInfo] = useState([]);

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
            returnPaymentDoneIds();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnPaymentDoneIds = async () => {
    await ContractInstance.methods
      .returnPaymentDoneList()
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

  const viewLandDetail = async (landId) => {
    await newInstance.methods
      .LandR(landId)
      .call()
      .then((tx) => {
        setLandInfo(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transferLandOwnership = async (s_id) => {
    await newInstance.methods
      .transferOwnership(s_id)
      .send({ from: newSelected });

    alert(
      "Land Ownership Transfer Request has been initiated from Smart Contract..."
    );
    Navigate(`/landtransfer/${landInfo.landId}`);
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        Manage Lands Ownership
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
          requestInfo.reverse().map((item, index) => (
            <Alert key={index + 1} variant={"success"}>
              <Row>
                <Col sm={2}>
                  Request Id:
                  <br />
                  Land Id:
                  <br />
                  Seller Info:
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
                      transferLandOwnership(item.reqId);
                    }}
                  >
                    Transfer Ownership
                  </p>
                </Col>
                <Col sm={1}></Col>
                <Col sm={4} style={{ fontWeight: "600" }}>
                  {item.reqId} <br />{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      viewLandDetail(item.landId);
                    }}
                  >
                    View Land Info
                  </span>
                  <br />
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      Navigate(`/detailed-user-info/${item.sellerId}`);
                    }}
                  >
                    View Seller Info
                  </span>
                  <br />
                  <span
                    style={{
                      textDecoration: "underline",
                      color: "green",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      Navigate(`/detailed-user-info/${item.buyerId}`);
                    }}
                  >
                    View Buyer Info
                  </span>
                  <br />
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
                </Col>
                <Col sm={5}>
                  <h2 style={{ color: "black" }}>Land Info</h2>
                  <span>Location: {landInfo.location}</span>
                  <br />
                  <span>Area: {landInfo.area}</span>
                  <br />
                  <br />
                  <button
                    className="g-btn"
                    onClick={() => {
                      Navigate(`/detailedlandinfobyadmin/${landInfo.landId}`);
                    }}
                  >
                    View complete land info
                  </button>
                </Col>
              </Row>
            </Alert>
          ))}
      </Row>
    </Container>
  );
};

export default TransferOwnership;
