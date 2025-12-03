  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Your message has been sent!");

    this.reset();
  }); 

  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("SW registration failed:", err));
  });
}
