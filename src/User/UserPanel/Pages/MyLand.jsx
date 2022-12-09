import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import { BsInfoCircleFill } from "react-icons/bs";

const MyLand = () => {
  const Navigate = useNavigate();
  const [landData, setLandData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [pkView, setPkView] = useState("");
  const [showKey, setShowKey] = useState(false);

  let selectedAccount;
  let ContractInstance;
  let landids;

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const init = () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        provider
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setPkView(accounts[0]);
            selectedAccount = accounts[0];
            const web3 = new Web3(provider);
            ContractInstance = new web3.eth.Contract(
              CONTACT_ABI,
              CONTACT_ADDRESS
            );
            getLandsByPK(selectedAccount);
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    };

    init();
  }, []);

  const getLandsId = async () => {
    setIsLoading(true);
    await ContractInstance.methods
      .myAllLands(selectedAccount)
      .call()
      .then((data) => {
        landids = data;
      });

    for (let i = 0; i < landids.length; i++) {
      ContractInstance.methods
        .LandR(landids[i])
        .call()
        .then((data) => {
          setLandData((prevlandData) => [...prevlandData, data]);
        });
    }

    setIsLoading(false);
  };

  const getLandsByPK = async (x) => {
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://land-backend.herokuapp.com/api/v1/lands/getlandbyPK/${x}`
      );
      setResponse(resp.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        My Lands
        <BsInfoCircleFill
          style={{
            height: "1rem",
            marginTop: "8px",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowKey(!showKey);
          }}
        />
      </h2>
      <p style={{ color: "gray", fontSize: "1rem", marginLeft: "1rem" }}>
        {showKey && (
          <p>
            Your Public Key:{" "}
            <span style={{ marginLeft: "5px", color: "black" }}>{pkView}</span>
          </p>
        )}
      </p>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />

      <Table
        responsive="sm"
        bordered
        style={{
          color: darkMode ? "white" : "black",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Location</th>
            <th>Khaiwat No.</th>
            <th>Khasra No.</th>
            <th>Area</th>
            <th>Is For Sale</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <tbody>
            {response &&
              response.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.location}</td>
                  <td>{item.khaiwatNo}</td>
                  <td>{item.khasraNumber}</td>
                  <td>{item.area}</td>
                  <td>{item.isForSale ? <td>True</td> : <td>False</td>}</td>
                  <td>
                    <button
                      className="g-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        Navigate(`/detailed-info/${item._id}`);
                      }}
                    >
                      Detailed Info
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default MyLand;
