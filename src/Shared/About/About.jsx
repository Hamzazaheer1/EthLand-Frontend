import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { themeContext } from "../../Context";
import Card from "react-bootstrap/Card";
import "./About.css";

const About = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div style={{ marginTop: "5rem" }}>
      <Row style={{ marginLeft: "1rem" }}>
        <Col sm={3}></Col>
        <Col sm={7}>
          <span
            style={{
              color: darkMode ? "white" : "var(--black)",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            EthLand
          </span>
          <br />
          <span
            style={{
              color: "var(--yellow)",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            A Decentralized Land Record Managment
          </span>
          <br />
          <br />
          <span
            style={{
              color: darkMode ? "white" : "var(--gray)",
            }}
          >
            Government of the Pakistan started computerization of Land Records
            with overall objectives to improve service delivery and to enhance
            the perceived level of tenure security.
            <br />
            <b>EthLand is an Ethereum Blockchain based Land Record System</b>
          </span>
          <br />
          <br />
          <br />
          <br />
          <button
            className="g-btn"
            onClick={() =>
              window.open("https://en.wikipedia.org/wiki/Blockchain", "_blank")
            }
          >
            Learn More About Blockchain
          </button>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row style={{ marginLeft: "1rem", marginTop: "8rem" }}>
        <Col sm={1} className="mt-5"></Col>
        <Col sm={10} style={{ marginLeft: "2rem" }}>
          <Row>
            <Card
              style={{
                width: "18rem",
                color: "white",
                marginRight: "5rem",
                marginTop: "1rem",
              }}
              bg="dark"
            >
              <Card.Img variant="top" src={"/images/0.PNG"} height={"250rem"} />
              <Card.Body>
                <Card.Title>Web2</Card.Title>
                <Card.Text>
                  Web 2 scans for information kept in a fixed place, generally
                  on a single server.
                </Card.Text>
                <button
                  className="g-btn"
                  onClick={() =>
                    window.open(
                      "https://www.spiceworks.com/tech/tech-general/articles/web-2-vs-web-3/",
                      "_blank"
                    )
                  }
                >
                  Learn More
                </button>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                color: "white",
                marginRight: "5rem",
                marginTop: "1rem",
              }}
              bg="dark"
            >
              <Card.Img variant="top" src={"/images/1.PNG"} height={"250rem"} />
              <Card.Body>
                <Card.Title>BlockChain</Card.Title>
                <Card.Text>
                  A new way of keeping a shared transaction record(database).
                </Card.Text>
                <button
                  className="g-btn"
                  onClick={() =>
                    window.open(
                      "https://www.slideshare.net/JohnMirkovic/blockchain-for-land-records-and-real-estate",
                      "_blank"
                    )
                  }
                >
                  Go somewhere
                </button>
              </Card.Body>
            </Card>
            <Card
              style={{ width: "18rem", color: "white", marginTop: "1rem" }}
              bg="dark"
            >
              <Card.Img variant="top" src={"/images/2.PNG"} height={"250rem"} />
              <Card.Body>
                <Card.Title>Web3</Card.Title>
                <Card.Text>
                  Web3, on the other hand, assigns ownership to numerous others
                  (decentralization).
                </Card.Text>
                <button
                  className="g-btn"
                  onClick={() =>
                    window.open(
                      "https://www.slideshare.net/JohnMirkovic/blockchain-for-land-records-and-real-estate",
                      "_blank"
                    )
                  }
                >
                  Go somewhere
                </button>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </div>
  );
};

export default About;
