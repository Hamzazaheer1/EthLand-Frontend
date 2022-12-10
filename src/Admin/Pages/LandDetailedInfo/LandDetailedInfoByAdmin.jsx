import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./LandDetailedInfoByAdmin.css";
import { themeContext } from "../../../Context";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";

const LandDetailedInfoByAdmin = () => {
  let { landid } = useParams();
  const [response, setResponse] = useState();
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [isLoading, setIsLoading] = useState(false);
  const [newInstance, setNewInstance] = useState();
  const [newSelectedAccount, setNewSelectedAccounte] = useState();

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            let selectedAccount = accounts[0];
            setNewSelectedAccounte(selectedAccount);
            const web3 = new Web3(provider);
            let ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            setNewInstance(ContractInstance);
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          `https://land-backend.herokuapp.com/api/v1/lands/getlandbyid/${landid}`
        );
        setResponse(resp.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, []);

  console.log(response);

  const pushToBlockchain = async (
    landPrice,
    ownerPK,
    isForSale,
    location,
    area
  ) => {
    setIsLoading(true);

    await newInstance.methods
      .addLand(landid, landPrice, ownerPK, isForSale, location, area)
      .send({ from: newSelectedAccount });

    setIsLoading(false);
    alert("Land Verified Sucessfully... User can now sell this land");
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
        Land Detailed Info
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <Row className="mt-5">
        {response && (
          <div>
            <Alert key={"secondary"} variant={"secondary"}>
              <h6>
                Khaiwat Number:
                <span className="blackData">{response.khaiwatNo}</span>
              </h6>
            </Alert>
            <hr />
            <h3>Owner's Data</h3>
            <Alert key={"secondary"} variant={"secondary"}>
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
                  <hr />
                  <butoon
                    className="g-btn"
                    onClick={() => {
                      pushToBlockchain(
                        0,
                        item.publicAddress,
                        false,
                        response.location,
                        response.area
                      );
                    }}
                  >
                    Verify Land
                  </butoon>
                  <hr />
                </div>
              ))}
            </Alert>
            <Alert key={"secondary"} variant={"secondary"}>
              <h6>
                Khasra Name:
                <span className="blackData">{response.khasraNumber}</span>
              </h6>
              <h6>
                Total Area: <span className="blackData">{response.area}</span>
              </h6>
            </Alert>
            <hr />
            <h2>Jamabandi</h2>
            <Alert key={"secondary"} variant={"secondary"}>
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
            <hr />
            <h2>Old Fard Photo</h2>
            <img
              className="img-fluid"
              src={response.photo}
              alt={"not provided"}
            />
          </div>
        )}
      </Row>
      <Row className="mt-5">
        <Col sm={5}></Col>
        <Col sm={2}>
          <button
            className="g-btn"
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

export default LandDetailedInfoByAdmin;
