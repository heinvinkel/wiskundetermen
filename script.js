var suggestions = document.getElementById('suggestions');
var searchInput = document.getElementById('searchInput');

searchInput.addEventListener('blur', function() {
    setTimeout(function() {
        suggestions.style.display = 'none';
    }, 300);
});

function getSearchSuggestions() {
    var query = searchInput.value;

    // Voeg hier je eigen zoeklogica toe (bijvoorbeeld een API-aanroep naar een zoekmachine).
    // Voor dit voorbeeld voegen we handmatig enkele suggesties toe.

    var searchSuggestions = ["YouTube video 1", "YouTube video 2", "YouTube video 3", "YouTube video 4", "YouTube video 5"];

    if (query === '') {
        suggestions.style.display = 'none';
        return;
    }

    suggestions.innerHTML = '';
    searchSuggestions.forEach(function(suggestion) {
        if (suggestion.toLowerCase().includes(query.toLowerCase())) {
            var suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;

            suggestionItem.addEventListener('click', function() {
                searchInput.value = suggestion;
                suggestions.style.display = 'none';
            });

            suggestions.appendChild(suggestionItem);
        }
    });

    if (suggestions.children.length > 0) {
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}