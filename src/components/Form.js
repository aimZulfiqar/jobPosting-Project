import React from "react";
import "./formStyle.css";
import logo from "./trimulabslogo.jpg";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_JOB } from "./GraphQL/Mutation";

const Form = () => {
  const [addjob] = useMutation(ADD_JOB);
  const [errorMsg, setErrorMsg] = useState("");

  const [fieldText, setFieldText] = useState({
    title: "",
    commitmentId: "cjtu8esth000z0824x00wtp1i",
    companyName: "Trimulabs",
    locationNames: "",
    description: "",
    applyUrl: "",
    userEmail: "",
  });

  const formValidation = ({
    job_title,
    location,
    description,
    link,
    Email,
  }) => {
    if (
      job_title === "" ||
      location === "" ||
      description === "" ||
      link === "" ||
      Email === ""
    ) {
      setErrorMsg("Missing Values in form");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (formValidation(fieldText))
      try {
        const response = await addjob({ variables: { input: { ...fieldText } } });
        if (response) {
          console.log("Added New Job", response);
          alert(`Job with title ${response.data.postJob.title} is created successfully`);
          console.log("job added successfully");
        }
      } catch (error) {
        console.log("error", error);

        alert("error posting job");
      }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="container">
        <div className="form">
          <div className="wrap">
            <div className="f1">
              <label>Organization</label>
              <input type="text" value={fieldText.companyName} readOnly></input>
            </div>
            <div className="f2">
              <label>Commitment ID</label>
              <input
                type="text"
                value={fieldText.commitmentId}
                readOnly
              ></input>
            </div>
          </div>
          <div className="wrap">
            <div className="f1">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={fieldText.job_title}
                autoFocus
                onChange={(e) =>
                  setFieldText({ ...fieldText, title: e.target.value })
                }
              ></input>
            </div>
            <div className="f2">
              <label>Job Location</label>
              <input
                type="text"
                value={fieldText.location}
                placeholder="Enter Job Location"
                onChange={(e) =>
                  setFieldText({ ...fieldText, locationNames: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="wrap2">
            <label>Email</label>
            <input
              type="text"
              value={fieldText.userEmail}
              placeholder="Enter User Email"
              onChange={(e) =>
                setFieldText({ ...fieldText, userEmail: e.target.value })
              }
            ></input>
          </div>
          <div className="wrap2">
            <label>Job Description</label>
            <input
              type="text"
              value={fieldText.description}
              placeholder="Enter Job Description"
              onChange={(e) =>
                setFieldText({ ...fieldText, description: e.target.value })
              }
            ></input>
          </div>

          <div className="wrap2">
            <label>Link To Apply</label>
            <input
              type="text"
              value={fieldText.link}
              placeholder="Enter Application form link"
              onChange={(e) =>
                setFieldText({ ...fieldText, applyUrl: e.target.value })
              }
            ></input>
          </div>
          <div>
            <p className="error">{errorMsg}</p>
          </div>
          <button className="btn">Create Job</button>
        </div>
        <div className="image">
          <img src={logo} className="img" alt="" />
        </div>
      </div>
    </form>
  );
};

export default Form;
