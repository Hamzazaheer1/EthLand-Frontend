import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Form from "react-bootstrap/Form";
import Web3 from "web3";

const LandForSale = () => {
  let selectedAccount;
  let ContractInstance;

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [updateInfoSpinner, setUpdateInfoSpinner] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [adminCount, setAdminCount] = useState([]);
  const [LandsInfo, setLandsInfo] = useState([]);
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
    setIsLoading(true);
    for (let i = 0; i < adminCount.length; i++) {
      await newInstance.methods
        .LandR(adminCount[i])
        .call()
        .then((tx) => {
          setLandsInfo((LandsInfo) => [...LandsInfo, tx]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLoading(false);
  };

  const makeItForSale = async () => {
    setUpdateInfoSpinner(true);

    await newInstance.methods
      .makeItforSell(idNumber, isForSale, price)
      .send({ from: newSelected });

    setUpdateInfoSpinner(false);
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
          <Form.Group className="mb-3" controlId="formNumber">
            <Form.Text className="text-muted" style={{ fontWeight: "bold" }}>
              Selected Land = {id}
            </Form.Text>
            <br />
            <Form.Label style={{ color: "var(--yellow)", fontWeight: "bold" }}>
              Land Identity Number
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your land identity number"
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
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
            onClick={() => {
              makeItForSale();
            }}
          >
            {updateInfoSpinner ? (
              <div class="spinner-border" role="status"></div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </Col>
        <Col sm={3}></Col>
        <Col sm={5}>
          <span style={{ fontWeight: "bold", color: "grey" }}>
            Follow the steps to make you land availible for sale <br />
            1- Enter Land Identity Number from Table1 based on number. <br />
            2- Click on Action Button of a selected Land. <br />
            3- Enter Your desired Price and make it availible for sale.
            <br />
            4- Click on submit button to make it visible to all users
            <br />
          </span>
        </Col>
      </Row>

      <span style={{ color: "var(--yellow)", fontWeight: "bold" }}>
        1 - Land Identity Number
      </span>
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
          </tr>
        </thead>
        <tbody>
          {adminCount &&
            adminCount.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{adminCount[index]}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <button
        style={{
          marginBottom: "2rem",
          marginTop: "2rem",
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
      <br />
      <span style={{ color: "var(--yellow)", fontWeight: "bold" }}>
        2 - Land Info
      </span>
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
            {LandsInfo &&
              LandsInfo.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.landId}</td>
                  <td>{item.landPrice}</td>
                  <td>{item.isforSell ? <td>True</td> : <td>False</td>}</td>
                  <td>
                    <button
                      className="g-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        setAllStates(item.landId);
                      }}
                    >
                      Action
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

export default LandForSale;
