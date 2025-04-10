document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically load different content based on the selected tab
            // For this demo, we'll just show an alert
            const tabName = this.textContent.trim();
            console.log(`Tab switched to: ${tabName}`);
        });
    });
    
    // Toggle like button functionality
    const likeButtons = document.querySelectorAll('.action-btn.like');
    
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
    
    // Play/Pause button functionality
    const playButtons = document.querySelectorAll('.action-btn.play');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle between play and pause icons
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                // Reset all other play buttons first
                playButtons.forEach(btn => {
                    const btnIcon = btn.querySelector('i');
                    if (btnIcon !== icon && btnIcon.classList.contains('fa-pause')) {
                        btnIcon.classList.remove('fa-pause');
                        btnIcon.classList.add('fa-play');
                    }
                });
                
                // Change this button to pause
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Simulate playing the song
                console.log('Playing song');
            } else {
                // Change back to play
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                
                // Simulate pausing the song
                console.log('Pausing song');
            }
        });
    });
    
    // Share button functionality
    const shareButtons = document.querySelectorAll('.action-btn.share');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Share functionality would go here!');
        });
    });
    
    // Post creation functionality
    const postInput = document.querySelector('.post-creation input');
    const publishBtn = document.querySelector('.publish-btn');
    
    publishBtn.addEventListener('click', function() {
        const postText = postInput.value.trim();
        
        if (postText) {
            // Create a new post element
            createNewPost(postText);
            
            // Clear the input
            postInput.value = '';
        } else {
            alert('Please write something to post!');
        }
    });
    
    // Function to create a new post
    function createNewPost(text) {
        // Create post container
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        
        // Create user section
        const postUser = document.createElement('div');
        postUser.className = 'post-user';
        postUser.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>@johncarlo</span>
        `;
        
        // Create content section
        const postContent = document.createElement('div');
        postContent.className = 'post-content';
        postContent.innerHTML = `<p>${text}</p>`;
        
        // Add elements to post
        postItem.appendChild(postUser);
        postItem.appendChild(postContent);
        
        // Add post to feed (at the beginning)
        const feedPosts = document.querySelector('.feed-posts');
        feedPosts.insertBefore(postItem, feedPosts.firstChild);
        
        console.log('New post created:', text);
    }
    
    // Menu item active state
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // If it's not the profile link (which should navigate to the profile page)
            if (!this.getAttribute('href').includes('index.html')) {
                e.preventDefault();
                
                // Remove active class from all menu items
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                
                // Add active class to clicked menu item
                this.classList.add('active');
            }
        });
    });
});