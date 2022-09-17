import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Map from "../img/map.png";
import Carousel from "react-bootstrap/Carousel";
import land1 from "../img/land1.jpg";
import land2 from "../img/land2.jpg";
import Vector1 from "../img/Vector1.png";
import Vector2 from "../img/Vector2.png";
import boy from "../img/boy.png";
import Home from "../img/home.png";
import item1 from "../img/item1.png";
import thumbup from "../img/thumbup.png";
import crown from "../img/crown.png";

import FloatinDiv from "../../Utils/FloatingDiv/FloatingDiv";
import { motion } from "../../../node_modules/framer-motion/dist/es/index";

import { useContext } from "react";
import { themeContext } from "../../Context";
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
                // color: "var(--black)",
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
              Eth Land
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
          <Col sm={4}></Col>
          <Col sm={4}>
            <img className="img-fluid" style={{ height: "30rem" }} src={Map} />
            {/* animations */}
            <motion.div
              // initial={{ left: "-36%" }}
              // whileInView={{ left: "-30%" }}
              // transition={transition}
              // src={item1}
              // alt=""
              // width={"400rem"}
              className="floating0"
            >
              <FloatinDiv
                img={Home}
                text1="Immutable"
                text2="and Transparent"
              />
            </motion.div>

            <motion.div
              // initial={{ top: "-4%", left: "74%" }}
              // whileInView={{ left: "68%" }}
              // transition={transition}
              // style={{ marginLeft: "-2rem" }}
              className="floating1"
            >
              <FloatinDiv
                img={crown}
                text1="Immutable"
                text2="and Transparent"
              />
            </motion.div>

            <motion.div
              // initial={{ left: "9rem", top: "18rem" }}
              // whileInView={{ left: "0rem" }}
              // transition={transition}
              // style={{ marginTop: "-15rem" }}
              className="floating"
            >
              {/* floatinDiv mein change hy dark mode ka  */}
              <FloatinDiv
                img={thumbup}
                text1="Durability"
                text2="and Security"
              />
            </motion.div>
          </Col>
        </Row>
      </div>
      {/* background: "rgb(238 210 255)" */}
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
