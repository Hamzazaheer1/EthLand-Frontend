import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { themeContext } from "../../../Context";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import "../LandDetailedInfo/LandDetailedInfoByAdmin.css";
import Form from "react-bootstrap/Form";

const LandTransfer = () => {
  let { landid } = useParams();
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isJamabandi, setIsJamabandi] = useState(false);
  const [isNewOwner, setIsNewOwner] = useState(false);

  const [oldOwnerName, setOldOwnerName] = useState("");
  const [numberdarName, setNumberdarName] = useState("");
  const [intiqaalNumber, setIntiqaalNumber] = useState(0);
  const [oldOwnerPK, setOldOwnerPK] = useState("");

  const [newOwnerName, setNewOwnerName] = useState("");
  const [cast, setCast] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [newOwnerPK, setNewOwnerPK] = useState("");
  const [userId, setUserID] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `https://landbackend-production.up.railway.app/api/v1/lands/getlandbyid/${landid}`
        );
        setResponse(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, []);

  const updateJamabandi = async () => {
    setIsJamabandi(true);
    try {
      await axios({
        method: "PATCH",
        url: `https://landbackend-production.up.railway.app/api/v1/lands/addOldOwnerToJamabandi/${landid}`,
        data: {
          oldOwnerName,
          NumberDarName: numberdarName,
          IntiqaalNumber: intiqaalNumber,
          OldOwnerPK: oldOwnerPK,
        },
      });
      setIsJamabandi(false);
      alert("Added to Jamabandi Sucessfully....");
    } catch (err) {
      setIsJamabandi(false);
      console.error(err);
    }
  };

  const updateOldOwner = async () => {
    setIsNewOwner(true);
    try {
      await axios({
        method: "PATCH",
        url: `https://landbackend-production.up.railway.app/api/v1/lands/transferOwnership/${userId}`,
        data: {
          ownerName: newOwnerName,
          fatherName: fatherName,
          cast: cast,
          publicAddress: newOwnerPK,
          price: 0,
          isForSale: false,
        },
      });

      setIsNewOwner(false);
      alert("New Owner has been added....");
    } catch (err) {
      setIsNewOwner(false);
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        <i
          onClick={() => {
            Navigate("/adminpanel");
          }}
          className="bi bi-arrow-left-circle-fill cursor-pointer"
          style={{ marginRight: "1rem" }}
        ></i>
        Land Transfer / Manage Jamabandi
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
        <>
          <Row className="mt-5">
            <Col sm={4}>
              <h4>Add Old Owner to Jamabandi</h4>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Enter Old Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setOldOwnerName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Enter NumberDar Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNumberdarName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Enter Intiqaal Number</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => setIntiqaalNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Enter Old Owner Public Key</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setOldOwnerPK(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="g-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    updateJamabandi();
                  }}
                >
                  {isJamabandi ? (
                    <div
                      className="spinner-border text-dark"
                      role="status"
                    ></div>
                  ) : (
                    <span> Submit</span>
                  )}
                </button>
              </Form>
            </Col>
            <Col sm={1}></Col>
            <Col sm={4}>
              <h4>Add New Land Owner</h4>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Enter new owner name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNewOwnerName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Enter new owner father name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Enter new owner cast</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCast(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Enter new owner public Address</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNewOwnerPK(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Enter Old User Id</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUserID(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="g-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    updateOldOwner();
                  }}
                >
                  {isNewOwner ? (
                    <div
                      className="spinner-border text-dark"
                      role="status"
                    ></div>
                  ) : (
                    <span> Submit</span>
                  )}
                </button>
              </Form>
            </Col>
            <Col sm={3}></Col>
          </Row>

          <Row className="mt-5">
            {response && (
              <div>
                <h3>Land Info</h3>
                <Alert variant="secondary">
                  <h6>
                    Khaiwat Number:
                    <span className="blackData">{response.khaiwatNo}</span>
                  </h6>
                  <h6>
                    Location:
                    <span className="blackData">{response.location}</span>
                  </h6>
                </Alert>
                <hr />
                <h3>Owner's Data</h3>
                <Alert variant="secondary">
                  {response.OwnersData.map((item, index) => (
                    <div key={index + 1}>
                      <h6>
                        Owner Name:{" "}
                        <span className="blackData">{item.ownerName}</span>
                      </h6>
                      <h6>
                        Father Name:{" "}
                        <span className="blackData">{item.fatherName}</span>
                      </h6>
                      <h6>
                        Cast: <span className="blackData">{item.cast}</span>
                      </h6>
                      <h6>
                        Nature of Rights:{" "}
                        <span className="blackData">{item.natureOfRights}</span>
                      </h6>
                      <h6>
                        Specific Share in Joint Account:
                        <span className="blackData">
                          {item.specificShareInJointAccount}
                        </span>
                      </h6>
                      <h6>
                        Specific Area in accordance with the Share :
                        <span className="blackData">
                          {item.specificAreaAccordingWithShare}
                        </span>
                      </h6>
                      <h6>
                        Public Address:
                        <span className="blackData">{item.publicAddress}</span>
                      </h6>
                      <h6>
                        Id:
                        <span className="blackData">{item._id}</span>
                      </h6>
                      <hr />
                    </div>
                  ))}
                </Alert>
                <hr />
                <h2>Jamabandi</h2>
                <Alert variant={"secondary"}>
                  {response.jamabandi.map((item, index) => (
                    <div>
                      <h6>
                        Owner Name:{" "}
                        <span className="blackData">{item.oldOwnerName}</span>
                      </h6>
                      <h6>
                        Sale Date:{" "}
                        <span className="blackData">{item.saleDate}</span>
                      </h6>
                      <h6>
                        NumberDar Name:{" "}
                        <span className="blackData">{item.NumberDarName}</span>
                      </h6>
                      <h6>
                        Intiqaal Number:{" "}
                        <span className="blackData">{item.IntiqaalNumber}</span>
                      </h6>
                      <h6>
                        Old Owner PK:{" "}
                        <span className="blackData">{item.OldOwnerPK}</span>
                      </h6>
                      <hr />
                    </div>
                  ))}
                </Alert>
              </div>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default LandTransfer;
