// app.js - Main application logic for home page

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const postsContainer = document.getElementById('posts-container');
    const postTemplate = document.getElementById('post-template');
    const postInput = document.getElementById('post-input');
    const songTitleInput = document.getElementById('song-title-input');
    const songArtistInput = document.getElementById('song-artist-input');
    const publishBtn = document.getElementById('publish-btn');
    const musicFileInput = document.getElementById('music-file');
    const musicFileName = document.getElementById('music-file-name');
    const removeMusicBtn = document.getElementById('remove-music-btn');
    const sidebarProfilePic = document.getElementById('sidebar-profile-pic');
    const sidebarUsername = document.getElementById('sidebar-username');
    const followerCount = document.getElementById('follower-count');
    const followingCount = document.getElementById('following-count');
    const currentUserImg = document.getElementById('current-user-img');

    // State variables
    let selectedMusicFile = null;
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        id: 'user123',
        username: '@johncarlo',
        profilePic: '/placeholder.svg?height=100&width=100',
        followers: 100,
        following: 100
    };

    // Load posts from localStorage or use sample data
    let posts = JSON.parse(localStorage.getItem('posts')) || [
        {
            id: 'post1',
            userId: 'user456',
            username: '@musiclover',
            userPic: '/placeholder.svg?height=40&width=40',
            text: 'Just discovered this amazing new artist!',
            song: {
                title: 'Blue',
                artist: 'Yung kai',
                cover: '/placeholder.svg?height=60&width=60'
            },
            likes: 24,
            isLiked: false,
            isFavorited: false,
            timestamp: '2023-05-15T14:30:00Z'
        }
    ];

    // Initialize the app
    function init() {
        // Load current user data
        loadCurrentUser();

        // Set up event listeners
        setupEventListeners();

        // Load and render posts
        renderPosts(posts);

        // Watch for storage changes
        window.addEventListener('storage', handleStorageChange);
    }

    // Load current user data from localStorage
    function loadCurrentUser() {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            // Check if profilePic is a Base64 string or old URL
            if (savedUser.profilePic && savedUser.profilePic.startsWith('data:image')) {
                currentUser = savedUser;
            } else {
                // Migrate old URL to Base64 if needed
                currentUser = {
                    ...savedUser,
                    profilePic: '/placeholder.svg?height=100&width=100' // fallback
                };
            }
            updateUserUI();
        }
    }
    // Update user-related UI elements
    function updateUserUI() {
        sidebarProfilePic.src = currentUser.profilePic;
        sidebarUsername.textContent = currentUser.username;
        followerCount.textContent = currentUser.followers;
        followingCount.textContent = currentUser.following;
        currentUserImg.src = currentUser.profilePic;
    }

    // Handle storage changes from other tabs
    function handleStorageChange(event) {
        if (event.key === 'currentUser') {
            const newUserData = JSON.parse(event.newValue);
            if (newUserData.id === currentUser.id) {
                currentUser = newUserData;
                updateUserUI();

                // Update all posts by this user
                const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
                const updatedPosts = allPosts.map(post => {
                    if (post.userId === currentUser.id) {
                        return {
                            ...post,
                            username: currentUser.username,
                            userPic: currentUser.profilePic
                        };
                    }
                    return post;
                });

                localStorage.setItem('posts', JSON.stringify(updatedPosts));
                renderPosts(updatedPosts);
            }
        }
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Publish button
        publishBtn.addEventListener('click', createNewPost);

        // Music file selection
        musicFileInput.addEventListener('change', handleMusicFileSelect);
        removeMusicBtn.addEventListener('click', removeSelectedMusic);

        // Post interactions
        postsContainer.addEventListener('click', function (e) {
            if (e.target.closest('.like-btn')) {
                const likeBtn = e.target.closest('.like-btn');
                const postId = likeBtn.closest('.post').dataset.postId;
                toggleLike(postId, likeBtn);
            }

            if (e.target.closest('.favorite-btn')) {
                const favoriteBtn = e.target.closest('.favorite-btn');
                const postId = favoriteBtn.closest('.post').dataset.postId;
                toggleFavorite(postId, favoriteBtn);
            }
        });
    }

    // Handle music file selection
    function handleMusicFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('audio/')) {
                alert('Please select an audio file (MP3, WAV, etc.)');
                return;
            }

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size should be less than 10MB');
                return;
            }

            selectedMusicFile = file;
            musicFileName.textContent = file.name;
            removeMusicBtn.style.display = 'inline-block';
        }
    }

    // Remove selected music file
    function removeSelectedMusic() {
        musicFileInput.value = '';
        selectedMusicFile = null;
        musicFileName.textContent = 'No file selected';
        removeMusicBtn.style.display = 'none';
    }

    // Create a new post
    function createNewPost() {
        const postText = postInput.value.trim();
        if (!postText && !selectedMusicFile) {
            alert('Please add text or upload a music file');
            return;
        }

        const songTitle = songTitleInput.value.trim();
        const songArtist = songArtistInput.value.trim();

        // Create audio URL if file is selected
        let audioUrl = null;
        if (selectedMusicFile) {
            audioUrl = URL.createObjectURL(selectedMusicFile);
        }

        // Create new post object
        const newPost = {
            id: `post${Date.now()}`,
            userId: currentUser.id,
            username: currentUser.username,
            userPic: currentUser.profilePic,
            text: postText,
            song: (songTitle || songArtist || selectedMusicFile) ? {
                title: songTitle || 'Unknown',
                artist: songArtist || 'Unknown',
                cover: '/placeholder.svg?height=60&width=60'
            } : null,
            audioUrl: audioUrl,
            likes: 0,
            isLiked: false,
            isFavorited: false,
            timestamp: new Date().toISOString()
        };

        // Add to posts array and save to localStorage
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        // Re-render posts and clear form
        renderPosts(posts);
        clearPostForm();
    }

    // Clear the post creation form
    function clearPostForm() {
        postInput.value = '';
        songTitleInput.value = '';
        songArtistInput.value = '';
        removeSelectedMusic();
    }

    // Render posts to the DOM
    function renderPosts(postsToRender) {
        postsContainer.innerHTML = '';

        // Sort by timestamp (newest first)
        postsToRender.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Create and append each post
        postsToRender.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }

    // Create a post element from template
    function createPostElement(post) {
        const postElement = postTemplate.content.cloneNode(true);
        const postDiv = postElement.querySelector('.post');

        // Set basic post info
        postDiv.dataset.postId = post.id;
        postDiv.querySelector('.post-user-img').src = post.userPic;
        postDiv.querySelector('.post-username').textContent = post.username;
        postDiv.querySelector('.post-text').textContent = post.text;

        // Set song info if available
        if (post.song) {
            postDiv.querySelector('.song-title').textContent = post.song.title;
            postDiv.querySelector('.song-artist').textContent = `By ${post.song.artist}`;
            postDiv.querySelector('.song-cover').src = post.song.cover;
        } else {
            postDiv.querySelector('.post-song').style.display = 'none';
        }

        // Add audio player if audio exists
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

        // Set interaction states
        const likeCount = postDiv.querySelector('.like-count');
        const likeBtn = postDiv.querySelector('.like-btn');
        const favoriteBtn = postDiv.querySelector('.favorite-btn');

        likeCount.textContent = post.likes;
        post.isLiked ? likeBtn.classList.add('active') : likeBtn.classList.remove('active');
        post.isFavorited ? favoriteBtn.classList.add('active') : favoriteBtn.classList.remove('active');

        // Set timestamp
        postDiv.querySelector('.post-time').textContent = formatTime(post.timestamp);

        const commentsContainer = postDiv.querySelector('.comments-container');
        if (post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                commentsContainer.appendChild(createCommentElement(comment));
            });
        }

        // Set up comment submission
        const commentInput = postDiv.querySelector('.comment-input');
        const postCommentBtn = postDiv.querySelector('.post-comment-btn');

        postCommentBtn.addEventListener('click', () => {
            addComment(post.id, commentInput.value.trim());
            commentInput.value = '';
        });

        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addComment(post.id, commentInput.value.trim());
                commentInput.value = '';
            }
        });

        return postElement;
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

    // Toggle like on a post
    function toggleLike(postId, likeBtn) {
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;

        likeBtn.classList.toggle('active');
        likeBtn.querySelector('.like-count').textContent = post.likes;

        // Update localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Toggle favorite on a post
    function toggleFavorite(postId, favoriteBtn) {
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        post.isFavorited = !post.isFavorited;
        favoriteBtn.classList.toggle('active');

        // Update localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Check and migrate old profile pictures
    function migrateProfilePictures() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        let needsUpdate = false;

        for (const userId in users) {
            const user = users[userId];
            if (user.profilePic && !user.profilePic.startsWith('data:image')) {
                // This is an old URL-based profile picture
                user.profilePic = '/placeholder.svg?height=100&width=100';
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Call this when your app starts
    migrateProfilePictures();

    // Initialize the app
    init();
});