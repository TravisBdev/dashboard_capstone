/* 
  Author: Travis Brown
*/

// Provides random background image for the dashboard, credits photographer.
async function getBackgroundImg() {
  const authorName = document.querySelector(".author-name");
  try {
    const res = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    const data = await res.json();
    document.querySelector(
      "body"
    ).style.backgroundImage = `url(${data.urls.raw})`;
    authorName.textContent = `Photographer: ${data.user.name}`;
  } catch (err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
  }
}

// gets latest Bitcoin market data and renders to dashboard.
async function getPrice() {
  try {
    const cryptoContainer = document.querySelector(".crypto-container");
    const cryptoPrice = document.querySelector(".crypto-price");
    const bitcoinLogo = document.querySelector(".bitcoin-logo");
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    if (!res.ok) {
      throw Error("Data not available at this time.");
    }
    const data = await res.json();
    const currentPrice = data.market_data.current_price.usd;
    cryptoContainer.innerHTML = `
      <div class='crypto'>
      <img src="${data.image.thumb}" alt="bitcoin price" />
      <span class='crypto-price'>${data.name}: $${currentPrice}</span>
      </div>
      <div class='market-data'>
        <p class='high-price'>24-Hour High: $${data.market_data.high_24h.usd}</p>
        <p class='low-price'>24-Hour Low: $${data.market_data.low_24h.usd}</p>
      </div>
    `;
    bitcoinLogo.src = data.image.thumb;
  } catch (err) {
    console.error(err);
    cryptoPrice.textContent = "Not available at this time.";
  }
}

// provides clock functionality.
function time() {
  const time = new Date().toLocaleTimeString([], { timeStyle: "short" });
  document.querySelector(".time").textContent = time;
}
setInterval(time, 1000);

/* gets user location to provide weather api with lat and lon
   then renders that data to the weather section.
*/
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Data currently unavailable");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(error));
});

// function calls.
getBackgroundImg();
getPrice();
