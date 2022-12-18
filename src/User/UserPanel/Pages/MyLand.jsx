import React, { useState, useEffect, useContext } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../../contract";
import { themeContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import LoadingSpinner from "../../../Utils/LoadingSpinner/LoadingSpinner";
import Web3 from "web3";

const MyLand = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [pkView, setPkView] = useState("");
  const [showKey, setShowKey] = useState(false);

  let selectedAccount;
  let ContractInstance;

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

  const getLandsByPK = async (x) => {
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `https://landbackend-production.up.railway.app/api/v1/lands/getlandbyPK/${x}`
      );
      setResponse(resp.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

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
        <tbody>
          {response &&
            response.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.location}</td>
                <td>{item.khaiwatNo}</td>
                <td>{item.khasraNumber}</td>
                <td>{item.area}</td>
                <td>
                  {item.isForSale ? <span>True</span> : <span>False</span>}
                </td>
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
      </Table>
    </Container>
  );
};

export default MyLand;
