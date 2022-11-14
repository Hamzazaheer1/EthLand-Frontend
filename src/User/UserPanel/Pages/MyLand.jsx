import React, { useState, useEffect } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { useContext } from "react";
import { themeContext } from "../../../Context";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import axios from "axios";

const MyLand = () => {
  const Navigate = useNavigate();
  const [landData, setLandData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  let selectedAccount;
  let ContractInstance;
  let landids;

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
    setIsLoading(true);
    await ContractInstance.methods
      .myAllLands(selectedAccount)
      .call()
      .then((data) => {
        landids = data;
      });

    for (let i = 0; i < landids.length; i++) {
      ContractInstance.methods
        .LandR(landids[i])
        .call()
        .then((data) => {
          setLandData((prevlandData) => [...prevlandData, data]);
        });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `https://ethland-backend.herokuapp.com/api/v1/lands/getlandbyPK/${selectedAccount}`
        );
        console.log(resp.data.data);
        setResponse(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, [selectedAccount]);

  return (
    <Container>
      {init()}
      <br />
      <Row>
        <Col sm={8} className="mt-3">
          <h2>My Lands</h2>
        </Col>
        <Col sm={4} className="mt-2">
          <button className="g-btn" onClick={getLandsId}>
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
            <th>#</th>
            <th>Khaiwat No</th>
            {/* <th>Khatuni No</th> */}
            <th>Location</th>
            <th>KhasraNumber</th>
            <th>Area</th>
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
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.khaiwatNumber}</td>
                  {/* <td>{item.KhatuniCultivatorNo}</td> */}
                  <td>{item.location}</td>
                  <td>{item.khasraNo}</td>
                  <td>{item.specificAreainaccordancewiththeShare}</td>
                  <td>{item.landPrice}</td>
                  {item.isLandVerified ? (
                    <td>Verified</td>
                  ) : (
                    <td>Not Verified</td>
                  )}
                  {item.isforSell ? <td>True</td> : <td>False</td>}
                  <td>
                    <button
                      className="g-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        Navigate(`/detailed-info/${item.khaiwatNumber}`);
                      }}
                    >
                      Detailed Info
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No data to be found....</p>
            )}
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default MyLand;
