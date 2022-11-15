import React, { useState, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";

const MyLand = () => {
  const Navigate = useNavigate();
  const [landData, setLandData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [pkView, setPkView] = useState("");

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
          setPkView(accounts[0]);
          selectedAccount = accounts[0];
          console.log("pk inside ", selectedAccount);
          const web3 = new Web3(provider);
          ContractInstance = new web3.eth.Contract(
            CONTACT_ABI,
            CONTACT_ADDRESS
          );
          getLandsByPK(selectedAccount);
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

  const getLandsByPK = async (x) => {
    console.log("key ", x);
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://ethland-backend.herokuapp.com/api/v1/lands/getlandbyPK/${x}`
      );
      console.log(resp.data.data);
      setResponse(resp.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <br />
      <Row>
        <Col sm={8} className="mt-3">
          <h2>My Lands</h2>
          <p>{pkView}</p>
        </Col>
        <Col sm={4} className="mt-2">
          <button className="g-btn" onClick={init}>
            Reveal My Lands
          </button>
        </Col>
      </Row>
      {console.log("ssss ", pkView)}
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
            <th>Location</th>
            <th>Khaiwat No.</th>
            <th>Khasra No.</th>
            <th>Area</th>
            <th>Is For Sale</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <tbody>
            {response &&
              response.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.location}</td>
                  <td>{item.khaiwatNo}</td>
                  <td>{item.khasraNumber}</td>
                  <td>{item.area}</td>
                  <td>{item.isForSale ? <td>True</td> : <td>False</td>}</td>
                  <td>
                    <button
                      className="g-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        Navigate(`/detailed-info/${item._id}`);
                      }}
                    >
                      Detailed Info
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default MyLand;
