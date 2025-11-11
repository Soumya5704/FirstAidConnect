const documents = {
    "Burns": "Cool the burn immediately with cool (not cold) water for 10-15 minutes. Do not apply ice directly.",
    "Bleeding": "Apply direct pressure using a clean cloth to stop bleeding. Keep the wound elevated if possible.",
    "Fracture": "Keep the injured area still. Apply a splint and seek medical help immediately.",
    "CPR": "If someone is not breathing, perform 30 chest compressions followed by 2 rescue breaths.",
    "Heat Stroke": "Move the person to a cool place, give sips of water, and use wet cloths to cool the body.",
    "Poisoning": "Do not induce vomiting. Call emergency services and provide details of the poison if known."
};

function searchSite(query) {
    const results = document.getElementById("results");
    results.innerHTML = "";
    if (!query.trim()) return;
    for (let title in documents) {
        if (title.toLowerCase() === query.toLowerCase()) {
            results.innerHTML = `
                <div class="result-box">
                    <h3>${title}</h3>
                    <p>${documents[title]}</p>
                </div>
            `;
            return;
        }
    }
    results.innerHTML = "<p>No matching first aid topic found.</p>";
}

function showSuggestions() {
    const input = document.getElementById("searchInput");
    const suggestions = document.getElementById("suggestions");
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";
    if (!query.trim()) return;
    for (let title in documents) {
        if (title.toLowerCase().includes(query)) {
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion-item");
            suggestion.textContent = title;
            suggestion.onclick = () => {
                input.value = title;
                suggestions.innerHTML = "";
                searchSite(title);
            };
            suggestions.appendChild(suggestion);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    if (searchBtn) searchBtn.addEventListener("click", () => searchSite(searchInput.value));
    if (searchInput) {
        searchInput.addEventListener("input", showSuggestions);
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchSite(searchInput.value);
                document.getElementById("suggestions").innerHTML = "";
            }
        });
    }
});
