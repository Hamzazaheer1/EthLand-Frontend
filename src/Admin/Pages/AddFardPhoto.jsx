import React from "react";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Container } from "react-bootstrap";
import { themeContext } from "../../Context";

const AddFardPhoto = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [landId, setLandId] = useState(0);
  const [photo, setPhoto] = useState("");

  const fardImageHandler = async () => {
    const fd = new FormData();
    fd.append("id", landId);
    fd.append("photo", photo);

    try {
      const resp = await axios.patch(
        "https://landbackend-production.up.railway.app/api/v1/lands/uploadphoto",
        fd
      );

      console.log(resp);
      alert("Fard Updated Successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <h2 style={{ color: "var(--yellow)" }}>
        Upload Fard Photos for existing record.
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <Form.Label htmlFor="landID">Land Id</Form.Label>
      <Form.Control
        type="text"
        id="landID"
        aria-describedby="landID"
        onChange={(e) => setLandId(e.target.value)}
      />
      <br />
      <Form.Label htmlFor="landphoto">Fard Image</Form.Label>
      <Form.Control
        type="file"
        id="landphoto"
        aria-describedby="landphoto"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button
        className="g-btn"
        style={{ marginTop: "2rem" }}
        onClick={() => {
          fardImageHandler();
        }}
      >
        Submit
      </button>
    </Container>
  );
};

export default AddFardPhoto;
