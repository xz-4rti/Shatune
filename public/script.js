// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Profile tabs
    const profileTabs = document.querySelectorAll('.profile-tabs .tab-btn');
    if (profileTabs.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                profileTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Here you would typically show/hide content based on the selected tab
                // For example:
                // const tabName = this.textContent.toLowerCase();
                // showContent(tabName);
            });
        });
    }
    
    // Feed tabs
    const feedTabs = document.querySelectorAll('.feed-tabs .tab-btn');
    if (feedTabs.length > 0) {
        feedTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                feedTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Here you would typically load different feed content
            });
        });
    }
    
    // Like, comment, share button functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // You could implement actual like/comment/share functionality here
            // For example:
            // if (this.querySelector('.fa-thumbs-up')) {
            //     likePost(postId);
            // }
        });
    });
});

// Function to handle navigation between pages
function navigateTo(page) {
    window.location.href = page;
}

// You could add more functionality like:
// - Post creation
// - User authentication
// - Fetching and displaying real posts
// - Profile editing