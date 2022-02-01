function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320, 240);

  if ("geolocation" in navigator) {
    console.log("Geolocation is available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = long;
      document
        .getElementById("mood")
        .addEventListener("keypress", async (e) => {
          if (e.key === "Enter") {
            const mood = document.getElementById("mood").value;
            video.loadPixels();
            const image64 = video.canvas.toDataURL();

            const data = {lat, long, mood, image64};
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            const response = await fetch("/api", options);

            const datajson = await response.json();
            console.log(datajson);
          }
        });
    });
  } else {
    console.log("Geolocation is not available");
  }
}
