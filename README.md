# Leo Smat - Personal Portfolio Website

A clean, responsive personal portfolio website showcasing my professional experience, projects, and contact information. Built with modern web technologies and optimized for both desktop and mobile viewing.

## 🌐 Live Site
Visit the live site at: [lsmat2.github.io](https://lsmat2.github.io)

## 📋 Table of Contents
- [Purpose & Vision](#purpose--vision)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technical Implementation](#technical-implementation)
- [Development](#development)

## 🎯 Purpose & Vision

### Why This Site Exists
This portfolio website serves as my digital presence and professional showcase, designed with several key objectives:

**Professional Branding**: A centralized platform to present my background, skills, and experience in computer science and entrepreneurship. It provides potential employers, collaborators, and clients with a comprehensive view of my capabilities and achievements.

**Project Documentation**: A curated display of my technical projects, from full-stack applications to startup ventures, demonstrating practical application of my skills and problem-solving abilities.

**Networking & Opportunities**: An accessible way for industry professionals, recruiters, and fellow developers to learn about my work and connect with me for potential opportunities.

### Design Philosophy
The site embodies a **minimalist, professional aesthetic** with:
- **Clean Typography**: Easy-to-read content that doesn't overwhelm visitors
- **Responsive Design**: Seamless experience across all devices and screen sizes
- **Interactive Elements**: Subtle animations and hover effects that enhance UX without being distracting
- **Performance-First**: Optimized loading times and efficient code structure

### Target Audience
- **Potential Employers**: Tech companies and startups looking for software developers
- **Business Partners**: Individuals interested in collaboration on entrepreneurial ventures
- **Professional Network**: Fellow developers, industry contacts, and mentors
- **Clients**: Businesses seeking software development or consulting services

## 📁 Project Structure

```
lsmat2.github.io/
├── index.html                 # Homepage with profile and about sections
├── styles/
│   ├── global.css            # Shared styles (navbar, layout, responsive)
│   └── index.css             # Homepage-specific styles
├── scripts/
│   ├── global.js             # Shared functionality (navigation, mobile menu)
│   └── index.js              # Homepage-specific JavaScript
├── images/                   # Profile photo and social media icons
├── projects/
│   ├── index.html            # Projects and experience showcase
│   ├── experiences.json      # Dynamic experience data
│   ├── projects.json         # Dynamic project data
│   ├── styles/
│   │   └── index.css         # Projects page styles
│   └── scripts/
│       └── projects.js       # Dynamic content loading and interactions
├── contact/
│   ├── index.html            # Contact information and links
│   └── styles/
│       └── index.css         # Contact page styles
└── README.md                 # This file
```

### Architecture Decisions

**Modular CSS Architecture**: 
- `global.css` contains shared styles (navbar, base layout, mobile responsiveness)
- Page-specific stylesheets only contain unique styling for that page
- Reduces code duplication and improves maintainability

**Dynamic Content Loading**:
- Experience and project data stored in JSON files
- JavaScript dynamically generates HTML elements
- Easy to update content without touching HTML structure

**Mobile-First Responsive Design**:
- Hamburger navigation for mobile devices
- Flexible layouts that adapt to different screen sizes
- Touch-friendly interface elements

## ✨ Features

### Homepage
- **Hero Section**: Professional photo with gradient styling and introduction
- **Social Links**: Direct links to LinkedIn, GitHub, and Instagram
- **About Me**: Comprehensive background covering education, skills, and interests
- **Contact Section**: Easy access to email communication

### Projects & Experience Page
- **Interactive Experience Cards**: Expandable cards showing work history with bullet-pointed achievements
- **Project Showcase**: Grid layout displaying technical projects with descriptions
- **Smooth Animations**: Hover effects and expansion transitions for better UX

### Contact Page
- **Professional Contact Information**: Email and social media links
- **Consistent Branding**: Maintains design language across all pages

### Universal Features
- **Responsive Navigation**: Hamburger menu for mobile, traditional navbar for desktop
- **Cross-Device Compatibility**: Optimized for phones, tablets, and desktops
- **Fast Loading**: Minimal dependencies and optimized assets

## 🛠 Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup and accessibility considerations
- **CSS3**: Flexbox/Grid layouts, animations, and responsive design
- **Vanilla JavaScript**: Dynamic content loading and interactive features
- **JSON**: Structured data storage for experiences and projects

### Key Technical Features
- **CSS Custom Properties**: Consistent color scheme and spacing
- **Intersection Observer API**: Smooth scrolling and view-based animations
- **ES6+ Features**: Modern JavaScript for clean, maintainable code
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Performance Optimizations
- **Minimal External Dependencies**: Fast loading times
- **Optimized Images**: Compressed assets for quick loading
- **Efficient CSS**: Mobile-first approach reduces unnecessary styles
- **Clean Code Structure**: Easy to maintain and extend

## 🚀 Development

### Making Updates
- **Content Changes**: Update JSON files in the `projects/` directory
- **Styling**: Modify global styles in `styles/global.css` or page-specific styles
- **New Features**: Add JavaScript to appropriate files following the modular structure

### Deployment
The site is automatically deployed via GitHub Pages when changes are pushed to the main branch.

---

**Built by Leo Smat** | Computer Science & Economics Graduate | Software Developer & Entrepreneur