import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <table>
      <caption>Курс валют</caption>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Купівля</th>
          <th>Продаж</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>USD</td>
          <td>{props.exchangeRates.buy.USD}</td>
          <td>{props.exchangeRates.sell.USD}</td>
        </tr>
        <tr>
          <td>EURO</td>
          <td>{props.exchangeRates.buy.EURO}</td>
          <td>{props.exchangeRates.sell.EURO}</td>
        </tr>
      </tbody>
    </table>
  );
}
