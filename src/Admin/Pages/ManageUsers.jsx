import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { themeContext } from "../../Context";
import Table from "react-bootstrap/Table";
import Web3 from "web3";

const ManageUsers = () => {
  const Navigate = useNavigate();
  let selectedAccount;
  let ContractInstance;
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [adminCount, setAdminCount] = useState([]);

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            selectedAccount = accounts[0];
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            returnAllUsers();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const returnAllUsers = async () => {
    await ContractInstance.methods
      .ReturnAllUserList()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeUser = async (R_address) => {
    await ContractInstance.methods
      .removeUser(R_address)
      .send({ from: selectedAccount });
    alert("User Removed Sucessfully");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)" }}>Manage Users</h2>
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
                <th>Users Detail</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {adminCount.length == 0 ? (
                <tr>
                  <td>No User to be found</td>
                </tr>
              ) : (
                adminCount.map((item, index) => (
                  <tr
                    key={index + 1}
                    style={{
                      backgroundColor: darkMode ? "white" : "white",
                    }}
                  >
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
                          removeUser(item);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default ManageUsers;
