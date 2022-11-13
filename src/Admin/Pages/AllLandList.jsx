import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../../Context";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Utils/LoadingSpinner/LoadingSpinner";
import axios from "axios";

const AllLandList = () => {
  const Navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    setIsLoading(true);
    const apiHandler = async () => {
      try {
        const resp = await axios.get(
          "https://ethland-backend.herokuapp.com/api/v1/lands/getalllands"
        );
        console.log(resp.data.data);
        setResponse(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    apiHandler();
  }, []);

  return (
    <Container>
      <br />
      <h2>List of Registered Lands</h2>
      <br />
      <Table
        responsive="sm"
        bordered
        style={{
          color: darkMode ? "white" : "black",
        }}
      >
        <thead>
          <tr>
            <th>Location</th>
            <th>Khaiwat No.</th>
            <th>Khasra No.</th>
            <th>Area</th>
            <th>Land Id</th>
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
                  <td>{item.location}</td>
                  <td>{item.khaiwatNo}</td>
                  <td>{item.khasraNumber}</td>
                  <td>{item.area}</td>
                  <td>{item._id}</td>
                  <td>
                    <button
                      className="g-btn"
                      style={{ height: "2rem", padding: "0px 10px 0px 10px" }}
                      onClick={() => {
                        Navigate(`/detailedlandinfobyadmin/${item._id}`);
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

export default AllLandList;
