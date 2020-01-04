import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  });

  const fetchValues = async () =>
    setValues(await axios.get("/api/values/current"));

  const fetchIndexes = async () =>
    setSeenIndexes(await axios.get("/api/values/all"));

  const renderSeenIndexes = () =>
    seenIndexes.map(({ number }) => number).join(", ");

  const renderValues = () =>
    Object.keys(values).map(key => (
      <div key={key}>
        For index {key} I calculated {values[key]}{" "}
      </div>
    ));

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", {
      index
    });
    setIndex("");
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit()}>
        <label>Enter your index</label>
        <input value={index} onChange={event => setIndex(event.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </Fragment>
  );
};
