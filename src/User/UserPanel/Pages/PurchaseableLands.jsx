import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Web3 from "web3";
import Card from "react-bootstrap/Card";

const PurchaseableLands = () => {
  let selectedAccount;
  let ContractInstance;

  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoading, setIsLoading] = useState(false);
  const [newSelected, setNewSlected] = useState();
  const [adminCount, setAdminCount] = useState([]);
  const [LandsInfo, setLandsInfo] = useState([]);
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
      .ReturnAllLandList()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const sendBuyRequest = async (s_id) => {
    let newId = s_id * 1;
    console.log(newId);
    await newInstance.methods.requestforBuy(newId).send({ from: newSelected });

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
          LandsInfo.filter((land) => land.isforSell === true).map(
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
                      sendBuyRequest(item.Id);
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
