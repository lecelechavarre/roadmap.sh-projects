# Task Tracker

Task management application that allows users to add, complete, and delete tasks with automatic sorting of completed tasks.

## Screenshot

![Task Tracker Application](https://github.com/lecelechavarre/roadmap.sh-projects/blob/main/Frontend%20Projects/task-tracker/assets/screenshot.png)

## Features

- **Add Tasks**: Type a task and press Enter to add it to your list
- **Mark Complete**: Click the checkbox or task text to mark tasks as complete
- **Unmark Tasks**: Click completed tasks to return them to the pending list
- **Delete Tasks**: Remove tasks using the × button
- **Automatic Sorting**: Completed tasks automatically move to the end of the list
- **Visual Feedback**: Completed tasks display with strikethrough styling
- **Persistent Demo**: Includes example tasks demonstrating all features

## Live Demo

Open `index.html` in any modern web browser to start using the application.

## File Structure
```bash
task-tracker/
│
├── index.html # Main HTML structure
├── style.css # Styling and responsive design
├── script.js # Application logic and functionality
├── asset
     └── screenshot.png # Application screenshot
└── README.md # Project documentation
```


## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with responsive design
- **JavaScript (ES6+)** - Dynamic DOM manipulation and state management

## Installation

1. Clone or download this repository
2. Ensure all files (`index.html`, `style.css`, `script.js`, `asset/screenshot.png`) are in the same folder
3. Open `index.html` in your web browser

No build tools or dependencies required!

## How to Use

1. **Create a Task**
   - Click the input field
   - Type your task description
   - Press **Enter** to add it to the list

2. **Complete a Task**
   - Click the checkbox next to any task
   - Or click directly on the task text
   - Completed tasks will show with strikethrough and move to the end

3. **Unmark a Task**
   - Click the checkbox or text of a completed task
   - The task will return to the pending list with normal styling

4. **Delete a Task**
   - Click the **×** button next to any task
   - The task will be permanently removed
