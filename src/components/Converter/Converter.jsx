import React, { useState } from "react";
import "./Converter.css";

export default function Converter(props) {
  const [giveSum, setGiveSum] = useState(100);
  const [getSum, setGetSum] = useState(
    Math.round(100 * props.exchangeRates.buy.USD * 100) / 100
  );
  const [giveCurrency, setGiveCurrency] = useState("USD");
  const [getCurrency, setGetCurrency] = useState("UAH");

  function handleGiveSum(event) {
    convertFrom(event.target.value);
    setGiveSum(event.target.value);
  }

  function handleGetSum(event) {
    convertTo(event.target.value);
    setGetSum(event.target.value);
  }

  function handleGiveCurrency(event) {
    convertFrom(giveSum, event.target.value, getCurrency);
    setGiveCurrency(event.target.value);
  }

  function handleGetCurrency(event) {
    convertFrom(giveSum, giveCurrency, event.target.value);
    setGetCurrency(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function convertFrom(
    value = giveSum,
    firstCurrency = giveCurrency,
    secondCurrency = getCurrency
  ) {
    switch (firstCurrency) {
      case "USD":
        secondCurrency === "UAH"
          ? setGetSum(
              Math.round(value * props.exchangeRates.buy.USD * 100) / 100
            )
          : secondCurrency === "EURO"
          ? setGetSum(
              Math.round(
                ((value * props.exchangeRates.sell.USD) /
                  props.exchangeRates.sell.EURO) *
                  100
              ) / 100
            )
          : setGetSum(Math.round(value * 100) / 100);
        break;
      case "EURO":
        secondCurrency === "UAH"
          ? setGetSum(
              Math.round(value * props.exchangeRates.buy.EURO * 100) / 100
            )
          : secondCurrency === "USD"
          ? setGetSum(
              Math.round(
                ((value * props.exchangeRates.buy.EURO) /
                  props.exchangeRates.buy.USD) *
                  100
              ) / 100
            )
          : setGetSum(Math.round(value * 100) / 100);
        break;
      case "UAH":
        secondCurrency === "USD"
          ? setGetSum(
              Math.round((value / props.exchangeRates.sell.USD) * 100) / 100
            )
          : secondCurrency === "EURO"
          ? setGetSum(
              Math.round((value / props.exchangeRates.sell.EURO) * 100) / 100
            )
          : setGetSum(Math.round(value * 100) / 100);

        break;
      default:
    }
  }

  function convertTo(value = getSum) {
    switch (giveCurrency) {
      case "USD":
        getCurrency === "UAH"
          ? setGiveSum(
              Math.round((value / props.exchangeRates.buy.USD) * 100) / 100
            )
          : getCurrency === "EURO"
          ? setGiveSum(
              Math.round(
                ((value * props.exchangeRates.sell.USD) /
                  props.exchangeRates.sell.EURO) *
                  100
              ) / 100
            )
          : setGiveSum(Math.round(value * 100) / 100);
        break;
      case "EURO":
        getCurrency === "UAH"
          ? setGiveSum(
              Math.round((value / props.exchangeRates.buy.EURO) * 100) / 100
            )
          : getCurrency === "USD"
          ? setGiveSum(
              Math.round(
                ((value * props.exchangeRates.buy.EURO) /
                  props.exchangeRates.buy.USD) *
                  100
              ) / 100
            )
          : setGiveSum(Math.round(value * 100) / 100);
        break;
      case "UAH":
        getCurrency === "USD"
          ? setGiveSum(
              Math.round(value * props.exchangeRates.sell.USD * 100) / 100
            )
          : getCurrency === "EURO"
          ? setGiveSum(
              Math.round(value * props.exchangeRates.sell.EURO * 100) / 100
            )
          : setGiveSum(Math.round(value * 100) / 100);
        break;
      default:
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="number" value={giveSum} onChange={handleGiveSum} />
        <select onChange={handleGiveCurrency}>
          <option selected value="USD">
            USD
          </option>
          <option value="EURO">EURO</option>
          <option value="UAH">UAH</option>
        </select>
      </form>
      <form onSubmit={handleSubmit}>
        <input type="number" value={getSum} onChange={handleGetSum} />
        <select onChange={handleGetCurrency}>
          <option value="USD">USD</option>
          <option value="EURO">EURO</option>
          <option selected value="UAH">
            UAH
          </option>
        </select>
      </form>
    </div>
  );
}
