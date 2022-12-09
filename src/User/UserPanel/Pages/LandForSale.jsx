import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Web3 from "web3";

const LandForSale = () => {
  let selectedAccount;
  let ContractInstance;

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [updateInfoSpinner, setUpdateInfoSpinner] = useState(false);

  const [adminCount, setAdminCount] = useState([]);
  const [LandsInfo, setLandsInfo] = useState();

  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [khasraNo, setKhasraNo] = useState("");
  const [isForSale, setIsForSale] = useState(false);

  const [newInstance, setNewInstance] = useState();

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
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
            setNewInstance(ContractInstance);
            returnAllLandIds();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllLandIds = async () => {
    await ContractInstance.methods
      .myAllLands(selectedAccount)
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const returnAllLandInfo = async () => {
    for (let i = 0; i < adminCount.length; i++) {
      await newInstance.methods
        .LandR(adminCount[i])
        .call()
        .then((tx) => {
          setLandsInfo(tx);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pushToBlockchain = async (landId, isForSale) => {
    setIsLoading(true);

    await newInstance.methods
      .makeItforSell(landId, isForSale)
      .send({ from: selectedAccount });

    setIsLoading(false);
    alert("Land is now Availible for Purchase to all users");
  };

  const setAllStates = (id) => {
    setId(id);
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        Make Your Lands Avaialible For Sale
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />

      <Row>
        <Col sm={4}>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Text className="text-muted" style={{ fontWeight: "bold" }}>
              Selected Land = {id}
            </Form.Text>
            <br />
            <Form.Label style={{ color: "var(--yellow)", fontWeight: "bold" }}>
              Land Price
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your land price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label style={{ color: "var(--yellow)", fontWeight: "bold" }}>
              Make it For Sale
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="[Yes]"
              onChange={(e) => setIsForSale(true)}
            />
            <Form.Check
              type="checkbox"
              label="[No]"
              onChange={(e) => setIsForSale(false)}
            />
          </Form.Group>
          <button
            style={{
              marginBottom: "2rem",
              height: "2rem",
              padding: "0px 10px 0px 10px",
            }}
            className="g-btn"
            // onClick={() => {
            //   makeItforSaleBackend();
            // }}
          >
            {updateInfoSpinner ? (
              <div class="spinner-border" role="status"></div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </Col>
        <Col sm={4}></Col>
        <Col sm={4}></Col>
      </Row>

      <button
        style={{
          marginBottom: "2rem",
          height: "2rem",
          padding: "0px 10px 0px 10px",
        }}
        className="g-btn"
        onClick={() => {
          returnAllLandInfo();
        }}
      >
        Reveal Lands
      </button>
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
            <th>Land Id</th>
            <th>Price</th>
            <th>Is For Sale</th>
            <th>Manage Info For Sell</th>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <tbody>
            {LandsInfo && (
              <tr>
                <td>1</td>
                <td>{LandsInfo.landId}</td>
                <td>{LandsInfo.landPrice}</td>
                <td>{LandsInfo.isforSell ? <td>True</td> : <td>False</td>}</td>
                <td>
                  <button
                    className="g-btn"
                    style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                    onClick={() => {
                      setAllStates(LandsInfo.landId);
                    }}
                  >
                    Action
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default LandForSale;
