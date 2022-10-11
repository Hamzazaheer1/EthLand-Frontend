import React, { useState } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../../contract";
import { useContext } from "react";
import { themeContext } from "../../../../Context";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const LandDetailedInfo = () => {
  let selectedAccount;
  let ContractInstance;
  let { landid } = useParams();
  const [landlist, setLandlist] = useState();
  const [landData, setLandData] = useState([]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

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
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  const getLandsId = async () => {
    await ContractInstance.methods
      .myAllLands(selectedAccount)
      .call()
      .then((data) => {
        setLandlist(data);
      });

    getLandsData();
  };

  const getLandsData = async () => {
    await ContractInstance.methods
      .LandR(landlist[landid - 1])
      .call()
      .then((data) => {
        setLandData((prevlandData) => [...prevlandData, data]);
        console.log(data);
      });
  };

  console.log(landData);

  return (
    <Container>
      {init()}
      <Row className="mt-5">
        <Col sm={4}></Col>
        <Col sm={4}>
          <h2 style={{ fontWeight: "bold" }}>Land Detailed Info</h2>
        </Col>
        <Col sm={4}>
          <button
            className="y-btn"
            onClick={() => {
              getLandsId();
            }}
          >
            Display Fard
          </button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Table
          bordered
          hover
          style={{
            color: darkMode ? "white" : "black",
          }}
        >
          <thead
            style={{
              backgroundColor: darkMode ? "#F5C32C" : "white",
              color: darkMode ? "black" : "black",
            }}
          >
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
            </tr>
            <tr>
              <th>Khaiwat No.</th>
              <th>OwnerName + FatherName/HusbandName</th>
              <th>Co. Shares</th>
              <th>Location</th>
              <th>Specific share</th>
              <th>Share accordance with area [acre-kanal-marla]</th>
              <th>Khasra No.</th>
              <th>Nature of property</th>
            </tr>
          </thead>
          <tbody>
            {landData.length > 0 ? (
              <tr>
                <td>{landData[0].khaiwatNumber}</td>
                <td>{landData[0].name}</td>
                <td>{landData[0].CoShares}</td>
                <td>{landData[0].location}</td>
                <td>{landData[0].specificShareinJointAccount}</td>
                <td>{landData[0].specificAreainaccordancewiththeShare}</td>
                <td>{landData[0].khasraNo}</td>
                <td>{landData[0].natureOfProperty}</td>
              </tr>
            ) : (
              <h5>Click display fard to unhide all the information.</h5>
            )}
          </tbody>
        </Table>
      </Row>
      <Row className="mt-5">
        <Col sm={5}></Col>
        <Col sm={2}>
          <button
            className="y-btn"
            onClick={() => {
              window.print();
            }}
          >
            Print Fard
          </button>
        </Col>
        <Col sm={5}></Col>
      </Row>
    </Container>
  );
};

export default LandDetailedInfo;
