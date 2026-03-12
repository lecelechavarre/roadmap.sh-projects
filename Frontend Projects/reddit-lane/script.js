class RedditClient {
    constructor() {
        this.lanes = new Map();
        this.lanesContainer = document.getElementById('lanesContainer');
        this.subredditInput = document.getElementById('subredditInput');
        this.addSubredditBtn = document.getElementById('addSubredditBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFromLocalStorage();
        
        // Add default lanes if none exist
        if (this.lanes.size === 0) {
            this.addLane('learnprogramming');
            this.addLane('javascript');
        }
    }

    setupEventListeners() {
        this.addSubredditBtn.addEventListener('click', () => {
            const subreddit = this.subredditInput.value.trim().toLowerCase();
            if (subreddit) {
                if (!this.lanes.has(subreddit)) {
                    this.addLane(subreddit);
                    this.subredditInput.value = '';
                } else {
                    this.showMessage(`r/${subreddit} already exists!`, 'error');
                }
            }
        });

        this.subredditInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addSubredditBtn.click();
            }
        });
    }

    async addLane(subreddit) {
        if (this.lanes.has(subreddit)) return;

        // Add lane with loading state
        this.lanes.set(subreddit, {
            loading: true,
            posts: [],
            error: null
        });

        this.render();
        this.saveToLocalStorage();

        try {
            const posts = await this.fetchSubredditPosts(subreddit);
            
            this.lanes.set(subreddit, {
                loading: false,
                posts: posts,
                error: null
            });

            this.render();
            this.saveToLocalStorage();
            this.showMessage(`r/${subreddit} loaded successfully!`, 'success');
        } catch (error) {
            console.error('Error fetching subreddit:', error);
            
            if (error.message.includes('404')) {
                this.lanes.delete(subreddit);
                this.showMessage(`r/${subreddit} does not exist`, 'error');
            } else {
                this.lanes.set(subreddit, {
                    loading: false,
                    posts: [],
                    error: error.message
                });
            }
            
            this.render();
            this.saveToLocalStorage();
        }
    }

    async fetchSubredditPosts(subreddit) {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=25`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('404 - Subreddit not found');
            }
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.data || !data.data.children || data.data.children.length === 0) {
            throw new Error('No posts found');
        }

        return data.data.children.map(child => ({
            id: child.data.id,
            title: child.data.title,
            author: child.data.author,
            score: child.data.score,
            numComments: child.data.num_comments,
            url: child.data.url,
            permalink: `https://reddit.com${child.data.permalink}`,
            created: child.data.created_utc
        }));
    }

    async refreshLane(subreddit) {
        if (!this.lanes.has(subreddit)) return;

        // Set loading state
        this.lanes.set(subreddit, {
            ...this.lanes.get(subreddit),
            loading: true,
            error: null
        });
        
        this.render();

        try {
            const posts = await this.fetchSubredditPosts(subreddit);
            
            this.lanes.set(subreddit, {
                loading: false,
                posts: posts,
                error: null
            });

            this.render();
            this.saveToLocalStorage();
            this.showMessage(`r/${subreddit} refreshed!`, 'success');
        } catch (error) {
            this.lanes.set(subreddit, {
                loading: false,
                posts: [],
                error: error.message
            });
            
            this.render();
            this.showMessage(`Failed to refresh r/${subreddit}`, 'error');
        }
    }

    removeLane(subreddit) {
        if (this.lanes.has(subreddit)) {
            this.lanes.delete(subreddit);
            this.render();
            this.saveToLocalStorage();
            this.showMessage(`r/${subreddit} removed`, 'info');
        }
    }

    render() {
        this.lanesContainer.innerHTML = '';
        
        for (const [subreddit, data] of this.lanes) {
            const laneElement = this.createLaneElement(subreddit, data);
            this.lanesContainer.appendChild(laneElement);
        }
    }

    createLaneElement(subreddit, data) {
        const lane = document.createElement('div');
        lane.className = 'lane';
        lane.dataset.subreddit = subreddit;

        // Header
        const header = document.createElement('div');
        header.className = 'lane-header';
        header.innerHTML = `
            <div class="lane-title">
                <i class="fab fa-reddit-alien"></i>
                <span>r/${subreddit}</span>
            </div>
            <div class="lane-controls">
                <button class="lane-btn refresh" title="Refresh">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
                <button class="lane-btn delete" title="Delete">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;

        // Add event listeners to buttons
        const refreshBtn = header.querySelector('.refresh');
        const deleteBtn = header.querySelector('.delete');
        
        refreshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.refreshLane(subreddit);
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.removeLane(subreddit);
        });

        lane.appendChild(header);

        // Posts container
        const postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';

        if (data.error) {
            postsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Error: ${data.error}
                </div>
            `;
        } else if (data.loading) {
            postsContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading posts...</p>
                </div>
            `;
        } else if (data.posts.length === 0) {
            postsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fab fa-reddit-alien"></i>
                    <p>No posts found</p>
                </div>
            `;
        } else {
            data.posts.slice(0, 10).forEach(post => {
                const postCard = this.createPostCard(post);
                postsContainer.appendChild(postCard);
            });
        }

        lane.appendChild(postsContainer);
        return lane;
    }

    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.onclick = () => window.open(post.permalink, '_blank');

        const timeAgo = this.getTimeAgo(post.created);

        card.innerHTML = `
            <div class="post-title">
                <i class="fas fa-link"></i>
                ${this.escapeHtml(post.title)}
            </div>
            <div class="post-stats">
                <span class="stat-item">
                    <i class="fas fa-arrow-up upvotes"></i>
                    <span class="upvotes">${this.formatNumber(post.score)}</span>
                </span>
                <span class="stat-item">
                    <i class="fas fa-comment comments"></i>
                    <span class="comments">${this.formatNumber(post.numComments)}</span>
                </span>
                <span class="stat-item">
                    <i class="fas fa-user"></i>
                    <span class="author">${this.escapeHtml(post.author)}</span>
                </span>
                <span class="stat-item">
                    <i class="fas fa-clock"></i>
                    ${timeAgo}
                </span>
            </div>
        `;

        return card;
    }

    getTimeAgo(timestamp) {
        const seconds = Math.floor(Date.now() / 1000 - timestamp);
        
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
        return `${Math.floor(seconds / 86400)}d`;
    }

    showMessage(message, type = 'info') {
        const tooltip = document.createElement('div');
        tooltip.className = 'info-bar';
        tooltip.style.animation = 'slideIn 0.3s ease';
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        let color = '#ff4500';
        if (type === 'error') color = '#f44336';
        if (type === 'success') color = '#4CAF50';
        
        tooltip.innerHTML = `
            <i class="fas fa-${icon}" style="color: ${color}"></i>
            <span>${message}</span>
        `;
        
        // Remove existing tooltips
        const existingTooltip = document.querySelector('.info-bar:not(.permanent)');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }

    saveToLocalStorage() {
        const lanesData = Array.from(this.lanes.entries()).map(([subreddit, data]) => ({
            subreddit,
            posts: data.error ? [] : data.posts,
            error: null
        }));
        
        localStorage.setItem('redditLanes', JSON.stringify(lanesData));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('redditLanes');
        if (saved) {
            try {
                const lanesData = JSON.parse(saved);
                lanesData.forEach(({ subreddit, posts }) => {
                    if (subreddit && posts) {
                        this.lanes.set(subreddit, {
                            loading: false,
                            posts: posts,
                            error: null
                        });
                    }
                });
                this.render();
            } catch (e) {
                console.error('Failed to load from localStorage', e);
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .info-bar.permanent {
        animation: none;
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.redditClient = new RedditClient();
});