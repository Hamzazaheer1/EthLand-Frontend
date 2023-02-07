import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";
import { useContext } from "react";
import { themeContext } from "../../../Context";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";

const SingleTx = () => {
  const Navigate = useNavigate();
  let { txid, bid } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState({});

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const getTransactionDetail = async () => {
      setIsLoading(true);
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      await web3.eth.getTransaction(txid).then((tx) => {
        setTransaction(tx);
      });
      setIsLoading(false);
    };

    getTransactionDetail();
  }, [txid]);

  // getTransactionDetail(
  //   "0x0b549c39dae7de7f8044e6ffc7a2957c0c2bb7ff822ab51afab9ddfc04333ccf"
  // );

  //   function convertWeiToPKR(weiAmount) {
  //     const ethPriceInPKR = 448802;
  //     const ethToWei = 1e18;
  //     return (weiAmount / ethToWei) * ethPriceInPKR;
  //   }

  console.log({ transaction });

  return (
    <Container className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        <i
          onClick={() => {
            Navigate(`/txdata/${bid}`);
          }}
          className="bi bi-arrow-left-circle-fill cursor-pointer"
          style={{ marginRight: "1rem" }}
        ></i>
        Block
        <p style={{ color: "gray", fontSize: "1rem", marginTop: "1rem" }}>
          &nbsp;&nbsp;Detailed Information about an individual Transaction
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
        <Row>
          {transaction && (
            <div>
              <Alert key={"secondary"} variant={"secondary"}>
                <Row>
                  <Col sm={2}>
                    <h6>Transaction Hash:</h6>
                    <h6>Block:</h6>
                    <h6>From:</h6>
                    <h6>Interacted With (To): </h6>
                    {/* <h6>Value:</h6> */}
                  </Col>
                  <Col sm={6}>
                    <h6 style={{ color: "black" }}>{transaction.hash}</h6>
                    <h6 style={{ color: "black" }}>
                      {transaction.blockNumber}
                    </h6>
                    <h6 style={{ color: "black" }}>{transaction.from}</h6>
                    <h6 style={{ color: "black" }}>{transaction.to}</h6>
                    {/* <h6 style={{ color: "black" }}>
                        {convertWeiToPKR(transaction.value)}
                      </h6> */}
                  </Col>
                  <Col sm={4}></Col>
                </Row>
              </Alert>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default SingleTx;
