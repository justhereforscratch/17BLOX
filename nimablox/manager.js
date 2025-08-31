document.addEventListener('DOMContentLoaded', () => {
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const resultsTitle = document.getElementById('resultsTitle');

    // Function to get a URL parameter by name
    const getQueryParam = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    // Function to render a single game card
    const renderGameCard = (game) => {
        const a = document.createElement('a');
        a.href = game.link;
        a.className = 'game-card';
        a.setAttribute('data-title', game.title);

        a.innerHTML = `
            <img src="${game.image}" alt="${game.title} Thumbnail">
            <div class="game-card-info">
                <div class="title">${game.title}</div>
                <div class="players">${game.players}</div>
            </div>
        `;
        return a;
    };

    // Filter games based on search query
    const filterAndDisplayGames = () => {
        const query = getQueryParam('query');
        
        // Update the results title
        resultsTitle.textContent = `Search Results for "${query || ''}"`;

        if (!query) {
            searchResultsGrid.innerHTML = '<div class="no-results">Please enter a search term.</div>';
            return;
        }

        const filteredGames = allGames.filter(game => 
            game.title.toLowerCase().includes(query.toLowerCase())
        );

        searchResultsGrid.innerHTML = ''; // Clear existing content

        if (filteredGames.length > 0) {
            filteredGames.forEach(game => {
                searchResultsGrid.appendChild(renderGameCard(game));
            });
        } else {
            searchResultsGrid.innerHTML = '<div class="no-results">No games found matching your search.</div>';
        }
    };

    filterAndDisplayGames();
});
