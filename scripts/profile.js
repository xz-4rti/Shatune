document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const profilePostsContainer = document.getElementById('profile-posts-container');
    const postTemplate = document.getElementById('post-template');
    const profilePicLarge = document.getElementById('profile-pic-large');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const changeProfilePicBtn = document.getElementById('change-profile-pic');
    const profileUsername = document.getElementById('profile-username');
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const usernameInput = document.getElementById('username-input');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const editMusicBtn = document.getElementById('edit-music-btn');
    const musicPreferences = document.getElementById('music-preferences');
    const musicEditForm = document.getElementById('music-edit-form');
    const saveMusicBtn = document.getElementById('save-music-btn');
    const cancelMusicBtn = document.getElementById('cancel-music-btn');

    // Current user data
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        id: 'user123',
        username: '@johncarlo',
        profilePic: '/placeholder.svg?height=150&width=150',
        followers: 100,
        following: 100,
        musicPreferences: {
            album: 'The real Slim Shady',
            artist: 'EMINEM',
            genre: 'RAP',
            playlist: 'Favourite songs / playlists'
        }
    };

    // Initialize the profile page
    function initProfile() {
        // Load user data
        loadUserData();

        // Load user's posts
        loadUserPosts(currentUser.id);

        // Set up event listeners
        setupEventListeners();
    }

    // Load user data
    function loadUserData() {
        // Profile picture
        profilePicLarge.src = currentUser.profilePic;

        // Username
        profileUsername.textContent = currentUser.username;

        // Stats
        document.getElementById('follower-count').textContent = currentUser.followers;
        document.getElementById('following-count').textContent = currentUser.following;

        // Music preferences
        if (currentUser.musicPreferences) {
            document.getElementById('album-title').textContent = currentUser.musicPreferences.album;
            document.getElementById('artist-name').textContent = currentUser.musicPreferences.artist;
            document.getElementById('genre-name').textContent = currentUser.musicPreferences.genre;
            document.getElementById('playlist-title').textContent = currentUser.musicPreferences.playlist;
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Profile picture change
        changeProfilePicBtn.addEventListener('click', () => profilePicUpload.click());
        profilePicUpload.addEventListener('change', handleProfilePicChange);

        // Username edit
        editUsernameBtn.addEventListener('click', startUsernameEdit);
        saveUsernameBtn.addEventListener('click', saveUsername);

        // Music preferences edit
        editMusicBtn.addEventListener('click', toggleMusicEdit);
        saveMusicBtn.addEventListener('click', saveMusicPreferences);
        cancelMusicBtn.addEventListener('click', toggleMusicEdit);

        // Post deletion (delegated)
        profilePostsContainer.addEventListener('click', function (e) {
            if (e.target.closest('.delete-post-btn')) {
                const postElement = e.target.closest('.post');
                const postId = postElement.dataset.postId;
                deletePost(postId, postElement);
            }
        });
    }

    // Handle profile picture change
    function handleProfilePicChange(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Convert image to Base64 for permanent storage
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                // Update profile picture
                profilePicLarge.src = imageUrl;

                // Update current user data with Base64 string
                currentUser.profilePic = imageUrl;
                saveUserData();

                // Update all posts by this user
                updatePostsUserInfo(currentUser.id, currentUser.username, currentUser.profilePic);
            };
            reader.readAsDataURL(file);
        }
    }


    // Start username editing
    function startUsernameEdit() {
        usernameInput.value = currentUser.username.replace('@', '');
        profileUsername.style.display = 'none';
        editUsernameBtn.style.display = 'none';
        usernameInput.style.display = 'inline-block';
        saveUsernameBtn.style.display = 'inline-block';
        usernameInput.focus();
    }

    // Save username
    function saveUsername() {
        const newUsername = usernameInput.value.trim();
        if (newUsername && newUsername !== currentUser.username.replace('@', '')) {
            currentUser.username = `@${newUsername}`;
            profileUsername.textContent = currentUser.username;
            saveUserData();

            // Update all posts by this user
            updatePostsUsername(currentUser.id, currentUser.username);
        }

        // Reset UI
        profileUsername.style.display = 'inline';
        editUsernameBtn.style.display = 'inline';
        usernameInput.style.display = 'none';
        saveUsernameBtn.style.display = 'none';
    }

    // Toggle music edit form
    function toggleMusicEdit() {
        const isEditing = musicEditForm.style.display === 'block';

        if (isEditing) {
            // Cancel editing
            musicEditForm.style.display = 'none';
            musicPreferences.style.display = 'grid';
            editMusicBtn.textContent = 'Edit Music Preferences';
        } else {
            // Start editing
            document.getElementById('edit-album').value = currentUser.musicPreferences.album;
            document.getElementById('edit-artist').value = currentUser.musicPreferences.artist;
            document.getElementById('edit-genre').value = currentUser.musicPreferences.genre;
            document.getElementById('edit-playlist').value = currentUser.musicPreferences.playlist;

            musicPreferences.style.display = 'none';
            musicEditForm.style.display = 'block';
            editMusicBtn.textContent = 'Cancel Editing';
        }
    }

    // Save music preferences
    function saveMusicPreferences() {
        currentUser.musicPreferences = {
            album: document.getElementById('edit-album').value.trim() || 'Not specified',
            artist: document.getElementById('edit-artist').value.trim() || 'Not specified',
            genre: document.getElementById('edit-genre').value.trim() || 'Not specified',
            playlist: document.getElementById('edit-playlist').value.trim() || 'Not specified'
        };

        saveUserData();
        loadUserData();
        toggleMusicEdit();
    }

    // Load posts for the current user
    function loadUserPosts(userId) {
        try {
            const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const userPosts = allPosts.filter(post => post.userId === userId);

            renderProfilePosts(userPosts);
        } catch (error) {
            console.error('Error loading user posts:', error);
        }
    }

    // Render posts to the profile page
    function renderProfilePosts(posts) {
        profilePostsContainer.innerHTML = '';

        if (posts.length === 0) {
            profilePostsContainer.innerHTML = '<p class="no-posts">No posts yet</p>';
            return;
        }

        // Sort posts by timestamp (newest first)
        posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Create and append each post
        posts.forEach(post => {
            const postElement = createPostElement(post);
            profilePostsContainer.appendChild(postElement);
        });
    }

    // Create a post element from template
    function createPostElement(post) {
        const postElement = postTemplate.content.cloneNode(true);
        const postDiv = postElement.querySelector('.post');

        // Set post data
        postDiv.dataset.postId = post.id;
        postDiv.querySelector('.post-user-img').src = post.userPic;
        postDiv.querySelector('.post-username').textContent = post.username;
        postDiv.querySelector('.post-text').textContent = post.text;

        // Set song data if exists
        if (post.song) {
            postDiv.querySelector('.song-title').textContent = post.song.title;
            postDiv.querySelector('.song-artist').textContent = `By ${post.song.artist}`;
            postDiv.querySelector('.song-cover').src = post.song.cover;
        } else {
            postDiv.querySelector('.post-song').style.display = 'none';
        }

        // Add audio player if post has audio
        if (post.audioUrl) {
            const audioPlayer = document.createElement('div');
            audioPlayer.className = 'audio-player';
            audioPlayer.innerHTML = `
                <audio controls>
                    <source src="${post.audioUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
            postDiv.querySelector('.post-content').appendChild(audioPlayer);
        }

        // Set like count and state
        const likeBtn = postDiv.querySelector('.like-btn');
        likeBtn.querySelector('.like-count').textContent = post.likes;
        if (post.isLiked) {
            likeBtn.classList.add('active');
        }

        // Set favorite state
        const favoriteBtn = postDiv.querySelector('.favorite-btn');
        if (post.isFavorited) {
            favoriteBtn.classList.add('active');
        }

        // Set timestamp
        const postTime = postDiv.querySelector('.post-time');
        postTime.textContent = formatTime(post.timestamp);

        return postElement;
    }

    // Delete a post
    function deletePost(postId, postElement) {
        if (confirm('Are you sure you want to delete this post?')) {
            // Remove from localStorage
            const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = allPosts.filter(post => post.id !== postId);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            // Remove from DOM
            postElement.remove();

            // Check if no posts left
            if (updatedPosts.filter(post => post.userId === currentUser.id).length === 0) {
                profilePostsContainer.innerHTML = '<p class="no-posts">No posts yet</p>';
            }
        }
    }

    // Update username in all posts
    function updatePostsUsername(userId, newUsername) {
        const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = allPosts.map(post => {
            if (post.userId === userId) {
                return { ...post, username: newUsername };
            }
            return post;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }

    // Save user data to localStorage
    function saveUserData() {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Dispatch a storage event to trigger updates in other tabs
        const event = new StorageEvent('storage', {
            key: 'currentUser',
            newValue: JSON.stringify(currentUser)
        });
        window.dispatchEvent(event);
    }

    // Format timestamp to relative time
    function formatTime(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - postTime) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }

    // Initialize the profile page
    initProfile();
});