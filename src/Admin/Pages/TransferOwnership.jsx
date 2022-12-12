import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { themeContext } from "../../Context";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingSpinner from "../../Utils/LoadingSpinner/LoadingSpinner";
import Form from "react-bootstrap/Form";
import Web3 from "web3";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

const TransferOwnership = () => {
  let selectedAccount;
  let ContractInstance;

  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [updateInfoSpinner, setUpdateInfoSpinner] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [landsCount, setLandsCount] = useState([]);
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
            returnAllLandsIds();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllLandsIds = async () => {
    await ContractInstance.methods
      .ReturnAllLandList()
      .call()
      .then((tx) => {
        setLandsCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("TO count", landsCount);

  const returnAllRequestInfo = async () => {
    setIsLoading(true);
    for (let i = 0; i < landsCount.length; i++) {
      await newInstance.methods
        .LandRequestMapping(landsCount[i])
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

export default TransferOwnership;
