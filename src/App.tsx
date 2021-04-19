import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `https://canopy-frontend-task.vercel.app/api/holdings`;
    function getData() {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((value) => {
          setData(value.payload);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      {loading ? "Data loading" : <Table datas={data} />}
    </div>
  );
}

export default App;
