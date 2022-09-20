import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../../Context";
// import { motion } from "framer-motion";
import i1 from "../img/0.PNG";
import i2 from "../img/1.PNG";
import i3 from "../img/2.PNG";
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
            Lorem ispum is simpley dummy text of printing of printing Lorem
            <br />
            ispum is simpley dummy text of printingLorem ispum is simpley dummy
            text
            <br />
            y dummy text of printingLorem
            <br />
            ispum is simpley dummy text of printing
          </span>
          <br />
          <br />
          <br />
          <br />
          <button
            className="y-btn"
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
              <Card.Img variant="top" src={i1} height={"250rem"} />
              <Card.Body>
                <Card.Title>Web2</Card.Title>
                <Card.Text>
                  Web 2 scans for information kept in a fixed place, generally
                  on a single server.
                </Card.Text>
                <button
                  className="y-btn"
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
              <Card.Img variant="top" src={i2} height={"250rem"} />
              <Card.Body>
                <Card.Title>BlockChain</Card.Title>
                <Card.Text>
                  A new way of keeping a shared transaction record(database).
                </Card.Text>
                <button
                  className="y-btn"
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
              <Card.Img variant="top" src={i3} height={"250rem"} />
              <Card.Body>
                <Card.Title>Web3</Card.Title>
                <Card.Text>
                  Web3, on the other hand, assigns ownership to numerous others
                  (decentralization).
                </Card.Text>
                <button
                  className="y-btn"
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
