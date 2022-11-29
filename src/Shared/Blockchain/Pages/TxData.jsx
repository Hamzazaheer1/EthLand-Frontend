import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Web3 from "web3";
import { useContext } from "react";
import { themeContext } from "../../../Context";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";

const TxData = () => {
  const Navigate = useNavigate();
  let { blockid } = useParams();

  const [blockData, setBlockData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const checkLastBlock = async () => {
      setIsLoading(true);
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      await web3.eth.getBlock(blockid).then((i) => {
        setBlockData(i);
      });
      setIsLoading(false);
    };
    checkLastBlock();
  }, [blockid]);

  return (
    <Container className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        <i
          onClick={() => {
            Navigate("/blockchain");
          }}
          className="bi bi-arrow-left-circle-fill cursor-pointer"
          style={{ marginRight: "1rem" }}
        ></i>
        Block
        <p style={{ color: "gray", fontSize: "1rem", marginTop: "1rem" }}>
          &nbsp;&nbsp;Detailed Information about an individual Block
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
        <div>
          <Row className="mt-4">
            <h5>Block Height: {blockid}</h5>
          </Row>
          <Row>
            {blockData && (
              <div>
                <Alert key={"secondary"} variant={"secondary"}>
                  <Row>
                    <Col sm={2}>
                      <h6>TimeStamp:</h6>
                      <h6>hash:</h6>
                      <h6>nonce: </h6>
                      <h6>transactions Count:</h6>
                    </Col>
                    <Col sm={6}>
                      <h6 style={{ color: "black" }}>{blockData.timestamp}</h6>
                      <h6 style={{ color: "black" }}>{blockData.hash}</h6>
                      <h6 style={{ color: "black" }}>{blockData.nonce}</h6>
                      <h6 style={{ color: "black" }}>
                        {blockData.transactions.length}
                      </h6>
                    </Col>
                    <Col sm={4}></Col>
                  </Row>
                </Alert>

                <h5>Transaction List</h5>
                {blockData.transactions.map((item) => (
                  <div>
                    <Alert key={"secondary"} variant={"secondary"}>
                      <h6>
                        Transaction <span className="blackData">{item}</span>
                      </h6>
                    </Alert>
                  </div>
                ))}
              </div>
            )}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default TxData;
