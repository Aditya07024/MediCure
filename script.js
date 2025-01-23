// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Handle login button click
  document.getElementById("loginButton").addEventListener("click", () => {
    const email = prompt("Enter your email:");
    if (email) {
      alert(`Welcome, ${email}! You have logged in successfully.`);
      console.log(`Login email sent to: ${email}`);
    }
  });

  // Handle doctor booking
  document.querySelectorAll(".book-consultation").forEach((button) => {
    button.addEventListener("click", () => {
      const doctorName = button.getAttribute("data-doctor");
      alert(`You have booked a consultation with ${doctorName}.`);
    });
  });

  // Handle medical test booking
  document.querySelectorAll(".book-test").forEach((button) => {
    button.addEventListener("click", () => {
      const testName = button.getAttribute("data-test");
      alert(`You have booked a ${testName}.`);
    });
  });

  // Handle pharmacy locator
  document.getElementById("findPharmacyButton").addEventListener("click", () => {
    const location = document.getElementById("locationInput").value;
    if (location) {
      alert(`Searching for pharmacies near ${location}...`);
      // Mocked response
      const pharmacies = ["Pharmacy 1", "Pharmacy 2", "Pharmacy 3"];
      const pharmacyList = document.getElementById("pharmacyList");
      pharmacyList.innerHTML = pharmacies
        .map((pharmacy) => `<li>${pharmacy}</li>`)
        .join("");
    } else {
      alert("Please enter your location.");
    }
  });

  // Handle payment
  document.getElementById("proceedPayment").addEventListener("click", () => {
    const paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod) {
      alert(`Payment successful using ${paymentMethod}.`);
      document.getElementById("thankYouMessage").style.display = "block";
    } else {
      alert("Please select a payment method.");
    }
  });
});
