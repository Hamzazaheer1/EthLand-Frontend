import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../../Context";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import LoadingSpinner from "../../Utils/LoadingSpinner/LoadingSpinner";
import "./Blockchain.css";

const Blockchain = () => {
  const Navigate = useNavigate();
  const [totalBlock, setTotalBlock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const getBlocks = () => {
      setIsLoading(true);
      const provider = new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/8ff2c52ab5f84715a1a80ff08a5bd47a"
      );
      const web3 = new Web3(provider);
      web3.eth.net
        .isListening()
        .then(() => console.log("web3 is connected"))
        .catch((e) => console.log("Wow. Something went wrong"));

      web3.eth.getBlockNumber().then((l) => {
        for (let i = l - 100; i <= l; i++) {
          web3.eth.getBlock(i).then((b) => {
            setTotalBlock((prevtotalBlock) => [...prevtotalBlock, b]);
          });
        }
        setIsLoading(false);
      });
    };
    getBlocks();
  }, []);

  return (
    <div>
      <Container>
        <h2>Blockchain</h2>

        <div>
          <br />
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Block Height or Hash to Search"
              aria-label="Block Height"
              aria-describedby="basic-addon2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </InputGroup>
          <Table responsive="sm" bordered striped>
            <thead>
              <tr
                style={{
                  color: darkMode ? "white" : "black",
                }}
              >
                <th>Height</th>
                <th>TX #</th>
                <th>STATE HASH</th>
              </tr>
            </thead>
            {isLoading ? (
              <LoadingSpinner asOverlay />
            ) : (
              totalBlock.length > 0 &&
              totalBlock
                .sort((a, b) => (a.number < b.number ? -1 : 1))
                .reverse()
                .filter((item) => {
                  if (searchTerm == "") {
                    return item;
                  } else if (item.number == searchTerm * 1) {
                    return item;
                  } else if (item.hash.includes(searchTerm)) {
                    return item;
                  }
                })
                .map((item) => (
                  <tbody>
                    <tr
                      className="itemClickable"
                      onClick={() => {
                        Navigate(`/txdata/${item.number}`);
                      }}
                    >
                      <td style={{ color: darkMode ? "white" : "black" }}>
                        {item.number}
                      </td>
                      <td style={{ color: darkMode ? "white" : "black" }}>
                        {item.transactions.length}
                      </td>
                      <td
                        style={{ color: darkMode ? "white" : "black" }}
                        className="d-inline-block text-truncate truncate"
                      >
                        {item.hash}
                      </td>
                    </tr>
                  </tbody>
                ))
            )}
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Blockchain;
