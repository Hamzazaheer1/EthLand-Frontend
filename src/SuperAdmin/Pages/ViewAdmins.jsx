import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { themeContext } from "../../Context";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import LoadingSpinner from "../../Utils/LoadingSpinner/LoadingSpinner";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const ViewAdmins = () => {
  let ContractInstance;
  let removeAContractInstance;
  let selectedAccount;
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [adminCount, setAdminCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingbtn, setIsLoadingBtn] = useState(false);

  useEffect(() => {
    const getAdmins = () => {
      setIsLoading(true);
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
            returnAllAdmins();
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    getAdmins();
  }, []);

  //to return Admins
  const returnAllAdmins = async () => {
    await ContractInstance.methods
      .ReturnAllAdminList()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        alert(error);
      });
    setIsLoading(false);
  };

  //to remove admin
  const removeAdmin = async (R_address) => {
    setIsLoadingBtn(true);
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          const web3 = new Web3(provider);
          removeAContractInstance = new web3.eth.Contract(
            CONTACT_ABI,
            CONTACT_ADDRESS
          );
          removeAdminAPI(R_address);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingBtn(false);
          return;
        });
    } else {
      alert("no metamask installed");
    }
  };

  const removeAdminAPI = async (adminAddress) => {
    await removeAContractInstance.methods
      .removeAdminAuthFailed(adminAddress)
      .send({ from: selectedAccount });
    alert("Admin Removed Sucessfully");
    setIsLoadingBtn(false);
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <br />
          <h2>View</h2>
          <h2>List of Admins</h2>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr style={{ color: darkMode ? "white" : "black" }}>
                <th>#</th>
                <th>Admin Address</th>
                <th>Admin Detail</th>
                <th>Operation</th>
              </tr>
            </thead>
            {isLoading || isLoadingbtn ? (
              <LoadingSpinner asOverlay />
            ) : (
              <>
                {adminCount &&
                  adminCount.map((item, index) => (
                    <tbody key={index + 1}>
                      <tr
                        style={{
                          backgroundColor: darkMode ? "white" : "white",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{item}</td>
                        <td>
                          <button
                            className="g-btn itemClickable"
                            style={{
                              padding: "0px 20px 5px 20px",
                              width: "7rem",
                            }}
                            onClick={() => {
                              Navigate(`/detailed-admin-info/${item}`);
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
                              removeAdmin(item);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </>
            )}
          </Table>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default ViewAdmins;
