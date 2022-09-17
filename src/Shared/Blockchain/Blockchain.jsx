import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import "./Blockchain.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../../Context";

const Blockchain = () => {
  const Navigate = useNavigate();
  const [length, setLength] = useState(0);
  const [totalBlock, setTotalBlock] = useState([]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    const checkLastBlock = async () => {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      const len = web3.eth.getBlockNumber();
      len.then((l) => {
        const x = l;
        setLength(x);

        for (let i = 0; i <= l; i++) {
          const block = web3.eth.getBlock(i);
          block.then((b) => {
            setTotalBlock((prevtotalBlock) => [...prevtotalBlock, b]);
          });
        }
      });
    };
    checkLastBlock();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container>
        <h2>Blockchain</h2>
        <div>
          <Table responsive="sm" bordered striped>
            <thead>
              <tr
                style={{
                  // backgroundColor: darkMode ? "var(--yellow)" : "white",
                  color: darkMode ? "white" : "black",
                }}
              >
                <th>Height</th>
                <th>TX #</th>
                <th>STATE HASH</th>
              </tr>
            </thead>
            {totalBlock.length > 0 &&
              totalBlock
                .sort((a, b) => (a.number < b.number ? -1 : 1))
                .reverse()
                .map((item) => (
                  <tbody>
                    <tr
                      className="itemClickable"
                      onClick={() => {
                        Navigate(`/txdata/${item.number}`);
                      }}
                    >
                      <td>{item.number}</td>
                      <td>{item.transactions.length}</td>
                      <td className="truncate">{item.hash}</td>
                    </tr>
                  </tbody>
                ))}
          </Table>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Blockchain;
