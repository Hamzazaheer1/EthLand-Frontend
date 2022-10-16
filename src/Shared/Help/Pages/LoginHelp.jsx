import React from "react";
import meta11 from "../img/11.png";
import meta12 from "../img/12.png";
import meta17 from "../img/17.jpeg";
import meta13 from "../img/13.png";

const LoginHelp = () => {
  return (
    <div className="home ">
      <br />
      <br />
      <h1
        style={{ fontSize: "2rem", marginBottom: "0.5rem", fontWeight: "bold" }}
      >
        User Login
      </h1>
      <p style={{ marginBottom: "3rem" }}>
        <b>
          Follow this guide if you have completed the registration guide before.
        </b>
      </p>

      <h3 style={{ marginBottom: "1rem" }}>
        1. On the navigation bar click <b>Login</b> "a login form will be
        appear"
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        1 - Fill the form and click login button.
      </p>
      <img
        className="img-fluid"
        src={meta11}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>2. Wait for verification</h3>
      <p style={{ marginBottom: "1rem" }}>
        If your are logging in for the first time it will give this alert.
        <b>You are not yet verified.</b>
        <br />
        For this case all you have to do is to wait till admin verifies all your
        provided details and verify your account.
      </p>
      <img
        className="img-fluid"
        src={meta17}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>3. Click Login</h3>
      <p style={{ marginBottom: "1rem" }}>
        After sometime.
        <br />1 - Fill the login form and <b>click Login</b>.
        <br />2 - User will be redirected to <b>User Panel</b>.
        <br />3 - Incase of wrong credentials{" "}
        <b>Wrong key or wallet message will be appears.</b>.
      </p>
      <img
        className="img-fluid"
        src={meta12}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
      <h3 style={{ marginBottom: "1rem" }}>4. User Panel</h3>
      <img
        className="img-fluid"
        src={meta13}
        alt="meta1 img missing"
        width={"1000"}
        style={{ marginBottom: "3rem", border: "solid" }}
      />
    </div>
  );
};

export default LoginHelp;
