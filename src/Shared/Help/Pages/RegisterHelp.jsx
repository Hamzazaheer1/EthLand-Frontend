import React from "react";
import meta18 from "../img/18.png";
import meta14 from "../img/14.png";
import meta15 from "../img/15.png";
import meta16 from "../img/16.png";
import { useContext } from "react";
import { themeContext } from "../../../Context";

const RegisterHelp = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="mt-5">
      <h2 style={{ color: "var(--yellow)", display: "flex" }}>
        User Registration
        <p style={{ color: "gray", fontSize: "1rem", marginTop: "1rem" }}>
          &nbsp;&nbsp;All the users have to registered and verified to use the
          EthLand.
        </p>
      </h2>
      <hr
        style={{
          color: darkMode ? "var(--yellow)" : "var(--black)",
          border: "2px solid",
        }}
      />
      <br />
      <br />

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
