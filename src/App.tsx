import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    async function fetchData() {
      await fetch("/greeting")
        .then((res) => res.json())
        .then((data) => {
          setGreeting(data);
        });
    }
    fetchData();
  }, []);

  return <div>{greeting}</div>;
}

export default App;
