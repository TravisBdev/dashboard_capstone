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
    // console.log(data);
    authorName.textContent = data.user.name;
  } catch (err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
  }
}

async function getPrice() {
  const cryptoPrice = document.querySelector(".crypto");
  const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
  const data = await res.json();
  const currentPrice = data.market_data.current_price.usd;
  cryptoPrice.textContent = `Bitcoin Price: $${currentPrice} usd`;
  console.log(currentPrice);
}

getBackgroundImg();
getPrice();
