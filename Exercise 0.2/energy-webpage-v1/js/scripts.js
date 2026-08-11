const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answer = question.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});

const calculateButton = document.getElementById("calculate-btn");

if (calculateButton) {

    calculateButton.addEventListener("click", function () {

        const power = parseFloat(document.getElementById("power").value);
        const hours = parseFloat(document.getElementById("hours").value);
        const price = parseFloat(document.getElementById("price").value);

        const message = document.getElementById("calculator-message");

        if (
            isNaN(power) ||
            isNaN(hours) ||
            isNaN(price) ||
            power <= 0 ||
            hours < 0 ||
            hours > 24 ||
            price < 0
        ) {
            message.textContent =
                "Please enter valid values. Hours used must be between 0 and 24.";

            return;
        }

        message.textContent = "";

        const dailyEnergy = (power / 1000) * hours;
        const monthlyEnergy = dailyEnergy * 30;
        const yearlyEnergy = dailyEnergy * 365;

        const pricePerKWh = price / 100;
        const monthlyCost = monthlyEnergy * pricePerKWh;

        document.getElementById("daily-energy").textContent =
            dailyEnergy.toFixed(2);

        document.getElementById("monthly-energy").textContent =
            monthlyEnergy.toFixed(2);

        document.getElementById("yearly-energy").textContent =
            yearlyEnergy.toFixed(2);

        document.getElementById("monthly-cost").textContent =
            monthlyCost.toFixed(2);
    });
}