// Toggle like button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all like buttons
    const likeButtons = document.querySelectorAll('.action-btn.like');
    
    // Add click event listener to each like button
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Change color when active
            if (this.classList.contains('active')) {
                this.style.color = '#c11e1e';
            } else {
                this.style.color = '#aaa';
            }
        });
    });
    
    // Get all play buttons
    const playButtons = document.querySelectorAll('.action-btn.play');
    
    // Add click event listener to each play button
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle between play and pause icons
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
    
    // Get all share buttons
    const shareButtons = document.querySelectorAll('.action-btn.share');
    
    // Add click event listener to each share button
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Share functionality would go here!');
        });
    });
});

// Profile Section Generator
function createProfileSection() {
    // Create main container
    const profileSection = document.createElement('div');
    profileSection.className = 'profile-section';
    
    // Create profile grid
    const profileGrid = document.createElement('div');
    profileGrid.className = 'profile-grid';
    
    // Profile Picture
    const profilePicture = document.createElement('div');
    profilePicture.className = 'profile-picture';
    
    const img = document.createElement('img');
    img.src = './imagen/cat.jpeg';
    img.alt = 'Profile Picture';
    
    const username = document.createElement('div');
    username.className = 'username';
    username.textContent = '@johncarlo';
    
    profilePicture.appendChild(img);
    profilePicture.appendChild(username);
    
    // Create profile cards
    const cards = [
        { className: 'slim-shady', title: 'EMINEM', subtitle: 'The real Slim Shady' },
        { className: 'rap', title: 'RAP' },
        { className: 'eminem', title: 'EMINEM' },
        { className: 'favorites', title: 'Favourite songs / playlists' }
    ];
    
    // Stats data
    const stats = [
        { label: 'Followers', count: '100' },
        { label: 'Following', count: '100' }
    ];
    
    // Add elements to grid in specific order
    profileGrid.appendChild(profilePicture);
    
    // Add Slim Shady card
    const slimShadyCard = createProfileCard(cards[0].className, cards[0].title, cards[0].subtitle);
    profileGrid.appendChild(slimShadyCard);
    
    // Add RAP card
    const rapCard = createProfileCard(cards[1].className, cards[1].title);
    profileGrid.appendChild(rapCard);
    
    // Add Followers stats
    const followersStats = createProfileStats(stats[0].label, stats[0].count);
    profileGrid.appendChild(followersStats);
    
    // Add EMINEM card
    const eminemCard = createProfileCard(cards[2].className, cards[2].title);
    profileGrid.appendChild(eminemCard);
    
    // Add Favorites card
    const favoritesCard = createProfileCard(cards[3].className, cards[3].title);
    profileGrid.appendChild(favoritesCard);
    
    // Add Following stats
    const followingStats = createProfileStats(stats[1].label, stats[1].count);
    profileGrid.appendChild(followingStats);
    
    // Add grid to section
    profileSection.appendChild(profileGrid);
    
    // Add Edit Profile button
    const editProfile = document.createElement('div');
    editProfile.className = 'edit-profile';
    
    const button = document.createElement('button');
    button.textContent = 'Edit Profile';
    editProfile.appendChild(button);
    
    profileSection.appendChild(editProfile);
    
    return profileSection;
}

// Helper function to create profile cards
function createProfileCard(className, title, subtitle = null) {
    const card = document.createElement('div');
    card.className = `profile-card ${className}`;
    
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    
    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;
    cardContent.appendChild(cardTitle);
    
    if (subtitle) {
        const cardSubtitle = document.createElement('div');
        cardSubtitle.className = 'card-subtitle';
        cardSubtitle.textContent = subtitle;
        cardContent.appendChild(cardSubtitle);
    }
    
    card.appendChild(cardContent);
    return card;
}

// Helper function to create profile stats
function createProfileStats(label, count) {
    const stats = document.createElement('div');
    stats.className = 'profile-stats';
    
    const statLabel = document.createElement('div');
    statLabel.className = 'stat-label';
    statLabel.textContent = label;
    
    const statCount = document.createElement('div');
    statCount.className = 'stat-count';
    statCount.textContent = count;
    
    stats.appendChild(statLabel);
    stats.appendChild(statCount);
    
    return stats;
}

// Usage: Add the profile section to the document
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('profile-section'); // You need to have this element in your HTML
    if (container) {
        container.appendChild(createProfileSection());
    }
});