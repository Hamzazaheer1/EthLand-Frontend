import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { useContext } from "react";
import { themeContext } from "../../Context";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUsers = () => {
  let selectedAccount;
  let ContractInstance;
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [adminCount, setAdminCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contractInstance, setContractInstance] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];

            setAccount(selectedAccount);
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            setContractInstance(ContractInstance);
            returnAllAdmins();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllAdmins = async () => {
    await ContractInstance.methods
      .ReturnAllUrverifiedUsers()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const VerifyUser = async (R_address) => {
    setIsLoading(true);
    await contractInstance.methods
      .verifyUser(R_address)
      .send({ from: account });
    setIsLoading(false);
    alert("User Verified Sucessfully");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)" }}>Verify Users</h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Table striped bordered hover>
            <thead>
              <tr style={{ color: darkMode ? "white" : "black" }}>
                <th>#</th>
                <th>Users Address</th>
                <th>User Detail</th>
                <th>Operation</th>
              </tr>
            </thead>
            {adminCount.length == 0 ? (
              <tbody>
                <tr>
                  <td>
                    <h5>No user to be verified yet</h5>
                  </td>
                </tr>
              </tbody>
            ) : (
              adminCount.map((item, index) => (
                <tbody key={index + 1}>
                  <tr style={{ backgroundColor: darkMode ? "white" : "white" }}>
                    <td>{index + 1}</td>
                    <td>{item}</td>
                    <td>
                      <button
                        className="g-btn itemClickable"
                        style={{ padding: "0px 20px 5px 20px", width: "7rem" }}
                        onClick={() => {
                          Navigate(`/detailed-user-info/${item}`);
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="g-btn"
                        style={{ padding: "0px 20px 5px 20px" }}
                        onClick={(event) => {
                          event.preventDefault();
                          {
                            VerifyUser(item);
                          }
                        }}
                      >
                        {isLoading ? (
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                        ) : (
                          <p>Verify</p>
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </Table>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default VerifyUsers;
