async function getBackgroundImg() {
  const res = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  );
  const data = await res.json();
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(${data.urls.raw})`;
  console.log(data);
}

getBackgroundImg();
