const apiUrl =
  "https://v6.exchangerate-api.com/v6/6d1848629b338004876509e9/latest/";
let fromState = "RUB";
let toState = "USD";
let fromInput = document.querySelector(".inputFrom");
let toInput = document.querySelector(".inputTo");
let fromButtons = document.querySelectorAll(".fromButtons div");
let toButtons = document.querySelectorAll(".toButtons div");
let leftConversion = document.querySelector(".leftConvervion");
let rightConversion = document.querySelector(".rightConvervion");
let icon = document.querySelector(".icon");
let sidee = document.querySelector(".side");
let side = false;
async function fetchData(baseCurrency) {
  try {
    if (!navigator.onLine) {
      const cachedData = localStorage.getItem(baseCurrency);
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        alert("no internet connection. please check network");
        return null;
      }
    }
    const response = await fetch(`${apiUrl}${baseCurrency}`);
    if (!response.ok) throw new Error("fetch failed");
    const data = await response.json();
    localStorage.setItem(baseCurrency, JSON.stringify(data.conversion_rates));
    // console.log(data);
    return data.conversion_rates;
  } catch (err) {
    console.error("error:", err.message);
    alert("Failed to load rates. Please try again later.");
    return null;
  }
}
function buttonSelection(buttons, isFromSide) {
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const selectedCurrency = button.textContent.trim();
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "white";
        btn.style.color = "#959BA4";
      });
      button.style.backgroundColor = "#833AE0";
      button.style.color = "white";
      if (
        (isFromSide && selectedCurrency === toState) ||
        (!isFromSide && selectedCurrency === fromState)
      ) {
        toInput.value = fromInput.value;
        fromInput.value = toInput.value;
        leftConversion.textContent = `1 ${selectedCurrency} = 1 ${selectedCurrency}`;
        rightConversion.textContent = `1 ${selectedCurrency} = 1 ${selectedCurrency}`;

        return;
      }

      if (isFromSide) {
        fromState = selectedCurrency;
      } else {
        toState = selectedCurrency;
      }
      conversion();
    });
  });
}
async function conversion() {
  const rates = await fetchData(fromState);
  if (!rates) return;
  const rate = rates[toState];
  toInput.value = (fromInput.value * rate).toFixed(2);
  leftConversion.textContent = `1 ${fromState} = ${rate.toFixed(2)} ${toState}`;
  rightConversion.textContent = `1 ${toState} = ${(1 / rate).toFixed(
    2
  )} ${fromState}`;
}
fromInput.addEventListener("input", () => {
  conversion();
});
toInput.addEventListener("input", async () => {
  const rates = await fetchData(toState);
  if (!rates) return;
  const rate = rates[fromState];
  fromInput.value = (toInput.value * rate).toFixed(2);
});
conversion();
buttonSelection(fromButtons, true);
buttonSelection(toButtons, false);
icon.addEventListener("click", () => {
  side = !side;
  if (side == true) {
    sidee.style.display = "flex";
  } else {
    sidee.style.display = "none";
  }
});
