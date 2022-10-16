import React from "react";
import meta18 from "../img/18.png";
import meta14 from "../img/14.png";
import meta15 from "../img/15.png";
import meta16 from "../img/16.png";

const RegisterHelp = () => {
  return (
    <div className="home ">
      <br />
      <br />
      <h1
        style={{ fontSize: "2rem", marginBottom: "0.5rem", fontWeight: "bold" }}
      >
        User Registration
      </h1>
      <p style={{ marginBottom: "3rem" }}>
        All the users have to registered and verified to use the EthLand.
      </p>

      <h3 style={{ marginBottom: "1rem" }}>
        1. On the navigation bar click <b>Register</b> "a registeration form
        will be appear"
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        Fill out the following form below with the correct credentials and click
        on a signup button.
      </p>
      <img
        className="img-fluid"
        src={meta14}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>2. Click Signup</h3>
      <p style={{ marginBottom: "1rem" }}>
        Click on a signup button and wait for metamask to open.
        <br />
        1 - Once metamask is open provide your metamask password on it and
        login.
        <br />2 - Preceed toward the signup transaction.
      </p>
      <img
        className="img-fluid"
        src={meta15}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>3. Sign Metamask Transaction</h3>
      <p style={{ marginBottom: "1rem" }}>
        After reading the contract interaction <b>Signup Tranasaction</b>.
        <br />1 - Click <b>Confirm</b> to perceed with register process.
        <br />2 - Click <b>Reject</b> to cancel the transaction process.
      </p>
      <img
        className="img-fluid"
        src={meta16}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>4. Sucessfull transaction</h3>
      <p style={{ marginBottom: "1rem" }}>
        After sucessfull transaction from Metamask the user will be redirected
        to the login page.
      </p>
      <img
        className="img-fluid"
        src={meta18}
        alt="meta13 missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
    </div>
  );
};

export default RegisterHelp;
