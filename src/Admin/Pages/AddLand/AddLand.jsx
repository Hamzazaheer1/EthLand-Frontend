import React, { useState } from "react";
import { DivisionList, DistrictList, TehsilList } from "./LandData";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import "./AddLand.css";
import axios from "axios";

const AddLand = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stateCount, setStateCount] = useState(0);
  const [homepage, setHomepage] = useState("Homepage");
  const [selectedDivision, setSeletedDivision] = useState("");
  const [selectedDistrict, setSeletedDistrict] = useState("");
  const [selectedTehsil, setSeletedTehsil] = useState("");
  const [khaiwatNo, setKhaiwatNo] = useState(0);
  const [totalArea, setTotalArea] = useState("");
  const [khasraNumber, setKhasraNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  // owner state
  const [ownersInput, setOwnersInput] = useState([
    {
      ownerName: "",
      fatherName: "",
      cast: "",
      natureOfRights: "",
      specificShareInJointAccount: "",
      specificAreaAccordingWithShare: "",
      publicAddress: "",
    },
  ]);

  const handleOwnersInput = () => {
    setOwnersInput([
      ...ownersInput,
      {
        ownerName: "",
        fatherName: "",
        cast: "",
        natureOfRights: "",
        specificShareInJointAccount: "",
        specificAreaAccordingWithShare: "",
        publicAddress: "",
      },
    ]);
  };

  const handleOwnersInputRemove = (index) => {
    const list = [...ownersInput];
    list.splice(index, 1);
    setOwnersInput(list);
  };

  const handleOwnersInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ownersInput];
    list[index][name] = value;
    setOwnersInput(list);
  };

  //jamabandi code
  const [jamabandiInput, setJamabandiInput] = useState([
    {
      oldOwnerName: "",
      saleDate: "",
      NumberDarName: "",
      IntiqaalNumber: "",
      OldOwnerPK: "",
    },
  ]);

  const handleJamabandiInput = () => {
    setJamabandiInput([
      ...jamabandiInput,
      {
        oldOwnerName: "",
        saleDate: "",
        NumberDarName: "",
        IntiqaalNumber: "",
        OldOwnerPK: "",
      },
    ]);
  };

  const handleJamabandiInputRemove = (index) => {
    const list = [...jamabandiInput];
    list.splice(index, 1);
    setJamabandiInput(list);
  };

  const handleJamabandiInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...jamabandiInput];
    list[index][name] = value;
    setJamabandiInput(list);
  };

  let result = selectedDivision.concat(
    " / ",
    selectedDistrict,
    " / ",
    selectedTehsil
  );

  // console.log("Locaion", result);
  // console.log("khaiwatNo", khaiwatNo);
  // console.log("Owner's Input ", ownersInput);
  //  console.log("khasraNumber", khasraNumber);
  //console.log(JSON.stringify(jamabandiInput));
  //console.log("totalArea ", totalArea);
  //console.log("price ", price);
  // console.log("photo ", image);
  // console.log("jamabandi old ", JSON.stringify(jamabandiInput));
  // const jamabandiData = JSON.stringify(jamabandiInput);
  // console.log("jamabandi new ", jamabandiData);

  const registerLandHandler = async () => {
    // const formData = new FormData();
    // formData.append("location", result);
    // formData.append("khaiwatNo", khaiwatNo);
    // formData.append("OwnerData", JSON.stringify(ownersInput));
    // formData.append("khasraNumber", khasraNumber);
    // formData.append("area", totalArea);
    // formData.append("jamabandi", JSON.stringify(jamabandiInput));
    // // jamabandiInput.forEach((item) => {
    // //   formData.append(`jamabandi`, JSON.stringify(item));
    // // });
    // formData.append("price", price);
    // formData.append("photo", image);

    // console.log("formData ", [...formData]);

    try {
      const resp = await axios.post(
        "https://ethland-backend.herokuapp.com/api/v1/lands/create",
        {
          location: result,
          khaiwatNo: khaiwatNo,
          OwnersData: ownersInput,
          khasraNumber: khasraNumber,
          area: totalArea,
          jamabandi: jamabandiInput,
          price: price,
        }
      );
      console.log(resp);
      alert("Land registered Sucessfully");
    } catch (err) {
      console.log("error", err);
      alert(err);
    }
  };

  // const registerLandHandler = async () => {
  //   const formData = new FormData();
  //   formData.append("location", result);
  //   formData.append("khaiwatNo", khaiwatNo);
  //   formData.append("OwnerData", JSON.stringify(ownersInput));
  //   formData.append("khasraNumber", khasraNumber);
  //   formData.append("area", totalArea);
  //   formData.append("jamabandi", JSON.stringify(jamabandiInput));
  //   formData.append("price", price);
  //   formData.append("photo", image);

  //   try {
  //     const response = await fetch(
  //       "https://ethland-backend.herokuapp.com/api/v1/lands/create",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const responseData = await response.json();
  //     alert("Land Registered Sucessfully!!!!");
  //     console.log(responseData);
  //   } catch (err) {
  //     alert("Error occured during registration of a land");
  //   }
  // };

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
                className="g-btn"
                onClick={() => (setStateCount(1), setHomepage("Homepage"))}
              >
                Register a Land Now
              </button>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      ) : stateCount == 1 ? (
        // select Division
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
                    className="linkEffect cursor-pointer"
                  >
                    {item}
                  </p>
                </Col>
              ))}
          </Row>
        </Container>
      ) : stateCount == 2 ? (
        // Select District
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
                  className="linkEffect cursor-pointer"
                >
                  {item}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      ) : stateCount == 3 ? (
        // select Tehsil
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
                  className="linkEffect cursor-pointer"
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
          {/* {init()} */}
          <h2>Fill the following form below</h2>
          <br />
          <br />
          <Form>
            {isLoading ? (
              <LoadingSpinner asOverlay />
            ) : (
              <>
                {/* location */}
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
                      disabled
                    />
                  </Col>
                  <Col sm={3}></Col>
                </Row>
                <br />
                {/* khaiwait No */}
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={6}>
                    <Form.Control
                      type="number"
                      placeholder="Enter Khaiwat No."
                      onChange={(e) => setKhaiwatNo(e.target.value)}
                    />
                  </Col>
                  <Col sm={3}></Col>
                </Row>
                <br />
                {/* Owner's Data */}
                {ownersInput.map((item, index) => (
                  <div key={index}>
                    <div className="mb-6">
                      <Row>
                        <Col sm={3}></Col>
                        <Col sm={6}>
                          <hr />
                          <h4>Add Owner's Data</h4>
                          <Form.Control
                            name="ownerName"
                            type="text"
                            placeholder="Owner Name"
                            id="ownerName"
                            value={item.ownerName}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                          <Form.Control
                            name="fatherName"
                            type="text"
                            placeholder="Father Name"
                            id="fatherName"
                            value={item.fatherName}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                          <Form.Control
                            name="cast"
                            type="text"
                            placeholder="Cast"
                            id="cast"
                            value={item.cast}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                          <Form.Select
                            name="natureOfRights"
                            size="sm"
                            required
                            id="natureOfRights"
                            value={item.natureOfRights}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          >
                            <option>Select Nature of a Land</option>
                            <option>owner</option>
                            <option>lease</option>
                            <option>mortage</option>
                          </Form.Select>
                          <br />
                          <Form.Control
                            name="specificShareInJointAccount"
                            type="text"
                            placeholder="Specific Share in Joint Account"
                            id="specificShareInJointAccount"
                            value={item.specificShareInJointAccount}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                          <Form.Control
                            name="specificAreaAccordingWithShare"
                            type="text"
                            placeholder="specific Area in accordance with the Share"
                            id="specificAreaAccordingWithShare"
                            value={item.specificAreaAccordingWithShare}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                          <Form.Control
                            name="publicAddress"
                            type="text"
                            placeholder="Owner Public Address"
                            id="publicAddress"
                            value={item.publicAddress}
                            onChange={(e) => handleOwnersInputChange(e, index)}
                          />
                          <br />
                        </Col>
                        <Col sm={1}>
                          {ownersInput.length > 1 && (
                            <button
                              className="g-btn"
                              style={{ height: "2.5rem", marginTop: "4rem" }}
                              onClick={() => {
                                handleOwnersInputRemove(index);
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </Col>
                        <Col sm={2}></Col>
                      </Row>
                      <Row>
                        <br />
                        <Col sm={3}></Col>
                        <Col sm={3}>
                          {ownersInput.length - 1 === index && (
                            <button
                              className="g-btn"
                              style={{ height: "2.5rem" }}
                              onClick={handleOwnersInput}
                            >
                              Add More Owners
                            </button>
                          )}
                        </Col>
                        <Col sm={3}></Col>
                        <Col sm={3}></Col>
                      </Row>
                      <br />
                    </div>
                  </div>
                ))}
                {/* khasra No */}
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
                {/* area */}
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      placeholder="Enter total area"
                      onChange={(e) => setTotalArea(e.target.value)}
                    />
                  </Col>
                  <Col sm={3}></Col>
                </Row>
                <br />
                {/* jamabandi */}
                {jamabandiInput.map((item, index) => (
                  <div key={index + 1}>
                    <div className="mb-6">
                      <Row>
                        <Col sm={3}></Col>
                        <Col sm={6}>
                          <hr />
                          <h4>Add Jamabandi</h4>
                          <Form.Control
                            type="text"
                            placeholder="Old Owner Name"
                            name="oldOwnerName"
                            id="oldOwnerName"
                            value={item.oldOwnerName}
                            onChange={(e) =>
                              handleJamabandiInputChange(e, index)
                            }
                          />
                          <br />
                          <Form.Control
                            type="text"
                            placeholder="Date of Sale"
                            name="saleDate"
                            id="saleDate"
                            value={item.saleDate}
                            onChange={(e) =>
                              handleJamabandiInputChange(e, index)
                            }
                          />
                          <br />
                          <Form.Control
                            type="text"
                            placeholder="Numberdar name"
                            name="NumberDarName"
                            id="NumberDarName"
                            value={item.NumberDarName}
                            onChange={(e) =>
                              handleJamabandiInputChange(e, index)
                            }
                          />
                          <br />
                          <Form.Control
                            type="number"
                            placeholder="Intiqaal Number"
                            name="IntiqaalNumber"
                            id="IntiqaalNumber"
                            value={item.IntiqaalNumber}
                            onChange={(e) =>
                              handleJamabandiInputChange(e, index)
                            }
                          />
                          <br />
                          <Form.Control
                            type="text"
                            placeholder="Old Owner Public Address"
                            name="OldOwnerPK"
                            id="OldOwnerPK"
                            value={item.OldOwnerPK}
                            onChange={(e) =>
                              handleJamabandiInputChange(e, index)
                            }
                          />
                          <br />
                        </Col>
                        <Col sm={1}>
                          {jamabandiInput.length > 1 && (
                            <button
                              className="g-btn"
                              style={{ height: "2.5rem", marginTop: "4rem" }}
                              onClick={() => {
                                handleJamabandiInputRemove(index);
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </Col>
                        <Col sm={2}></Col>
                      </Row>
                      <Row>
                        <br />
                        <Col sm={3}></Col>
                        <Col sm={3}>
                          {jamabandiInput.length - 1 === index && (
                            <button
                              className="g-btn"
                              style={{ height: "2.5rem" }}
                              onClick={handleJamabandiInput}
                            >
                              Add Jamabandi
                            </button>
                          )}
                        </Col>
                        <Col sm={3}></Col>
                        <Col sm={3}></Col>
                      </Row>
                      <br />
                    </div>
                  </div>
                ))}
                {/* price */}
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
                {/* Photo */}
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={6}>
                    <Form.Control
                      type="file"
                      // placeholder="Land Price"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Col>
                  <Col sm={3}></Col>
                </Row>
                <br />
              </>
            )}
          </Form>
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              <button
                className="g-btn"
                onClick={() => {
                  registerLandHandler();
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
