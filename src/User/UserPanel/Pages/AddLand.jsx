import React, { useState } from "react";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { DivisionList, DistrictList, TehsilList } from "./LandData";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import "./AddLand.css";

const AddLand = () => {
  const [stateCount, setStateCount] = useState(0);
  const [homepage, setHomepage] = useState("Homepage");
  const [selectedDivision, setSeletedDivision] = useState("");
  const [selectedDistrict, setSeletedDistrict] = useState("");
  const [selectedTehsil, setSeletedTehsil] = useState("");
  const [name, setName] = useState("");
  const [coShares, setCoShares] = useState("");
  const [location, setlocation] = useState("");
  const [shareinJoint, setShareinJoint] = useState("");
  const [specificArea, setSpecificArea] = useState("");
  const [khasraNumber, setKhasraNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [nature, setNature] = useState("");

  let result = selectedDivision.concat(
    " ",
    selectedDistrict,
    " ",
    selectedTehsil
  );
  let selectedAccount;
  let ContractInstance;

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

  const registerLand = async (
    _name,
    _coShare,
    _location,
    _nature,
    _specificJoint,
    _area,
    _khasraNo,
    _price
  ) => {
    await ContractInstance.methods
      .addLand(
        _name,
        _coShare,
        _location,
        _nature,
        _specificJoint,
        _area,
        _khasraNo,
        _price
      )
      .send({ from: selectedAccount });
  };

  return (
    <div>
      <Alert variant="dark">
        <b>
          <span
            onClick={() => {
              setStateCount(0);
              setHomepage("Homepage");
            }}
            className="linkEffect"
          >
            {homepage} /
          </span>
          <span
            onClick={() => {
              setStateCount(1);
              setSeletedDivision("");
            }}
            className="linkEffect"
          >
            {selectedDivision} /{" "}
          </span>
          <span
            onClick={() => {
              setStateCount(2);
              setSeletedDistrict("");
            }}
            className="linkEffect"
          >
            {selectedDistrict} /{" "}
          </span>
          <span
            onClick={() => {
              setStateCount(3);
              setSeletedTehsil("");
            }}
            className="linkEffect"
          >
            {selectedTehsil} /{" "}
          </span>
        </b>
      </Alert>
      {stateCount == 0 ? (
        <Container>
          <Row className="mt-5">
            <Col sm={4}></Col>
            <Col sm={4}>
              <button
                className="y-btn"
                onClick={() => (setStateCount(1), setHomepage("Homepage"))}
              >
                Register a Land Now
              </button>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      ) : stateCount == 1 ? (
        <Container>
          <h2>Select Division</h2>
          <Row>
            {DivisionList &&
              DivisionList.map((item, index) => (
                <Col sm={3}>
                  <p
                    key={index + 1}
                    onClick={() => {
                      setStateCount(2);
                      setSeletedDivision(item);
                    }}
                    className="linkEffect"
                  >
                    {item}
                  </p>
                </Col>
              ))}
          </Row>
        </Container>
      ) : stateCount == 2 ? (
        <Container>
          <h2>Select District</h2>
          <Row>
            {DistrictList[selectedDivision].map((item, index) => (
              <Col sm={3}>
                <p
                  key={index + 1}
                  onClick={() => {
                    setStateCount(3);
                    setSeletedDistrict(item);
                  }}
                  className="linkEffect"
                >
                  {item}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      ) : stateCount == 3 ? (
        // selectedTehsil
        <Container>
          <h2>Select Tehsil</h2>
          <Row>
            {TehsilList[selectedDistrict].map((item, index) => (
              <Col sm={3}>
                <p
                  key={index + 1}
                  onClick={() => {
                    setStateCount(4);
                    setSeletedTehsil(item);
                  }}
                  className="linkEffect"
                >
                  {item}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      ) : stateCount == 4 ? (
        // Form
        <Container>
          {init()}
          <h2>Fill the following form below</h2>
          <br />
          <br />
          <Form>
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder={
                    selectedDivision +
                    " " +
                    selectedDistrict +
                    " " +
                    selectedTehsil
                  }
                  onChange={(e) => setlocation(result)}
                  disabled
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name + fathername"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Specific Share in Joint Account"
                  onChange={(e) => setCoShares(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Specific Share in Joint Account"
                  onChange={(e) => setShareinJoint(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="specific Area in accordance with the Share"
                  onChange={(e) => setSpecificArea(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="khasra No"
                  onChange={(e) => setKhasraNumber(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Land Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                <Form.Select
                  size="sm"
                  required
                  onChange={(e) => setNature(e.target.value)}
                >
                  <option>Select Nature of a Land</option>
                  <option>Owner</option>
                  <option>Lease</option>
                  <option>Mortage etc</option>
                </Form.Select>
              </Col>
              <Col sm={3}></Col>
            </Row>
            <br />
          </Form>
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              <button
                className="y-btn"
                onClick={() => {
                  registerLand(
                    name,
                    coShares,
                    location,
                    nature,
                    shareinJoint,
                    specificArea,
                    khasraNumber,
                    price
                  );
                }}
              >
                Register a Land
              </button>
            </Col>
            <Col sm={3}></Col>
          </Row>
          <br />
        </Container>
      ) : (
        "not"
      )}
    </div>
  );
};

export default AddLand;
