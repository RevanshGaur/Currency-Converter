const amount = document.querySelector("#input");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='to']");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const BASE_URL = "https://open.er-api.com/v6/latest/";
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = 1;
    }
    try {
        const response = await fetch(`${BASE_URL}${fromCurr.value}`);
        const data = await response.json();
        const rate = data.rates[toCurr.value];
        if (!rate) {
            msg.innerText = "Currency not supported.";
            return;
        }
        const finalAmount = amtVal * rate;
        msg.innerText =
            `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error(error);
        msg.innerText = "Failed to fetch exchange rates.";
    }
});