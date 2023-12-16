import React, { useState } from "react";

const NumberOffices = ({ id, label, count, setCount }) => {
  const handleIncrease = () => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] === null ? 1 : prevCounts[id] + 1,
    }));
  };

  const handleDecrease = () => {
    if (count !== null && count > 0) {
      setCount((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1,
      }));
    }
  };

  return (
    <div className="d-flex NumberBox">
      <span className="labelNumber">{label}</span>
      <div className="NumberBoxInput">
        <button
          className="btnStyle"
          onClick={handleDecrease}
          disabled={count === null || count === 0}
          style={{
            color:
              count === null || count === 0 ? "gray" : "var(--green-color)",
          }}
        >
          -
        </button>
        <input
          className="NumberInput"
          placeholder={count === null ? "لايوجد" : ""}
          value={count === null ? "" : count}
          readOnly
        />
        <button className="btnStyle" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

const OfiicesNumberDetails = () => {
  const [counts, setCounts] = useState({
    1: null,
    2: null,
    3: null,
  });

  console.log("Counts:", counts);

  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">تفاصيل غرف المكتب</p>
      </div>
      {dataArray.map((data) => (
        <NumberOffices
          key={data.id}
          label={data.label}
          id={data.id}
          count={counts[data.id]}
          setCount={setCounts}
        />
      ))}
    </>
  );
};

const dataArray = [
  {
    id: 1,
    label: "قاعة اجتماعات",
  },
  {
    id: 2,
    label: " مكتب مستقل",
  },
  {
    id: 3,
    label: "مكتب مشترك",
  },
];

export default OfiicesNumberDetails;
