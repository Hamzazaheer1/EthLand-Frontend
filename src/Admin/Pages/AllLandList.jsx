import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { useContext } from "react";
import { themeContext } from "../../Context";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Utils/LoadingSpinner/LoadingSpinner";

const AllLandList = () => {
  let selectedAccount;
  let ContractInstance;
  const Navigate = useNavigate();

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [landIds, setLandIds] = useState();
  const [landData, setLandData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

          returnAllLandsList();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  //to return landlist
  const returnAllLandsList = async () => {
    await ContractInstance.methods
      .ReturnAllLandList()
      .call()
      .then((tx) => {
        setLandIds(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to returnlandsData
  const getLandsData = async () => {
    setIsLoading(true);
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

          for (let i = 0; i < landIds.length; i++) {
            ContractInstance.methods
              .LandR(landIds[i])
              .call()
              .then((data) => {
                setLandData((prevlandData) => [...prevlandData, data]);
              });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  //to verify a land
  const verifyALand = async (land_id) => {
    await ContractInstance.methods
      .verifyLand(land_id)
      .send({ from: selectedAccount });
    alert("Land Verified Sucessfully");
  };

  return (
    <Container>
      {init()}
      <br />
      <Row>
        <Col sm={8} className="mt-3">
          <h2>List of all the registered Lands</h2>
        </Col>
        <Col sm={4} className="mt-2">
          <button
            className="y-btn"
            onClick={() => {
              getLandsData();
            }}
          >
            Reveal My Lands
          </button>
        </Col>
      </Row>
      <br />
      <Table
        responsive="sm"
        bordered
        style={{
          color: darkMode ? "white" : "black",
        }}
      >
        <thead>
          <tr>
            <th>Khaiwat No</th>
            <th>Name</th>
            <th>Location</th>
            <th>KhasraNumber</th>
            <th>CoShares</th>
            <th>Area</th>
            <th>SpecificShare</th>
            <th>NatureOfProperty</th>
            <th>Price</th>
            <th>IsVerified</th>
            <th>IsForSale</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <tbody>
            {landData.length > 0 ? (
              landData.map((item, index) => (
                <tr key={index + 1}>
                  <td>{item.khaiwatNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.khasraNo}</td>
                  <td>{item.CoShares}</td>
                  <td>{item.specificAreainaccordancewiththeShare}</td>
                  <td>{item.specificShareinJointAccount}</td>
                  <td>{item.natureOfProperty}</td>
                  <td>{item.landPrice}</td>
                  {item.isLandVerified ? (
                    <td>Verified</td>
                  ) : (
                    <td>Not Verified</td>
                  )}
                  {item.isforSell ? <td>True</td> : <td>False</td>}
                  <td>
                    <button
                      className="y-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        verifyALand(item.khaiwatNumber);
                      }}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No data to be found....</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default AllLandList;
