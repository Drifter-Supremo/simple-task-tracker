// Project Task Tracker - Smart Time Allocation System
class ProjectTracker {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.settings = {};
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.loadNotesFromStorage();
            this.setupEventListeners();
            this.renderApp();
            this.hideLoading();
        } catch (error) {
            this.showError('Failed to load projects: ' + error.message);
        }
    }

    async loadProjects() {
        try {
            // Embedded project data for local file system compatibility
            const data = {
                "projects": [
                    {
                        "id": "sonically-chosen",
                        "name": "Sonically Chosen",
                        "description": "Audio blog & living map app for cross-country road trip with 3D terrain visualization",
                        "status": "in-progress",
                        "priority": "critical",
                        "deadline": "2025-07-18",
                        "completion": 40,
                        "weeklyHours": 15,
                        "phase": "backend-integration",
                        "tags": ["audio", "3d", "maps", "firebase", "webgl"],
                        "notes": "URGENT - Moving out of LA week of July 18th! Need backend integration (FastAPI + Firebase), audio recording with MediaRecorder, 3D SoundTerrain visualizer, Mapbox integration, and Cloud Functions for Whisper transcription. Currently has UI shell ready."
                    },
                    {
                        "id": "freya-from-saturn",
                        "name": "Freya from Saturn",
                        "description": "AI companion with fine-tuned GPT-4.1 Mini and three-tier memory architecture",
                        "status": "ready-for-deployment",
                        "priority": "medium",
                        "deadline": null,
                        "completion": 95,
                        "weeklyHours": 2,
                        "phase": "deployment",
                        "tags": ["ai", "gpt-4", "fastapi", "firebase", "complete"],
                        "notes": "Backend fully implemented and tested with FastAPI + Firebase. Frontend integration verified. All memory systems working. Just need Phase 8 - deployment. Easy win!"
                    },
                    {
                        "id": "constellation-of-qualia",
                        "name": "Constellation of Qualia",
                        "description": "3D interactive starfield portfolio showcasing creative works through space-themed interface",
                        "status": "frontend-complete",
                        "priority": "low",
                        "deadline": null,
                        "completion": 60,
                        "weeklyHours": 3,
                        "phase": "backend-planning",
                        "tags": ["threejs", "portfolio", "3d", "react", "backend-needed"],
                        "notes": "Beautiful 3D frontend complete with React + Three.js. Need FastAPI backend with Firebase/Firestore for dynamic content, LLM integration for AI-powered features, and admin panel for content management."
                    },
                    {
                        "id": "gorlea-dot-ink",
                        "name": "Gorlea Dot Ink",
                        "description": "Mindful journaling with AI-powered poetry generation using Claude 3.7 Sonnet",
                        "status": "well-developed",
                        "priority": "low",
                        "deadline": null,
                        "completion": 85,
                        "weeklyHours": 2,
                        "phase": "feature-enhancement",
                        "tags": ["ai", "claude", "journaling", "whisper", "complete"],
                        "notes": "Solid journaling app with text/voice entries, AI poetry generation, daily prompts, and poem sharing. Could add more features but very functional as-is."
                    },
                    {
                        "id": "job-helper-app",
                        "name": "Job Hunt Tracker",
                        "description": "Kanban board for job application tracking with AI-powered insights",
                        "status": "frontend-complete",
                        "priority": "medium",
                        "deadline": null,
                        "completion": 50,
                        "weeklyHours": 4,
                        "phase": "backend-needed",
                        "tags": ["job-search", "kanban", "ai", "backend-needed"],
                        "notes": "Nice React frontend with drag-drop Kanban. Need FastAPI backend + Firestore, job board API integration (Indeed, LinkedIn), and LLM integration for job matching and insights."
                    },
                    {
                        "id": "social-atl-app",
                        "name": "Social Sprint Planner",
                        "description": "Weekly in-person social goals tracking with AI-powered event suggestions",
                        "status": "frontend-complete",
                        "priority": "low",
                        "deadline": null,
                        "completion": 45,
                        "weeklyHours": 3,
                        "phase": "backend-needed",
                        "tags": ["social", "goals", "ai", "events", "backend-needed"],
                        "notes": "React frontend done. Need FastAPI backend with Firestore, integration with Eventbrite/Meetup APIs, and GPT-4 for personalized suggestions and conversation starters."
                    },
                    {
                        "id": "atlas-part2",
                        "name": "Atlas Part II: Scars That No Longer Hurt",
                        "description": "Immersive web experience with p5.js animations exploring emotional void narrative",
                        "status": "in-development",
                        "priority": "medium",
                        "deadline": null,
                        "completion": 70,
                        "weeklyHours": 4,
                        "phase": "content-animation",
                        "tags": ["narrative", "p5js", "nextjs", "qualia-universe"],
                        "notes": "Next.js app with 5 unique p5.js animations for each chapter. Need to complete all generative art pieces and ensure 60fps performance on mobile."
                    },
                    {
                        "id": "gorlea-snaps",
                        "name": "Gorlea Snaps",
                        "description": "AI story generator from uploaded photos with text-to-speech narration",
                        "status": "feature-complete",
                        "priority": "low",
                        "deadline": null,
                        "completion": 90,
                        "weeklyHours": 1,
                        "phase": "maintenance",
                        "tags": ["ai", "claude", "tts", "firebase", "complete"],
                        "notes": "Solid app with Claude 3.7 for story generation, Gemini TTS for narration, Firebase backend. Very functional - just occasional maintenance needed."
                    },
                    {
                        "id": "log-dem-pills",
                        "name": "Meds & Mood Tracker",
                        "description": "Medication tracking with mood monitoring and AI-generated insights",
                        "status": "frontend-complete",
                        "priority": "medium",
                        "deadline": null,
                        "completion": 55,
                        "weeklyHours": 3,
                        "phase": "backend-needed",
                        "tags": ["health", "medication", "ai", "mood", "backend-needed"],
                        "notes": "Great React frontend with mood tracking and med management. Need FastAPI backend + Firestore, GPT-4 integration for correlation analysis and recommendations."
                    },
                    {
                        "id": "snapdragon-files",
                        "name": "The Snapdragon Files",
                        "description": "Cyberpunk investigation hub in Qualia universe with AI case generation",
                        "status": "backend-implemented",
                        "priority": "low",
                        "deadline": null,
                        "completion": 80,
                        "weeklyHours": 2,
                        "phase": "polish-features",
                        "tags": ["cyberpunk", "qualia", "ai", "firebase", "complete"],
                        "notes": "Terminal-aesthetic investigation app with Firebase backend, Claude for case generation, ElevenLabs for character audio. Mostly complete, could use some polish."
                    },
                    {
                        "id": "vakrune",
                        "name": "VĀKRUNE - Voice Time Capsule",
                        "description": "Voice messages to future self with vintage tape recorder aesthetic",
                        "status": "production-ready",
                        "priority": "low",
                        "deadline": null,
                        "completion": 95,
                        "weeklyHours": 1,
                        "phase": "ready-deployment",
                        "tags": ["voice", "time-capsule", "pwa", "complete"],
                        "notes": "Beautiful PWA with FastAPI backend, Firebase, OpenAI Whisper, AWS SES. Ready for production deployment. Another easy win!"
                    }
                ],
                "settings": {
                    "defaultWeeklyHours": 40,
                    "workDaysPerWeek": 5,
                    "hoursPerWorkDay": 8
                }
            };
            
            this.projects = data.projects;
            this.settings = data.settings;
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.error('Error loading projects:', error);
            throw error;
        }
    }

    loadNotesFromStorage() {
        const savedNotes = localStorage.getItem('project-notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            this.projects.forEach(project => {
                if (notes[project.id]) {
                    project.notes = notes[project.id];
                }
            });
        }
    }

    saveNotesToStorage() {
        const notes = {};
        this.projects.forEach(project => {
            if (project.notes) {
                notes[project.id] = project.notes;
            }
        });
        localStorage.setItem('project-notes', JSON.stringify(notes));
    }

    setupEventListeners() {
        const sortBy = document.getElementById('sort-by');
        const filterStatus = document.getElementById('filter-status');
        const search = document.getElementById('search');

        sortBy.addEventListener('change', () => this.applySortAndFilter());
        filterStatus.addEventListener('change', () => this.applySortAndFilter());
        search.addEventListener('input', () => this.applySortAndFilter());

        // Auto-save notes with debouncing
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('notes-textarea')) {
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => {
                    this.saveNotesToStorage();
                }, 500);
            }
        });
    }

    applySortAndFilter() {
        const sortBy = document.getElementById('sort-by').value;
        const filterStatus = document.getElementById('filter-status').value;
        const searchTerm = document.getElementById('search').value.toLowerCase();

        // Filter projects
        this.filteredProjects = this.projects.filter(project => {
            const matchesFilter = this.matchesFilter(project, filterStatus);
            const matchesSearch = this.matchesSearch(project, searchTerm);
            return matchesFilter && matchesSearch;
        });

        // Sort projects
        this.filteredProjects.sort((a, b) => this.compareProjects(a, b, sortBy));

        this.renderProjects();
    }

    matchesFilter(project, filter) {
        switch (filter) {
            case 'all': return true;
            case 'critical': return project.priority === 'critical';
            case 'in-progress': return project.status === 'in-progress';
            case 'backend-needed': return project.phase === 'backend-needed';
            case 'ready-deployment': return project.phase === 'deployment' || project.phase === 'ready-deployment';
            default: return true;
        }
    }

    matchesSearch(project, searchTerm) {
        if (!searchTerm) return true;
        return project.name.toLowerCase().includes(searchTerm) ||
               project.description.toLowerCase().includes(searchTerm) ||
               project.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    }

    compareProjects(a, b, sortBy) {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'deadline':
                if (!a.deadline && !b.deadline) return 0;
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return new Date(a.deadline) - new Date(b.deadline);
            case 'completion':
                return a.completion - b.completion;
            case 'hours':
                return b.weeklyHours - a.weeklyHours;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    }

    calculateTodaysFocus() {
        const today = new Date();
        let bestProject = null;
        let bestScore = -1;
        let reason = '';

        this.projects.forEach(project => {
            let score = 0;
            let reasons = [];

            // Deadline urgency (highest weight)
            if (project.deadline) {
                const deadline = new Date(project.deadline);
                const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                
                if (daysUntil <= 30) {
                    score += 100;
                    reasons.push(`only ${daysUntil} days until deadline`);
                } else if (daysUntil <= 60) {
                    score += 50;
                    reasons.push('deadline approaching');
                }
            }

            // Priority weight
            const priorityScores = { 'critical': 80, 'high': 60, 'medium': 40, 'low': 20 };
            score += priorityScores[project.priority] || 0;

            // Completion paradox (medium completion gets highest boost)
            const completionBoost = project.completion > 20 && project.completion < 80 ? 30 : 0;
            score += completionBoost;
            if (completionBoost > 0) {
                reasons.push('in momentum zone');
            }

            // Ready for deployment gets massive boost
            if (project.phase === 'deployment' || project.phase === 'ready-deployment') {
                score += 60;
                reasons.push('ready for deployment - easy win!');
            }

            // Backend needed projects get moderate boost if they're important
            if (project.phase === 'backend-needed' && project.priority !== 'low') {
                score += 25;
                reasons.push('backend development needed');
            }

            if (score > bestScore) {
                bestScore = score;
                bestProject = project;
                reason = reasons.join(', ');
            }
        });

        return { project: bestProject, reason: reason };
    }

    generateTimeRecommendations() {
        const totalHours = this.settings.defaultWeeklyHours;
        const today = new Date();
        
        // Calculate urgency scores for all projects
        const projectsWithScores = this.projects.map(project => {
            let urgencyScore = 0;
            
            // Deadline urgency
            if (project.deadline) {
                const deadline = new Date(project.deadline);
                const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                if (daysUntil <= 30) urgencyScore += 10;
                else if (daysUntil <= 60) urgencyScore += 5;
            }
            
            // Priority
            const priorityScores = { 'critical': 8, 'high': 6, 'medium': 4, 'low': 2 };
            urgencyScore += priorityScores[project.priority] || 0;
            
            // Phase urgency
            if (project.phase === 'deployment') urgencyScore += 3;
            else if (project.phase === 'backend-needed') urgencyScore += 2;
            
            return { ...project, urgencyScore };
        });

        // Sort by urgency
        projectsWithScores.sort((a, b) => b.urgencyScore - a.urgencyScore);
        
        // Allocate time based on urgency scores
        const totalUrgency = projectsWithScores.reduce((sum, p) => sum + p.urgencyScore, 0);
        
        return projectsWithScores.slice(0, 5).map(project => {
            const recommendedHours = Math.max(1, Math.round((project.urgencyScore / totalUrgency) * totalHours));
            return {
                project: project.name,
                hours: Math.min(recommendedHours, project.weeklyHours || 5),
                reason: this.getTimeAllocationReason(project)
            };
        });
    }

    getTimeAllocationReason(project) {
        const reasons = [];
        
        if (project.deadline) {
            const today = new Date();
            const deadline = new Date(project.deadline);
            const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            if (daysUntil <= 30) reasons.push('Critical deadline');
        }
        
        if (project.priority === 'critical') reasons.push('Critical priority');
        if (project.phase === 'deployment') reasons.push('Ready to deploy');
        if (project.completion > 70) reasons.push('Near completion');
        
        return reasons.join(', ') || 'Active development';
    }

    renderApp() {
        this.renderStats();
        this.renderTodaysFocus();
        this.renderTimeRecommendations();
        this.renderProjects();
    }

    renderStats() {
        const totalProjects = this.projects.length;
        const criticalCount = this.projects.filter(p => p.priority === 'critical').length;
        const avgCompletion = Math.round(this.projects.reduce((sum, p) => sum + p.completion, 0) / totalProjects);
        const totalHours = this.projects.reduce((sum, p) => sum + p.weeklyHours, 0);

        document.getElementById('total-projects').textContent = totalProjects;
        document.getElementById('critical-count').textContent = criticalCount;
        document.getElementById('avg-completion').textContent = avgCompletion + '%';
        document.getElementById('total-hours').textContent = totalHours + 'h';
    }

    renderTodaysFocus() {
        const focus = this.calculateTodaysFocus();
        document.getElementById('focus-project').textContent = focus.project?.name || 'No projects found';
        document.getElementById('focus-reason').textContent = focus.reason || 'All projects up to date';
    }

    renderTimeRecommendations() {
        const recommendations = this.generateTimeRecommendations();
        const container = document.getElementById('time-recommendations');
        
        container.innerHTML = recommendations.map(rec => `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                <div style="font-weight: 500; margin-bottom: 5px;">${rec.project}</div>
                <div style="color: #667eea; font-size: 1.1rem; font-weight: bold;">${rec.hours} hours/week</div>
                <div style="color: #666; font-size: 0.9rem;">${rec.reason}</div>
            </div>
        `).join('');
    }

    renderProjects() {
        const container = document.getElementById('projects-grid');
        container.innerHTML = this.filteredProjects.map(project => this.renderProjectCard(project)).join('');
    }

    renderProjectCard(project) {
        const deadlineWarning = this.getDeadlineWarning(project);
        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        return `
            <div class="project-card">
                <div class="card-header">
                    <div class="priority-badge priority-${project.priority}">${project.priority}</div>
                    <div class="project-title">${project.name}</div>
                    <div class="project-description">${project.description}</div>
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <span>📊</span>
                            <span>${project.status.replace('-', ' ')}</span>
                        </div>
                        <div class="meta-item">
                            <span>⏱️</span>
                            <span>${project.weeklyHours}h/week</span>
                        </div>
                        <div class="meta-item">
                            <span class="phase-badge">${project.phase.replace('-', ' ')}</span>
                        </div>
                        ${project.deadline ? `
                        <div class="meta-item">
                            <span>📅</span>
                            <span>${this.formatDate(project.deadline)}</span>
                        </div>
                        ` : ''}
                    </div>

                    ${deadlineWarning}

                    <div class="progress-section">
                        <div class="progress-label">
                            <span>Progress</span>
                            <span>${project.completion}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.completion}%"></div>
                        </div>
                    </div>

                    <div class="tags">
                        ${tagsHtml}
                    </div>
                </div>
                
                <div class="notes-section">
                    <div class="notes-label">📝 Project Notes & Next Steps</div>
                    <textarea 
                        class="notes-textarea" 
                        placeholder="Add notes about current progress, blockers, next steps..."
                        data-project-id="${project.id}"
                        style="word-wrap: break-word; white-space: pre-wrap;"
                    >${project.notes || ''}</textarea>
                </div>
            </div>
        `;
    }

    getDeadlineWarning(project) {
        if (!project.deadline) return '';
        
        const today = new Date();
        const deadline = new Date(project.deadline);
        const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntil <= 7) {
            return `<div class="deadline-warning deadline-critical">
                ⚠️ URGENT: Only ${daysUntil} days until deadline!
            </div>`;
        } else if (daysUntil <= 30) {
            return `<div class="deadline-warning">
                ⏰ Deadline approaching in ${daysUntil} days
            </div>`;
        }
        
        return '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }

    showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error-message').textContent = message;
    }
}

// Update project notes when user types
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('notes-textarea')) {
        const projectId = e.target.dataset.projectId;
        const notes = e.target.value;
        
        // Update in memory
        const tracker = window.projectTracker;
        const project = tracker.projects.find(p => p.id === projectId);
        if (project) {
            project.notes = notes;
        }
    }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectTracker = new ProjectTracker();
});