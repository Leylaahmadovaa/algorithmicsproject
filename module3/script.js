let fromRUB = document.querySelector(".fromRUB");
let fromUSD = document.querySelector(".fromRUB");
let fromEUR = document.querySelector(".fromEUR");
let fromGBP = document.querySelector(".fromGBP");
let toRUB = document.querySelector(".toRUB");
let toUSD = document.querySelector(".toRUB");
let toEUR = document.querySelector(".toEUR");
let toGBP = document.querySelector(".toGBP");
let fromState="RUB"
let toState="USD"

async function getExchangeRates() {
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/6d1848629b338004876509e9/latest/USD"
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Error:", err.message);
  }
}

getExchangeRates();
