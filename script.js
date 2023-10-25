document.addEventListener("DOMContentLoaded", function () {
    const jsonUrl = "Ammatadiio-lodge.json";
    const cardContainer = document.getElementById("card-container");

    function createCard(item) {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = item["Table 1"];
        img.alt = "Card Image";
        card.appendChild(img);

        const cardDetails = document.createElement("div");
        cardDetails.className = "card-details";

        const issuer = document.createElement("p");
        issuer.className = "issuer";
        issuer.textContent = "Issuer: " + item.issuer;
        cardDetails.appendChild(issuer);

        const issueDate = document.createElement("p");
        issueDate.className = "issue-date";
        issueDate.textContent = "Issue Date: " + item.issuedate;
        cardDetails.appendChild(issueDate);

        const quantity = document.createElement("p");
        quantity.className = "quantity";
        quantity.textContent = "Quantity: " + item.qty;
        cardDetails.appendChild(quantity);

        card.appendChild(cardDetails);

        return card;
    }

    function displayCards() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((item) => {
                    const card = createCard(item);
                    cardContainer.appendChild(card);
                });
            })
            .catch((error) => {
                console.error("Error fetching JSON:", error);
            });
    }

    // Function to filter cards based on a key and value
    function filterCards(key, value) {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            const cardDetails = card.querySelector(".card-details");
            const cardValue = cardDetails.querySelector(`.${key}`);
            if (cardValue) {
                if (cardValue.textContent.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
    }

    // Add event listeners for filters
    const filters = document.querySelectorAll(".filter");
    filters.forEach((filter) => {
        filter.addEventListener("change", () => {
            const key = filter.getAttribute("data-key");
            const value = filter.value;
            filterCards(key, value);
        });
    });

    // Call the function to display the cards
    displayCards();
});