import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { themeContext } from "../../../../Context";
import LoadingSpinner from "../../../../Utils/LoadingSpinner/LoadingSpinner";

const LandDetailedInfo = () => {
  let { landid } = useParams();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const apiHandler = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `https://landbackend-production.up.railway.app/api/v1/lands/getlandbyid/${landid}`
        );
        setResponse(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        alert(err);
        setIsLoading(false);
      }
    };

    apiHandler();
  }, []);

  return (
    <Container className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        <i
          onClick={() => {
            Navigate("/userpanel");
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
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <>
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
                    </div>
                  ))}
                </Alert>
                <Alert key={"secondary"} variant={"secondary"}>
                  <h6>
                    Khasra Name:
                    <span className="blackData">{response.khasraNumber}</span>
                  </h6>
                  <h6>
                    Total Area:{" "}
                    <span className="blackData">{response.area}</span>
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
        </>
      )}
    </Container>
  );
};

export default LandDetailedInfo;
