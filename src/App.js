import "./App.css";
import Header from "./components/Header/Header";
import Converter from "./components/Converter/Converter";
import axios from "axios";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

function App() {
  const [exchangeRates, setExchangeRates] = useState({ ready: false });

  function handleResponse(response) {
    setExchangeRates({
      ready: true,
      sell: {
        USD: response.data[0].rateSell,
        EURO: response.data[1].rateSell,
      },
      buy: {
        USD: response.data[0].rateBuy,
        EURO: response.data[1].rateBuy,
      },
    });
    console.log(response);
  }

  if (exchangeRates.ready) {
    return (
      <div className="App">
        <Header exchangeRates={exchangeRates} />
        <Converter exchangeRates={exchangeRates} />
      </div>
    );
  } else {
    const apiUrl = "https://api.monobank.ua/bank/currency";
    axios.get(apiUrl).then(handleResponse);

    return (
      <Circles
        height="80"
        width="80"
        color="#621da3"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
      />
    );
  }
}

export default App;
