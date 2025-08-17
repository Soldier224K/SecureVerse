// SecureVerse Application JavaScript
class SecureVerseApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.charts = {};
        this.realTimeInterval = null;
        this.notifications = [];
        this.chatMessages = [];
        
        // Application data
        this.data = {
            user: {
                name: "Arjun Sharma",
                email: "arjun@example.com",
                securityLevel: "Advanced",
                guardianProgress: 78,
                digitalHealthScore: 94,
                memberSince: "2024-03-15"
            },
            securityMetrics: {
                threatsBlockedToday: 23,
                threatsBlockedMonth: 1247,
                dataEarningsMonth: 1247,
                systemStatus: "optimal",
                lastScan: "2025-08-17T14:30:00",
                vulnerabilities: 0
            },
            dataMarketplace: {
                categories: [
                    {"name": "Location Data", "enabled": false, "rate": 120, "description": "Anonymous location patterns"},
                    {"name": "Browsing Habits", "enabled": true, "rate": 80, "description": "Website categories visited"},
                    {"name": "App Usage", "enabled": true, "rate": 60, "description": "Time spent in applications"},
                    {"name": "Fitness Metrics", "enabled": true, "rate": 90, "description": "Health and activity data"},
                    {"name": "Shopping Preferences", "enabled": false, "rate": 150, "description": "Product interests and purchases"}
                ],
                totalEarnings: 1247,
                pendingEarnings: 230
            },
            guardianProgram: {
                currentStage: 3,
                stages: [
                    {"name": "Digital Awareness Basics", "completed": true, "progress": 100},
                    {"name": "Intermediate Protection", "completed": true, "progress": 100},
                    {"name": "Advanced Security Mastery", "completed": false, "progress": 60},
                    {"name": "Guardian Leadership", "completed": false, "progress": 0}
                ],
                assignedGuardian: {
                    name: "Rajesh Kumar",
                    level: "Senior Guardian",
                    responseTime: "< 2 minutes",
                    rating: 4.9
                }
            },
            customOS: {
                version: "SecureVerse-1.2.1",
                fingerprint: "SV-AB12-C3F4-56DE",
                isolationActive: true,
                lastMalwareScan: "2025-08-17T14:30:00",
                threatsFound: 0,
                systemHealth: 98,
                uptime: "15 days, 6 hours"
            },
            recentActivity: [
                {"time": "14:25", "type": "threat_blocked", "description": "Blocked malicious download attempt from suspicious.site.com"},
                {"time": "13:45", "type": "data_earned", "description": "Earned ₹15 from browsing data share with TechCorp"},
                {"time": "12:30", "type": "learning_completed", "description": "Completed Advanced Firewall Configuration lesson"},
                {"time": "11:15", "type": "guardian_message", "description": "Message from Guardian Rajesh: Great security posture this week!"}
            ],
            notifications: [
                {"id": 1, "type": "warning", "message": "New app requesting camera permissions", "time": "2 min ago"},
                {"id": 2, "type": "success", "message": "Monthly security report ready", "time": "1 hour ago"},
                {"id": 3, "type": "info", "message": "Guardian program milestone achieved", "time": "3 hours ago"}
            ]
        };
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCharts();
        this.setupInteractiveElements();
        this.setupRealTimeUpdates();
        this.setupAIChat();
        this.setupNotifications();
        this.populateContent();
        this.loadStoredData();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.dataset.page;
                this.navigateToPage(targetPage);
            });
        });
    }

    navigateToPage(pageName) {
        // Remove active class from current page and nav link
        document.querySelector('.page.active').classList.remove('active');
        document.querySelector('.nav-link.active').classList.remove('active');

        // Add active class to new page and nav link
        document.getElementById(pageName).classList.add('active');
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

        this.currentPage = pageName;

        // Initialize page-specific content
        if (pageName === 'security') {
            this.initializeSecurityPage();
        } else if (pageName === 'marketplace') {
            this.initializeMarketplacePage();
        } else if (pageName === 'guardian') {
            this.initializeGuardianPage();
        }
    }

    setupCharts() {
        this.createThreatsChart();
        this.createTrafficChart();
        this.createRevenueChart();
    }

    createThreatsChart() {
        const ctx = document.querySelector('#threatsChart canvas');
        if (!ctx) return;

        this.charts.threats = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM'],
                datasets: [{
                    data: [2, 5, 8, 12, 23],
                    borderColor: '#00d9ff',
                    backgroundColor: 'rgba(0, 217, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        });
    }

    createTrafficChart() {
        const ctx = document.querySelector('#trafficChart canvas');
        if (!ctx) return;

        this.charts.traffic = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                datasets: [
                    {
                        label: 'Safe Traffic',
                        data: this.generateTrafficData(24, 20, 80),
                        borderColor: '#00ff88',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Blocked Traffic',
                        data: this.generateTrafficData(24, 0, 15),
                        borderColor: '#ff4757',
                        backgroundColor: 'rgba(255, 71, 87, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#f8fafc' }
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#64748b' },
                        grid: { color: 'rgba(100, 116, 139, 0.2)' }
                    },
                    y: { 
                        ticks: { color: '#64748b' },
                        grid: { color: 'rgba(100, 116, 139, 0.2)' }
                    }
                }
            }
        });
    }

    createRevenueChart() {
        const ctx = document.querySelector('#revenueChart canvas');
        if (!ctx) return;

        this.charts.revenue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (₹)',
                    data: [850, 920, 1100, 1050, 1180, 1247],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        ticks: { color: '#64748b' },
                        grid: { display: false }
                    },
                    y: { 
                        ticks: { color: '#64748b' },
                        grid: { color: 'rgba(100, 116, 139, 0.2)' }
                    }
                }
            }
        });
    }

    generateTrafficData(points, min, max) {
        return Array.from({length: points}, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    setupInteractiveElements() {
        // Emergency lockdown
        const emergencyBtn = document.getElementById('emergencyLockdown');
        const emergencyModal = document.getElementById('emergencyModal');
        const cancelLockdown = document.getElementById('cancelLockdown');
        const confirmLockdown = document.getElementById('confirmLockdown');

        emergencyBtn?.addEventListener('click', () => {
            emergencyModal.classList.remove('hidden');
        });

        cancelLockdown?.addEventListener('click', () => {
            emergencyModal.classList.add('hidden');
        });

        confirmLockdown?.addEventListener('click', () => {
            this.activateEmergencyLockdown();
            emergencyModal.classList.add('hidden');
        });

        // Scan now button
        document.getElementById('scanNow')?.addEventListener('click', () => {
            this.performQuickScan();
        });

        // Quick action buttons
        document.getElementById('fullScan')?.addEventListener('click', () => {
            this.performFullScan();
        });

        document.getElementById('updateFirewall')?.addEventListener('click', () => {
            this.updateFirewall();
        });

        document.getElementById('backupData')?.addEventListener('click', () => {
            this.backupData();
        });

        document.getElementById('checkUpdates')?.addEventListener('click', () => {
            this.checkUpdates();
        });

        // User profile dropdown (simplified)
        document.getElementById('userProfile')?.addEventListener('click', () => {
            this.showNotification('Profile menu would open here', 'info');
        });
    }

    setupRealTimeUpdates() {
        // Update metrics every 5 seconds
        this.realTimeInterval = setInterval(() => {
            this.updateRealTimeData();
        }, 5000);

        // Animate progress circles on load
        setTimeout(() => {
            this.animateProgressCircles();
        }, 500);
    }

    updateRealTimeData() {
        // Simulate real-time threat blocking
        const currentThreats = this.data.securityMetrics.threatsBlockedToday;
        if (Math.random() < 0.3) { // 30% chance of new threat
            this.data.securityMetrics.threatsBlockedToday += 1;
            this.updateMetricDisplay('threatsBlockedToday', this.data.securityMetrics.threatsBlockedToday);
            
            // Add to activity feed
            const newActivity = {
                time: new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'}),
                type: 'threat_blocked',
                description: `Blocked ${this.getRandomThreat()}`
            };
            this.addActivityItem(newActivity);
        }

        // Update network graph animation
        this.updateNetworkVisualization();
    }

    getRandomThreat() {
        const threats = [
            'malware download from malicious-site.com',
            'phishing attempt via email',
            'suspicious USB device connection',
            'unauthorized data access attempt',
            'malicious browser extension installation'
        ];
        return threats[Math.floor(Math.random() * threats.length)];
    }

    updateMetricDisplay(metric, value) {
        const element = document.querySelector(`[data-metric="${metric}"]`);
        if (element) {
            element.textContent = value;
        }
    }

    animateProgressCircles() {
        const progressCircles = document.querySelectorAll('.progress-circle');
        progressCircles.forEach(circle => {
            const value = circle.parentElement.dataset.value;
            const circumference = 2 * Math.PI * 35; // radius is 35
            const offset = circumference - (value / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        });
    }

    setupAIChat() {
        const chatToggle = document.getElementById('chatToggleBtn');
        const aiChat = document.getElementById('aiChat');
        const chatClose = document.getElementById('closeChatBtn');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');

        chatToggle?.addEventListener('click', () => {
            aiChat.classList.toggle('active');
        });

        chatClose?.addEventListener('click', () => {
            aiChat.classList.remove('active');
        });

        sendBtn?.addEventListener('click', () => {
            this.sendChatMessage();
        });

        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(message);
            this.addChatMessage(aiResponse, 'ai');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const responses = {
            'security': 'Your security posture is excellent! Digital Health Score at 94%. Keep monitoring for new threats.',
            'threat': 'I\'ve detected and blocked 23 threats today. Your firewall is active and protecting you.',
            'scan': 'Running a quick scan now... All systems appear clean. Last full scan found 0 threats.',
            'guardian': 'You\'re 78% through Advanced Security Mastery! Rajesh Kumar is available if you need help.',
            'earnings': 'You\'ve earned ₹1,247 this month from data sharing. Fitness and browsing data are your top earners.',
            'default': 'I\'m here to help with your cybersecurity needs. Ask me about threats, scans, guardian program, or earnings!'
        };

        const message = userMessage.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    setupNotifications() {
        const notificationBtn = document.getElementById('notifications');
        const notificationPanel = document.getElementById('notificationPanel');
        const closeNotifications = document.getElementById('closeNotifications');

        notificationBtn?.addEventListener('click', () => {
            notificationPanel.classList.toggle('hidden');
            this.populateNotifications();
        });

        closeNotifications?.addEventListener('click', () => {
            notificationPanel.classList.add('hidden');
        });

        // Close notification panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn?.contains(e.target) && !notificationPanel?.contains(e.target)) {
                notificationPanel?.classList.add('hidden');
            }
        });
    }

    populateNotifications() {
        const notificationList = document.getElementById('notificationList');
        if (!notificationList) return;

        notificationList.innerHTML = '';
        
        this.data.notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification-item ${notification.type}`;
            notificationElement.innerHTML = `
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            `;
            notificationList.appendChild(notificationElement);
        });
    }

    populateContent() {
        this.populateActivityFeed();
        this.populateDataMarketplace();
        this.populateGuardianProgram();
        this.populateSecurityThreats();
    }

    populateActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        activityFeed.innerHTML = '';
        
        this.data.recentActivity.forEach(activity => {
            this.addActivityItem(activity);
        });
    }

    addActivityItem(activity) {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        const iconClass = {
            'threat_blocked': 'threat',
            'data_earned': 'earning',
            'learning_completed': 'learning',
            'guardian_message': 'message'
        }[activity.type] || 'info';

        const icons = {
            'threat': '🛡️',
            'earning': '💰',
            'learning': '📚',
            'message': '💬'
        };

        activityElement.innerHTML = `
            <div class="activity-icon ${iconClass}">
                ${icons[iconClass] || 'ℹ️'}
            </div>
            <div class="activity-content">
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        // Insert at the beginning for newest first
        activityFeed.insertBefore(activityElement, activityFeed.firstChild);
    }

    populateDataMarketplace() {
        const categoryList = document.getElementById('categoryList');
        if (!categoryList) return;

        categoryList.innerHTML = '';
        
        this.data.dataMarketplace.categories.forEach((category, index) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item';
            categoryElement.innerHTML = `
                <div class="category-info">
                    <div class="category-name">${category.name}</div>
                    <div class="category-description">${category.description}</div>
                </div>
                <div class="category-rate">₹${category.rate}/month</div>
                <label class="toggle">
                    <input type="checkbox" ${category.enabled ? 'checked' : ''} data-category="${index}">
                    <span class="toggle-slider"></span>
                </label>
            `;
            
            // Add toggle event listener
            const toggle = categoryElement.querySelector('input[type="checkbox"]');
            toggle.addEventListener('change', (e) => {
                this.toggleDataCategory(index, e.target.checked);
            });
            
            categoryList.appendChild(categoryElement);
        });
    }

    toggleDataCategory(index, enabled) {
        this.data.dataMarketplace.categories[index].enabled = enabled;
        this.saveData();
        
        const action = enabled ? 'enabled' : 'disabled';
        const categoryName = this.data.dataMarketplace.categories[index].name;
        this.showNotification(`${categoryName} sharing ${action}`, 'info');
    }

    populateGuardianProgram() {
        const pathwayStages = document.getElementById('pathwayStages');
        if (!pathwayStages) return;

        pathwayStages.innerHTML = '';
        
        this.data.guardianProgram.stages.forEach((stage, index) => {
            const stageElement = document.createElement('div');
            stageElement.className = 'stage-item';
            
            let stageStatus = 'locked';
            let stageNumber = index + 1;
            
            if (stage.completed) {
                stageStatus = 'completed';
                stageNumber = '✓';
            } else if (index === this.data.guardianProgram.currentStage - 1) {
                stageStatus = 'current';
            }
            
            stageElement.innerHTML = `
                <div class="stage-icon ${stageStatus}">${stageNumber}</div>
                <div class="stage-info">
                    <div class="stage-name">${stage.name}</div>
                    <div class="stage-progress-bar">
                        <div class="stage-progress-fill" style="width: ${stage.progress}%"></div>
                    </div>
                </div>
            `;
            
            pathwayStages.appendChild(stageElement);
        });
    }

    populateSecurityThreats() {
        const threatList = document.getElementById('threatList');
        if (!threatList) return;

        const threats = [
            {name: 'Malware Download Blocked', source: 'suspicious.site.com', time: '2 min ago'},
            {name: 'Phishing Email Detected', source: 'fake-bank@evil.com', time: '5 min ago'},
            {name: 'Suspicious USB Device', source: 'Unknown Device', time: '12 min ago'},
            {name: 'Data Breach Attempt', source: '192.168.1.105', time: '25 min ago'}
        ];

        threatList.innerHTML = '';
        
        threats.forEach(threat => {
            const threatElement = document.createElement('div');
            threatElement.className = 'threat-item';
            threatElement.innerHTML = `
                <div class="threat-info">
                    <div class="threat-name">${threat.name}</div>
                    <div class="threat-source">${threat.source}</div>
                </div>
                <div class="threat-time">${threat.time}</div>
            `;
            threatList.appendChild(threatElement);
        });
    }

    updateNetworkVisualization() {
        const connections = document.querySelectorAll('.network-connection');
        connections.forEach(connection => {
            // Simulate data flow animation
            const flow = Math.random() > 0.5 ? 'safe' : 'blocked';
            connection.dataset.flow = flow;
        });
    }

    initializeSecurityPage() {
        this.populateSecurityThreats();
        this.updateNetworkVisualization();
        
        // Refresh traffic chart if it exists
        if (this.charts.traffic) {
            this.charts.traffic.data.datasets[0].data = this.generateTrafficData(24, 20, 80);
            this.charts.traffic.data.datasets[1].data = this.generateTrafficData(24, 0, 15);
            this.charts.traffic.update();
        }
    }

    initializeMarketplacePage() {
        this.populateDataMarketplace();
        
        // Refresh revenue chart if it exists
        if (this.charts.revenue) {
            this.charts.revenue.update();
        }
    }

    initializeGuardianPage() {
        this.populateGuardianProgram();
    }

    // Action methods
    activateEmergencyLockdown() {
        this.showNotification('Emergency Lockdown Activated! All connections secured.', 'success');
        
        // Simulate lockdown actions
        setTimeout(() => {
            this.showNotification('Firewall rules updated', 'info');
        }, 1000);
        
        setTimeout(() => {
            this.showNotification('All network traffic blocked', 'info');
        }, 2000);
        
        setTimeout(() => {
            this.showNotification('System locked down successfully', 'success');
        }, 3000);
    }

    performQuickScan() {
        this.showNotification('Quick scan initiated...', 'info');
        
        setTimeout(() => {
            this.showNotification('Quick scan completed. 0 threats found.', 'success');
            this.data.securityMetrics.lastScan = new Date().toISOString();
        }, 3000);
    }

    performFullScan() {
        this.showNotification('Full system scan initiated...', 'info');
        
        setTimeout(() => {
            this.showNotification('Full scan completed. System is clean.', 'success');
        }, 5000);
    }

    updateFirewall() {
        this.showNotification('Updating firewall rules...', 'info');
        
        setTimeout(() => {
            this.showNotification('Firewall updated successfully', 'success');
        }, 2000);
    }

    backupData() {
        this.showNotification('Creating secure backup...', 'info');
        
        setTimeout(() => {
            this.showNotification('Data backup completed successfully', 'success');
        }, 3000);
    }

    checkUpdates() {
        this.showNotification('Checking for updates...', 'info');
        
        setTimeout(() => {
            this.showNotification('System is up to date', 'success');
        }, 2000);
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(10, 14, 39, 0.95);
            border: 1px solid var(--cyber-${type === 'success' ? 'green' : type === 'warning' ? 'orange' : type === 'error' ? 'red' : 'blue'});
            border-radius: 8px;
            padding: 12px 16px;
            color: var(--cyber-light);
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveData() {
        try {
            localStorage.setItem('secureverse-data', JSON.stringify(this.data));
        } catch (e) {
            console.log('LocalStorage not available, data not saved');
        }
    }

    loadStoredData() {
        try {
            const stored = localStorage.getItem('secureverse-data');
            if (stored) {
                const parsedData = JSON.parse(stored);
                this.data = { ...this.data, ...parsedData };
                this.populateContent();
            }
        } catch (e) {
            console.log('Error loading stored data, using defaults');
        }
    }

    // Cleanup method
    destroy() {
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }
        
        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
    }
}

// CSS animations for notifications
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
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.secureVerseApp = new SecureVerseApp();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.secureVerseApp) {
        window.secureVerseApp.destroy();
    }
});
