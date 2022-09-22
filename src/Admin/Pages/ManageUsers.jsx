import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import { useContext } from "react";
import { themeContext } from "../../Context";

const ManageUsers = () => {
  let selectedAccount;
  let ContractInstance;
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [adminCount, setAdminCount] = useState([]);

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

  //to return Users
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

  //to remove a user
  const removeUser = async (R_address) => {
    await ContractInstance.methods
      .removeUser(R_address)
      .send({ from: selectedAccount });
    alert("User Verified Sucessfully");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {init()}
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <h2>Manage Users</h2>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr style={{ color: darkMode ? "white" : "black" }}>
                  <th>#</th>
                  <th>Users Address</th>
                  <th>Operation</th>
                </tr>
              </thead>

              {adminCount.length == 0 ? (
                <h2>No data to be found</h2>
              ) : (
                adminCount.map((item, index) => (
                  <tbody>
                    <tr
                      style={{
                        backgroundColor: darkMode ? "white" : "white",
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>
                        <button
                          className="y-btn"
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
                  </tbody>
                ))
              )}
            </Table>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageUsers;
