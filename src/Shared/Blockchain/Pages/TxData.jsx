import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const TxData = () => {
  const Navigate = useNavigate();
  let { blockid } = useParams();

  const [blockData, setBlockData] = useState();

  useEffect(() => {
    const checkLastBlock = async () => {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      const block = web3.eth.getBlock(blockid).then((i) => {
        setBlockData(i);
      });
    };
    checkLastBlock();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <h2
            onClick={() => {
              Navigate("/blockchain");
            }}
          >
            <FaBackward />
          </h2>
          <h2>Block {blockid}</h2>
        </Row>
        <Row>
          {blockData && (
            <div>
              <p>TimeStamp: {blockData.timestamp}</p>
              <p>hash: {blockData.hash}</p>
              <p>nonce: {blockData.nonce}</p>
              <p>transactions Count: {blockData.transactions.length}</p>
              {blockData.transactions.map((item) => (
                <div>
                  <h5>Transaction List</h5>
                  <p>Transaction {item}</p>
                </div>
              ))}
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default TxData;
