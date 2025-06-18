# 🚀 Simple Task Tracker

A smart, deadline-aware project management system designed for creative professionals juggling multiple projects with varying priorities and deadlines.

## ✨ Features

### 🎯 **Smart Prioritization**
- **Deadline Awareness**: Automatically prioritizes projects based on approaching deadlines
- **Today's Focus**: AI-powered recommendation of which project to work on today
- **Smart Time Allocation**: Suggests weekly hour distribution based on urgency and importance

### 📊 **Project Management**
- **Visual Progress Tracking**: Clean progress bars and completion percentages
- **Priority Matrix**: Color-coded critical/high/medium/low priority system
- **Phase Tracking**: Different development phases (backend-needed, deployment, etc.)
- **Tag System**: Technology stacks and project categories

### 📝 **Notes & Documentation**
- **Auto-saving Notes**: Textarea with word wrapping for each project
- **Progress Updates**: Track what you've completed and what's next
- **Blocker Identification**: Note current obstacles and solutions

### 🔍 **Filtering & Organization**
- **Smart Filters**: Show only critical projects, ready-for-deployment, etc.
- **Multiple Sort Options**: By priority, deadline, completion, weekly hours, name
- **Search Functionality**: Find projects by name, description, or tags
- **Quick Stats**: Total projects, critical count, average completion

### 📱 **Modern Design**
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Gradient backgrounds, smooth animations, hover effects
- **Accessible**: Proper contrast ratios and semantic HTML
- **Fast Performance**: Pure vanilla JavaScript, no frameworks needed

## 🚀 Live Demo

**Access your task tracker here**: [https://drifter-supremo.github.io/simple-task-tracker/](https://drifter-supremo.github.io/simple-task-tracker/)

## 📁 File Structure

```
simple-task-tracker/
├── index.html      # Main dashboard interface
├── app.js          # Smart allocation algorithm & UI logic  
├── projects.json   # Project data (for reference, embedded in app.js)
└── README.md       # This file
```

## 🛠️ How It Works

### Smart Algorithm Features

1. **Deadline Urgency Scoring**
   - Projects with deadlines ≤ 30 days get maximum urgency boost
   - Critical priority projects receive additional weighting
   - "Momentum zone" projects (20-80% complete) get completion bonuses

2. **Time Allocation Logic**
   - Distributes 40-hour work week based on project urgency scores
   - Prioritizes critical deadlines while maintaining progress on other projects
   - Identifies "easy wins" (95%+ complete projects ready for deployment)

3. **Auto-saving Notes**
   - All notes save automatically to local storage with 500ms debouncing
   - Persistent across browser sessions
   - Word wrapping and textarea resizing for long notes

## 🎯 Perfect For

- **Solo Developers** managing multiple client projects
- **Creative Professionals** with varying project deadlines  
- **Startup Founders** balancing product development priorities
- **Freelancers** tracking progress across different contracts
- **Students** managing coursework and personal projects

## 💡 Usage Tips

### Daily Workflow
1. **Check Today's Focus** - Start with the recommended priority project
2. **Review Time Allocation** - Follow the suggested weekly hour distribution  
3. **Update Progress** - Mark completions and add notes about next steps
4. **Filter for Quick Wins** - Use "Ready for Deployment" filter for easy completions

### Weekly Planning
1. **Sort by Deadline** - Review all upcoming deadlines
2. **Check Critical Priority** - Ensure urgent projects get adequate time
3. **Update Project Phases** - Move projects through development stages
4. **Add New Projects** - Edit projects.json or app.js to add new work

## 🔧 Customization

### Adding New Projects
Edit the `projects` array in `app.js` with this structure:

```javascript
{
  "id": "unique-project-id",
  "name": "Project Name",
  "description": "Brief project description",
  "status": "in-progress", // or "frontend-complete", "ready-for-deployment", etc.
  "priority": "critical", // or "high", "medium", "low"
  "deadline": "2025-07-18", // YYYY-MM-DD format, or null
  "completion": 40, // 0-100 percentage
  "weeklyHours": 15, // recommended hours per week
  "phase": "backend-integration", // current development phase
  "tags": ["audio", "3d", "maps"], // technology/category tags
  "notes": "Current progress and next steps..."
}
```

### Modifying Time Allocation
Adjust the `defaultWeeklyHours` in the settings object:

```javascript
"settings": {
  "defaultWeeklyHours": 40, // total weekly hours to allocate
  "workDaysPerWeek": 5,
  "hoursPerWorkDay": 8
}
```

## 🌟 Key Benefits

- **Zero Setup**: Just open index.html in any browser
- **No Dependencies**: Pure HTML/CSS/JavaScript, works offline
- **Data Privacy**: All data stored locally, no external servers
- **Lightning Fast**: Instant loading and real-time updates
- **Highly Customizable**: Easy to modify for your specific needs

## 📈 Algorithm Insights

The smart prioritization considers:
- **Deadline pressure** (30-day and 60-day thresholds)
- **Priority level** (critical gets 4x weight vs low)
- **Completion momentum** (40-80% complete projects get boost)
- **Deployment readiness** (95%+ complete gets "easy win" status)
- **Phase-based urgency** (deployment phase gets priority boost)

## 🤝 Contributing

Feel free to fork this repository and customize it for your needs! Potential improvements:

- **Data Export**: CSV/JSON export functionality
- **Team Collaboration**: Multi-user support
- **Time Tracking**: Actual hours logged vs estimated
- **Analytics**: Project velocity and completion trends
- **Integrations**: GitHub, Trello, or other tool connections

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

---

**Built for creative professionals who need smart, simple project management without the complexity of enterprise tools.**