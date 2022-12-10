import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Form from "react-bootstrap/Form";
import Web3 from "web3";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const PurchaseableLands = () => {
  let selectedAccount;
  let ContractInstance;

  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [updateInfoSpinner, setUpdateInfoSpinner] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [adminCount, setAdminCount] = useState([]);
  const [LandsInfo, setLandsInfo] = useState([]);
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [idNumber, setIdNumber] = useState(0);
  const [isForSale, setIsForSale] = useState(false);
  const [newInstance, setNewInstance] = useState();

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];
            setNewSlected(selectedAccount);
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            setNewInstance(ContractInstance);
            returnAllLandIds();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllLandIds = async () => {
    await ContractInstance.methods
      .myAllLands(selectedAccount)
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(adminCount);

  const returnAllLandInfo = async () => {
    setIsLoading(true);
    for (let i = 0; i < adminCount.length; i++) {
      await newInstance.methods
        .LandR(adminCount[i])
        .call()
        .then((tx) => {
          setLandsInfo((LandsInfo) => [...LandsInfo, tx]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLoading(false);
  };

  console.log(LandsInfo);

  const sendBuyRequest = async () => {
    await newInstance.methods.requestforBuy(reqId).send({ from: newSelected });

    alert("Land Buy Request has been sent to owner");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        Lands Availible for Purchase
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <button
        className="g-btn"
        onClick={() => {
          returnAllLandInfo();
        }}
      >
        Show Lands
      </button>
      <Row>
        {LandsInfo &&
          LandsInfo.filter((land) => land.isforSell === false).map(
            (item, index) => (
              <Card
                key={index + 1}
                style={{
                  width: "18rem",
                  marginRight: "2rem",
                  marginTop: "2rem",
                  backgroundImage: "linear-gradient(green, white)",
                  boxShadow: "10px 10px 5px lightgreen",
                }}
              >
                <Card.Body>
                  <Card.Title>{item.location}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    {item.area} = Acre-Kanal-Marla
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2">
                    {item.landPrice} PKR
                  </Card.Subtitle>
                  <Card.Text>{item.ownerAddress}</Card.Text>
                  <Card.Link
                    className="cursor-pointer"
                    onClick={() => {
                      Navigate(`/purchaseableland-info/${item.landId}`);
                    }}
                  >
                    View Detail
                  </Card.Link>
                  <Card.Link
                    className="cursor-pointer"
                    onClick={() => {
                      Navigate("/");
                    }}
                  >
                    Request to Buy
                  </Card.Link>
                </Card.Body>
              </Card>
            )
          )}
      </Row>
    </Container>
  );
};

export default PurchaseableLands;
