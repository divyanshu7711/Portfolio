// Hidden Terminal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hiddenTerminal = document.getElementById('hiddenTerminal');
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalClose = document.querySelector('.terminal-close');
    
    let terminalHistory = [];
    let historyIndex = -1;
    let isTerminalActive = false;
    
    // Password system
    const secretAccess = document.getElementById('secretAccess');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const modalClose = document.getElementById('modalClose');
    const passwordError = document.getElementById('passwordError');
    const correctPassword = 'Alien';
    
    // Terminal commands
    const commands = {
        help: {
            description: 'Show available commands',
            action: () => {
                return `Available commands:

help          - Show this help message
about         - Display astronaut profile
skills        - Show technical skills
projects      - List mission projects
experience    - Show career timeline
achievements  - Display earned badges
contact       - Show contact information
clear         - Clear terminal screen
whoami        - Display current user
date          - Show current date
echo [text]   - Display text
navigate [section] - Navigate to section
status        - Show system status
exit          - Close terminal

Navigation shortcuts:
- Use numbers 1-7 to navigate sections
- Press Escape to close terminal
- Use arrow keys for command history`;
            }
        },
        
        about: {
            description: 'Display astronaut profile',
            action: () => {
                return `==========================================
ASTRONAUT PROFILE
==========================================

Name: Commander Divyanshu Sharma
Rank: Senior Code Astronaut
Location: Jaipur, Rajasthan
Mission: Explore the Digital Universe

Profile: Specialized in backend development missions 
and database exploration. Passionate about creating
efficient and scalable solutions.

Years of Service: 2+
Missions Completed: 10+
Current Status: Active

Mission Statement:
"Exploring the vast digital universe, one line of 
code at a time. Ready to embark on new coding 
adventures and build amazing digital experiences."`;
            }
        },
        
        skills: {
            description: 'Show technical skills',
            action: () => {
                return `==========================================
TECHNICAL ARSENAL
==========================================

Programming Languages:
├── Java            ████████████████████ 85%
├── JavaScript      ████████████████████ 80%
└── HTML/CSS        ████████████████████ 90%

Database & Backend:
├── SQL             ████████████████████ 75%
├── MySQL           ████████████████████ 80%
├── MongoDB         ████████████████████ 70%
└── Node.js         ████████████████████ 75%

Additional Technologies:
├── Express.js      ████████████████████ 70%
├── JWT Auth        ████████████████████ 80%
├── REST APIs       ████████████████████ 85%
├── Git & GitHub    ████████████████████ 85%
├── Responsive Design ███████████████████ 90%
└── Problem Solving ████████████████████ 95%`;
            }
        },
        
        projects: {
            description: 'List mission projects',
            action: () => {
                return `==========================================
MISSION PROJECTS
==========================================

[COMPLETED] Travel Mate (2024)
├── Description: Solo trip planner for Jaipur
├── Technology: JavaScript, HTML5, CSS3
├── Features: Real-time recommendations, itinerary planning
├── Repository: github.com/divyanshu7711
├── Demo: divyanshu7711.github.io/travel-mate
└── Status: Mission Successful ✅

[COMPLETED] AppointmentEase (2024)
├── Description: Real-time appointment system
├── Technology: Node.js, JWT, MongoDB, Express
├── Features: Secure authentication, session handling
├── Repository: github.com/divyanshu7711
├── Demo: appointmentease-demo.herokuapp.com
└── Status: Mission Successful ✅

[ACTIVE] Space Portfolio (2024)
├── Description: Interactive space-themed portfolio
├── Technology: HTML5, CSS3, JavaScript, Canvas API
├── Features: Animated elements, responsive design
├── Repository: github.com/divyanshu7711/space-portfolio
├── Demo: You're currently viewing it! 🌟
└── Status: Mission Active 🚀

Total Projects: 3
Success Rate: 100%`;
            }
        },
        
        experience: {
            description: 'Show career timeline',
            action: () => {
                return `==========================================
CAREER TIMELINE
==========================================

[2024] Backend Developer Intern
├── Organization: Celebal Technologies
├── Technologies: Node.js, MongoDB, JWT, Express
├── Duration: 3 months
├── Achievements:
│   ├── Built secure authentication systems
│   ├── Developed RESTful API endpoints
│   └── Optimized database queries
└── Status: Mission Completed ✅

[2020-Present] Self-Directed Learning
├── Focus: Full-stack Development
├── Technologies: Java, JavaScript, SQL, Web Dev
├── Duration: Ongoing
├── Achievements:
│   ├── Mastered multiple programming languages
│   ├── Built diverse project portfolio
│   └── Stayed current with tech trends
└── Status: Active Learning 📚

Career Highlights:
- 2+ years of development experience
- Strong foundation in backend technologies
- Continuous learning and skill development`;
            }
        },
        
        achievements: {
            description: 'Display earned badges',
            action: () => {
                return `==========================================
MISSION ACHIEVEMENTS
==========================================

🏆 CodeHunt 2025 Winner
├── Achievement: Coding Championship
├── Year: 2025
├── Description: Conquered the coding championship
│   with exceptional problem-solving skills
└── Status: Unlocked ✨

🩸 Promotion Lead - Aashayein
├── Achievement: Blood Donation Initiative
├── Year: 2024
├── Description: Led promotional activities for
│   Aashayein Blood Donation initiative
└── Status: Unlocked ✨

🚀 Mission Commander
├── Achievement: Multiple Project Completion
├── Year: Ongoing
├── Description: Successfully completed multiple
│   development projects and internships
└── Status: Active 🔥

Total Badges: 3
Achievement Level: Expert Commander
Next Milestone: Senior Developer Certification`;
            }
        },
        
        contact: {
            description: 'Show contact information',
            action: () => {
                return `==========================================
MISSION CONTROL CONTACT
==========================================

📧 Email: divyanshu.7711@gmail.com
🐙 GitHub: github.com/divyanshu7711
💼 LinkedIn: linkedin.com/in/divyanshusharma7711
📍 Location: Jaipur, Rajasthan

Communication Channels:
├── Primary: Email (Response time: < 24 hours)
├── Projects: GitHub (Always updated)
├── Professional: LinkedIn (Active daily)
└── Location: Available for local opportunities

Status: All communication channels online ✅
Ready for collaboration: YES 🚀

Type 'navigate contact' to open contact form.`;
            }
        },
        
        clear: {
            description: 'Clear terminal screen',
            action: () => {
                terminalOutput.innerHTML = '<div class="output-line welcome">Terminal cleared. Type "help" for commands.</div>';
                return null;
            }
        },
        
        whoami: {
            description: 'Display current user',
            action: () => {
                return `divyanshu@astro-terminal:~$ Commander Divyanshu Sharma
Role: Code Astronaut
Clearance Level: Senior Developer
Mission Status: Active
Current Location: Digital Universe Sector 7711
Access Level: Full System Access Granted ✅`;
            }
        },
        
        date: {
            description: 'Show current date',
            action: () => {
                const now = new Date();
                const missionDay = Math.floor((now - new Date('2024-01-01')) / (1000 * 60 * 60 * 24));
                return `Current Earth Time: ${now.toLocaleString()}
Mission Day: ${missionDay}
Stardate: ${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}
Status: All systems operational ✅
Next scheduled maintenance: Never (Self-maintaining system)`;
            }
        },
        
        echo: {
            description: 'Display text',
            action: (args) => {
                return args.length > 0 ? args.join(' ') : 'Usage: echo [text]';
            }
        },
        
        navigate: {
            description: 'Navigate to section',
            action: (args) => {
                const validSections = ['home', 'about', 'projects', 'experience', 'skills', 'achievements', 'contact'];
                const section = args[0]?.toLowerCase();
                
                if (!section) {
                    return `Usage: navigate [section]
Available sections: ${validSections.join(', ')}`;
                }
                
                if (validSections.includes(section)) {
                    // Trigger navigation
                    setTimeout(() => {
                        const navBtn = document.querySelector(`[data-section="${section}"]`);
                        if (navBtn) {
                            navBtn.click();
                            closeTerminal();
                        }
                    }, 500);
                    return `Navigating to ${section} section... 🚀`;
                } else {
                    return `Error: Section '${section}' not found.
Available sections: ${validSections.join(', ')}`;
                }
            }
        },
        
        status: {
            description: 'Show system status',
            action: () => {
                const uptime = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = uptime % 60;
                
                return `==========================================
SYSTEM STATUS
==========================================

🚀 Mission Control Status: ONLINE
⚡ Power Systems: OPTIMAL
🛰️ Communication Array: ACTIVE
🌌 Navigation Systems: OPERATIONAL
💾 Data Storage: AVAILABLE
🔒 Security Protocols: ENABLED

System Uptime: ${hours}h ${minutes}m ${seconds}s
Memory Usage: Optimized
CPU Load: Minimal
Network Status: Connected to Digital Universe

All systems green! Ready for mission! ✅`;
            }
        },
        
        exit: {
            description: 'Close terminal',
            action: () => {
                setTimeout(closeTerminal, 500);
                return 'Terminal session ended. Goodbye, Commander! 👋';
            }
        }
    };
    
    // Password modal functionality
    if (secretAccess) {
        secretAccess.addEventListener('click', function() {
            passwordModal.classList.remove('hidden');
            passwordInput.focus();
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closePasswordModal();
        });
    }
    
    if (submitPassword) {
        submitPassword.addEventListener('click', function() {
            checkPassword();
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Close modal when clicking outside
    if (passwordModal) {
        passwordModal.addEventListener('click', function(event) {
            if (event.target === passwordModal) {
                closePasswordModal();
            }
        });
    }
    
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === correctPassword) {
            closePasswordModal();
            openTerminal();
            passwordInput.value = '';
            passwordError.classList.add('hidden');
        } else {
            passwordError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.style.borderColor = '#ff6b6b';
            
            setTimeout(() => {
                passwordInput.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                passwordError.classList.add('hidden');
            }, 2000);
        }
    }
    
    function closePasswordModal() {
        passwordModal.classList.add('hidden');
        passwordInput.value = '';
        passwordError.classList.add('hidden');
    }
    
    // Handle terminal input when active
    document.addEventListener('keydown', function(event) {
        // Handle terminal input when active
        if (isTerminalActive) {
            if (event.key === 'Escape') {
                closeTerminal();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                navigateHistory(-1);
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                navigateHistory(1);
            } else if (event.key === 'Tab') {
                event.preventDefault();
                autocomplete();
            }
        }
    });
    
    function toggleTerminal() {
        if (isTerminalActive) {
            closeTerminal();
        } else {
            openTerminal();
        }
    }
    
    function openTerminal() {
        hiddenTerminal.classList.add('active');
        isTerminalActive = true;
        terminalInput.focus();
        
        // Add welcome message if terminal is empty
        if (terminalOutput.children.length === 1) {
            addOutput('🚀 Astro-CLI initialized successfully!', 'success');
            addOutput('Type "help" for available commands or "status" for system info.', 'welcome');
        }
    }
    
    function closeTerminal() {
        hiddenTerminal.classList.remove('active');
        isTerminalActive = false;
        terminalInput.blur();
    }
    
    function addOutput(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        
        // Handle multiline text
        if (text.includes('\n')) {
            const lines = text.split('\n');
            lines.forEach((lineText, index) => {
                if (index > 0) {
                    line.appendChild(document.createElement('br'));
                }
                line.appendChild(document.createTextNode(lineText));
            });
        } else {
            line.textContent = text;
        }
        
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function processCommand(input) {
        const args = input.trim().split(/\s+/);
        const command = args[0].toLowerCase();
        const commandArgs = args.slice(1);
        
        // Add command to history
        if (input.trim()) {
            terminalHistory.push(input);
            historyIndex = terminalHistory.length;
        }
        
        // Show command in output
        addOutput(`astro@divyanshu:~$ ${input}`);
        
        if (commands[command]) {
            const result = commands[command].action(commandArgs);
            if (result) {
                addOutput(result, 'success');
            }
        } else if (command === '') {
            // Empty command, do nothing
        } else {
            addOutput(`Command not found: ${command}`, 'error');
            addOutput('Type "help" for available commands.', 'welcome');
        }
    }
    
    function navigateHistory(direction) {
        if (direction === -1 && historyIndex > 0) {
            historyIndex--;
            terminalInput.value = terminalHistory[historyIndex];
        } else if (direction === 1 && historyIndex < terminalHistory.length - 1) {
            historyIndex++;
            terminalInput.value = terminalHistory[historyIndex];
        } else if (direction === 1 && historyIndex === terminalHistory.length - 1) {
            historyIndex = terminalHistory.length;
            terminalInput.value = '';
        }
    }
    
    function autocomplete() {
        const input = terminalInput.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            addOutput(`astro@divyanshu:~$ ${input}`);
            addOutput(`Possible commands: ${matches.join(', ')}`, 'welcome');
        }
    }
    
    // Handle terminal input
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = this.value;
            this.value = '';
            processCommand(input);
        }
    });
    
    // Terminal close button
    if (terminalClose) {
        terminalClose.addEventListener('click', closeTerminal);
    }
    
    // Close terminal when clicking outside
    document.addEventListener('click', function(event) {
        if (isTerminalActive && !hiddenTerminal.contains(event.target)) {
            closeTerminal();
        }
    });
    
    // Prevent terminal from closing when clicking inside
    hiddenTerminal.addEventListener('click', function(event) {
        event.stopPropagation();
        terminalInput.focus();
    });
    
    // Easter eggs and fun commands
    const easterEggs = {
        'sudo': () => 'Nice try, Commander! You already have all the permissions you need! 😄',
        'hack': () => 'Hacking is not the way of the Code Astronaut. We build, not break! 🚀',
        'coffee': () => 'Coffee.exe not found. Try tea.exe instead! ☕\nFun fact: Programmers run on caffeine and determination!',
        'hello': () => 'Hello there, Commander! Ready for another mission? 👋\nWelcome to the digital frontier!',
        'matrix': () => 'There is no spoon... only code! 🥄\nWake up, Neo... I mean, Commander!',
        'starwars': () => 'May the source be with you! ⭐\nIn a galaxy far, far away... there was still debugging!',
        'konami': () => 'Up, Up, Down, Down, Left, Right, Left, Right, B, A, Start! 🎮\n30 lives granted! (Just kidding)',
        'ls': () => 'This is not a Unix system! Try "help" instead. 😉',
        'pwd': () => '/home/divyanshu/digital-universe/portfolio\nYou are here: Space Mission Control',
        'cat': () => '🐱 Meow! Wrong kind of cat, Commander!\nTry "help" for actual commands.',
        'vim': () => 'Entering vim... Just kidding! 😄\nNo one knows how to exit vim anyway!',
        'emacs': () => 'Emacs? In space? We use nano here! 🚀',
        'rm -rf /': () => '🚨 DANGER! DANGER! 🚨\nNice try, but this system is protected!',
        'fortune': () => 'Your fortune: "A bug in the code is worth two in the documentation." 🔮',
        'cowsay': () => `
 _________________
< Moo from space! >
 -----------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
        'ping': () => 'PING google.com: 64 bytes from space station (0.001ms) 🛰️',
        'uptime': () => {
            const uptime = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
            return `System uptime: ${uptime} seconds\nCommander has been awesome for: ∞ seconds`;
        }
    };
    
    // Add easter eggs to commands
    Object.keys(easterEggs).forEach(egg => {
        commands[egg] = {
            description: 'Easter egg command',
            action: () => easterEggs[egg]()
        };
    });
    
    // Terminal startup animation
    function terminalStartupAnimation() {
        const startupLines = [
            '🚀 Initializing Astro-CLI v2.1.0...',
            '⚡ Loading command modules...',
            '🛰️ Establishing secure connection...',
            '🌌 Connecting to digital universe...',
            '✅ System ready! Welcome, Commander!'
        ];
        
        startupLines.forEach((line, index) => {
            setTimeout(() => {
                addOutput(line, 'success');
            }, index * 300);
        });
        
        setTimeout(() => {
            addOutput('Type "help" to see available commands. Press Ctrl+M to toggle terminal.', 'welcome');
            addOutput('🛸 Click the "Secret Access" button to access this terminal!', 'welcome');
        }, startupLines.length * 300 + 500);
    }
    
    // Initialize terminal with startup animation
    setTimeout(terminalStartupAnimation, 4000);
});