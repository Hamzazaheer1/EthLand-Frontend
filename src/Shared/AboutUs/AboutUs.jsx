import React from "react";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Default from "../img/default.jpg";
import { useContext } from "react";
import { themeContext } from "../../Context";

const AboutUs = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div>
      {/* <NavigationBar /> */}
      <Container className="mt-5">
        <h2 style={{ color: "var(--yellow)" }}>About EthLand</h2>
        <hr
          style={{
            color: darkMode ? "var(--yellow)" : "var(--black)",
            border: "2px solid",
          }}
        />
        <Row>
          <p>
            he Government of Punjab has embarked upon a revolutionary initiative
            of computerization of land records in Punjab province for bringing
            about a qualitative change in the lives of people. The overall
            objective is to improve service delivery and to enhance the
            perceived level of security.
          </p>
          <br />
          <Row>
            <Col sm={3}>
              <Image src={Default} className="img-thumbnail"></Image>
            </Col>
            <Col sm={9}>
              <Alert variant={"dark"}>
                I feel privileged, writing this message as Director General
                Punjab Land Records Authority. I am incredibly excited for being
                part of EthLand’s journey and committed to: “Operational
                Excellence, Leadership by Example, Integrity and Transparency,
                Client’s Facilitation and Employee’s Welfare”.
                <br />
                <br />
                <p>
                  Looking ahead, we need to be focused on our growth strategy
                  while continuing to build on the strength of our organization
                  – in helping our clients and in bringing positive change to
                  the communities in which we work and live. I truly believe the
                  best of EthLand is yet to come.
                </p>
                <br />
                <p>
                  Me and my team with our mission to deliver efficient and
                  transparent services, are well positioned to make EthLand a
                  symbol of facilitation for the general public through making
                  meaningful innovations and making our organization healthier
                  and sustainable. God Bless Us All
                </p>
                <h3 style={{ color: "var(--yellow)" }}>Director General</h3>
              </Alert>
            </Col>
          </Row>
          <p className="quote">
            Based upon the EthLand futuristic approach of transforming the
            manual land records management into an efficient, accountable,
            secure, distributed and transparent system through integrated
            technology solution, this property registration system was
            envisaged.
          </p>
        </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
