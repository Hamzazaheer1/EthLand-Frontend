import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AddFardPhoto = () => {
  const [landId, setLandId] = useState(0);
  const [photo, setPhoto] = useState("");

  const fardImageHandler = async () => {
    const fd = new FormData();
    fd.append("id", landId);
    fd.append("photo", photo);

    try {
      const resp = await axios.patch(
        "https://ethland-backend.herokuapp.com/api/v1/lands/uploadphoto",
        fd
      );

      console.log(resp);
      alert("Fard Updated Successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Upload Fard Photos for existing record.</h1>
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
    </div>
  );
};

export default AddFardPhoto;
