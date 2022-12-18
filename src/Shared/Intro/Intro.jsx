import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { themeContext } from "../../Context";
import { Typewriter } from "react-simple-typewriter";
import Map from "../img/map.png";
import Carousel from "react-bootstrap/Carousel";
import land1 from "../img/land1.jpg";
import land2 from "../img/land2.jpg";
import Home from "../img/home.png";
import thumbup from "../img/thumbup.png";
import crown from "../img/crown.png";
import FloatinDiv from "../../Utils/FloatingDiv/FloatingDiv";
import "./Intro.css";

const Intro = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Row>
      <div
        className="d-inline p-5 text-white"
        style={{ color: darkMode ? "white" : "" }}
      >
        <Row className="mt-3">
          <Col sm={4}>
            <span
              style={{
                color: darkMode ? "white" : "var(--black)",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              Welcome to
            </span>
            <br />
            <span
              style={{
                color: "var(--yellow)",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              <Typewriter
                words={["Eth Land", "Decentralized land record system"]}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <br />
            <br />
            <span
              style={{
                color: darkMode ? "white" : "var(--gray)",
              }}
            >
              Eth Land is Blockchain based Land Record System with overall
              objective to improve&nbsp;
            </span>
            <span
              style={{
                color: darkMode ? "white" : "var(--gray)",
                fontSize: "15px",
              }}
            >
              Trust, Disintermediation and faster Transactions.
            </span>

            <div className="mt-5">
              <Carousel variant="dark" interval={4000}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={land1}
                    alt="First slide"
                    height={"240rem"}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={land2}
                    alt="Second slide"
                    height={"240rem"}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
          <Col sm={3}></Col>
          <Col sm={5}>
            <img
              className="img-fluid"
              style={{ height: "30rem" }}
              src={Map}
              alt={"img not found"}
            />
            <motion.div
              animate={{ x: 100 }}
              transition={{ ease: "easeOut", duration: 2 }}
              className="floating0"
            >
              <FloatinDiv
                img={Home}
                text1="Immutable"
                text2="and Transparent"
              />
            </motion.div>

            <motion.div
              animate={{ x: 100 }}
              transition={{ ease: "easeOut", duration: 2 }}
              className="floating1"
            >
              <FloatinDiv
                img={crown}
                text1="Immutable"
                text2="and Transparent"
              />
            </motion.div>

            <motion.div
              animate={{ x: 100 }}
              transition={{ ease: "easeOut", duration: 2 }}
              className="floating"
            >
              <FloatinDiv
                img={thumbup}
                text1="Durability"
                text2="and Security"
              />
            </motion.div>
          </Col>
        </Row>
      </div>
      <div
        className="blur"
        style={{
          background: "var(--yellow)",
          top: "10rem",
          width: "21rem",
          height: "11rem",
        }}
      ></div>
      <div
        className="blur"
        style={{
          background: "#C1F5FF",
          top: "30rem",
          width: "21rem",
          height: "11rem",
          left: "40rem",
        }}
      ></div>
    </Row>
  );
};

export default Intro;
