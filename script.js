document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const challengeItems = document.querySelectorAll('#challengeList li');
    const userInput = document.getElementById('userInput');
    const testBtn = document.getElementById('testPayload');
    const renderedOutput = document.getElementById('renderedOutput');
    const sourceCode = document.getElementById('sourceCode');
    const consoleOutput = document.getElementById('consoleOutput');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const toggleHintBtn = document.getElementById('toggleHint');
    const hintContent = document.getElementById('hintContent');
    const cheatBtns = document.querySelectorAll('.cheat-btn');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const resetBtn = document.getElementById('resetAll');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const nextLevelBtn = document.getElementById('nextLevel');
    const stayHereBtn = document.getElementById('stayHere');
    const currentLevelEl = document.getElementById('currentLevel');
    const completedLevelsEl = document.getElementById('completedLevels');
    const attemptCountEl = document.getElementById('attemptCount');
    const successRateEl = document.getElementById('successRate');
    const levelTitleEl = document.getElementById('levelTitle');
    const levelDescriptionEl = document.getElementById('levelDescription');
    const starsEl = document.querySelectorAll('.stars i');
    const achievementList = document.getElementById('achievementList');

    // App State
    let currentLevel = 1;
    let attempts = 0;
    let successes = 0;
    let completedLevels = [];
    const totalLevels = 16;
    
    // Challenge data
    const challenges = {
    1: {
        title: "Level 1: Basic Script Injection",
        description: "Inject a script that executes alert(1) using script tags.",
        difficulty: 1,
        hint: "Try: &lt;script&gt;alert(1)&lt;/script&gt;",
        filter: null,
        successCondition: (payload) => {
            return payload.includes('<script>') && payload.includes('alert(1)');
        }
    },
    2: {
        title: "Level 2: Simple Tag Filter",
        description: "The system filters 'script' tags. Find another HTML tag that can execute JavaScript.",
        difficulty: 1,
        hint: "Try using an img tag with an onerror handler.",
        filter: (input) => {
            return input.replace(/script/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('alert(1)') && 
                  (payload.includes('onerror') || payload.includes('onload'));
        }
    },
    3: {
        title: "Level 3: Attribute Injection",
        description: "Inject JavaScript via an HTML attribute. The system strips all tags.",
        difficulty: 2,
        hint: "Try injecting into an existing attribute like href or style.",
        filter: (input) => {
            return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        successCondition: (payload) => {
            return payload.includes('alert(1)') && 
                  (payload.includes('javascript:') || payload.includes(':expression('));
        }
    },
    4: {
        title: "Level 4: Event Handler Basics",
        description: "Use an event handler to trigger your payload when user interacts with the element.",
        difficulty: 2,
        hint: "Try onclick, onmouseover, or other event handlers.",
        filter: (input) => {
            return input;
        },
        successCondition: (payload) => {
            const events = ['onclick', 'onmouseover', 'onfocus', 'onload'];
            return payload.includes('alert(1)') && 
                  events.some(event => payload.includes(event));
        }
    },
    5: {
        title: "Level 5: DOM-Based XSS",
        description: "Exploit client-side JavaScript that writes user input to the page.",
        difficulty: 3,
        hint: "Try breaking out of JavaScript strings or using template literals.",
        filter: (input) => {
            return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        successCondition: (payload) => {
            return payload.includes('alert(1)') && 
                  (payload.includes('`') || payload.includes('${') || 
                   payload.includes('"+') || payload.includes('";'));
        }
    },
    6: {
        title: "Level 6: JavaScript URI",
        description: "Execute JavaScript through a URI handler in a link or iframe.",
        difficulty: 3,
        hint: "Try using javascript: URIs in href or src attributes.",
        filter: (input) => {
            return input.replace(/script/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('javascript:') && payload.includes('alert(1)');
        }
    },
    7: {
        title: "Level 7: SVG Vector",
        description: "Use SVG markup to execute JavaScript without script tags.",
        difficulty: 3,
        hint: "SVG supports many event handlers and can contain script elements.",
        filter: (input) => {
            return input.replace(/script/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('<svg') && payload.includes('alert(1)');
        }
    },
    8: {
        title: "Level 8: Filter Evasion",
        description: "The system filters common event handlers and tags. Find a bypass.",
        difficulty: 4,
        hint: "Try less common tags like <details> or <marquee> with obscure event handlers.",
        filter: (input) => {
            const events = ['onerror', 'onload', 'onclick', 'onmouseover'];
            events.forEach(event => {
                input = input.replace(new RegExp(event, 'gi'), '');
            });
            return input.replace(/script|img|svg|iframe/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('alert(1)') && 
                  (payload.includes('onanimationstart') || payload.includes('ontoggle') || 
                   payload.includes('onpointerenter') || payload.includes('onfocusin'));
        }
    },
    9: {
        title: "Level 9: HTML Entity Encoding",
        description: "The system decodes HTML entities before processing. Use this to bypass filters.",
        difficulty: 4,
        hint: "Encode your script tags using HTML entities that will be decoded.",
        filter: (input) => {
            return input.replace(/script/gi, '').replace(/on\w+=/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('&lt;') && payload.includes('&gt;') && 
                  payload.includes('alert(1)') && !payload.includes('<script>');
        }
    },
    10: {
        title: "Level 10: Hex Encoding",
        description: "Use hexadecimal encoding to bypass pattern matching filters.",
        difficulty: 4,
        hint: "Try encoding parts of your payload in hex (e.g., \\x3C for '<').",
        filter: (input) => {
            return input.replace(/script/gi, '').replace(/on\w+=/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('\\x') && payload.includes('alert(1)');
        }
    },
    11: {
        title: "Level 11: Unicode Obfuscation",
        description: "Use Unicode encoding to evade detection while still executing JavaScript.",
        difficulty: 5,
        hint: "Try using String.fromCharCode() or Unicode escape sequences.",
        filter: (input) => {
            return input.replace(/alert/gi, '').replace(/script/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('String.fromCharCode') || 
                  payload.includes('\\u') && payload.includes('eval(');
        }
    },
    12: {
        title: "Level 12: Template Literals",
        description: "Exploit JavaScript template literals to execute code without parentheses.",
        difficulty: 5,
        hint: "Try using tagged template literals or nested template strings.",
        filter: (input) => {
            return input.replace(/\(\)/g, '').replace(/alert/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('${') && payload.includes('`') && 
                  payload.includes('alert') && !payload.includes('alert(');
        }
    },
    13: {
        title: "Level 13: CSS Injection",
        description: "Use CSS to execute JavaScript through expression() or animation events.",
        difficulty: 5,
        hint: "Try @keyframes with animationstart or expression() in older IE.",
        filter: (input) => {
            return input.replace(/script/gi, '').replace(/on\w+=/gi, '');
        },
        successCondition: (payload) => {
            return payload.includes('<style') && 
                  (payload.includes('@keyframes') || payload.includes(':expression('));
        }
    },
    14: {
        title: "Level 14: CSP Bypass",
        description: "Bypass Content Security Policy restrictions to execute your payload.",
        difficulty: 5,
        hint: "Look for allowed domains or unsafe-eval directives you can exploit.",
        filter: (input) => {
            return input;
        },
        successCondition: (payload) => {
            // Simulating CSP bypass by requiring specific techniques
            return payload.includes('alert(1)') && 
                  (payload.includes('nonce') || payload.includes('unsafe-eval') || 
                   payload.includes('cdn.example.com') || payload.includes('angular'));
        }
    },
    15: {
        title: "Level 15: Advanced Obfuscation",
        description: "Combine multiple obfuscation techniques to bypass all filters.",
        difficulty: 5,
        hint: "Try combining encoding, string splitting, and indirect eval calls.",
        filter: (input) => {
            // Aggressive filtering
            input = input.replace(/script|alert|eval|function|setTimeout|setInterval/gi, '');
            input = input.replace(/on\w+=/gi, '');
            input = input.replace(/javascript:/gi, '');
            input = input.replace(/[(){}<>'"`]/g, '');
            return input;
        },
        successCondition: (payload) => {
            return payload.includes('alert') && 
                  (payload.includes('\\x') || payload.includes('\\u') || 
                   payload.includes('fromCharCode') || payload.includes('concat'));
        }
    },
    16: {
        title: "Level 16: Ultimate Challenge",
        description: "All protections are enabled. Find a way to execute alert(1).",
        difficulty: 5,
        hint: "Combine everything you've learned. Maybe try an obscure HTML5 feature?",
        filter: (input) => {
            // Extremely aggressive filtering
            input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            input = input.replace(/script|alert|eval|function|setTimeout|setInterval/gi, '');
            input = input.replace(/on\w+=/gi, '');
            input = input.replace(/javascript:/gi, '');
            input = input.replace(/[(){}'"`]/g, '');
            input = input.replace(/\\x|\\u|%/g, '');
            return input;
        },
        successCondition: (payload) => {
            return payload.includes('alert') && payload.includes('1');
        }
    }
};

    // Initialize the app
    function init() {
        loadLevel(currentLevel);
        updateStats();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Challenge navigation
        challengeItems.forEach(item => {
            item.addEventListener('click', () => {
                const level = parseInt(item.getAttribute('data-level'));
                if (level !== currentLevel) {
                    currentLevel = level;
                    loadLevel(currentLevel);
                    updateStats();
                }
            });
        });

        // Test payload button
        testBtn.addEventListener('click', testPayload);

        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                switchTab(tabName);
            });
        });

        // Hint toggle
        toggleHintBtn.addEventListener('click', toggleHint);

        // Cheat sheet buttons
        cheatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const payload = btn.getAttribute('data-payload');
                userInput.value = payload;
            });
        });

        // Theme toggle
        toggleThemeBtn.addEventListener('click', toggleTheme);

        // Reset button
        resetBtn.addEventListener('click', resetAll);

        // Modal controls
        closeModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        nextLevelBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            if (currentLevel < totalLevels) {
                currentLevel++;
                loadLevel(currentLevel);
                updateStats();
            }
        });

        stayHereBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }

    // Load a specific level
    function loadLevel(level) {
        const challenge = challenges[level];
        
        // Update UI
        levelTitleEl.textContent = challenge.title;
        levelDescriptionEl.textContent = challenge.description;
        document.querySelector('#hintContent p').innerHTML = challenge.hint;
        
        // Update active challenge in sidebar
        challengeItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.getAttribute('data-level')) === level) {
                item.classList.add('active');
            }
        });
        
        // Update difficulty stars
        starsEl.forEach((star, index) => {
            if (index < challenge.difficulty) {
                star.classList.add('fas');
                star.classList.remove('far');
            } else {
                star.classList.add('far');
                star.classList.remove('fas');
            }
        });
        
        // Clear input and output
        userInput.value = '';
        renderedOutput.innerHTML = '<p>Your payload will be rendered here after clicking "Test".</p>';
        sourceCode.textContent = '// Source code will appear here';
        consoleOutput.innerHTML = '<p>Console messages will appear here.</p>';
        
        // Reset tabs
        switchTab('result');
    }

    // Test the user's payload
    function testPayload() {
        attempts++;
        updateStats();
        
        let payload = userInput.value;
        const challenge = challenges[currentLevel];
        
        // Apply filters if they exist
        if (challenge.filter) {
            payload = challenge.filter(payload);
        }
        
        // Display the payload in the source tab
        sourceCode.textContent = `<!-- User input -->\n${payload}\n\n<!-- Rendered output -->\n<div id="output">${payload}</div>`;
        
        // Try to render the payload
        try {
            // Clear previous output
            renderedOutput.innerHTML = '';
            
            // Create a new element to render the payload
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = payload;
            
            // Append to the rendered output
            renderedOutput.appendChild(tempDiv);
            
            // Check if the payload executed any scripts
            setTimeout(() => {
                // Check success condition
                if (challenge.successCondition(payload)) {
                    handleSuccess();
                }
            }, 100);
            
            // Log to console
            consoleOutput.innerHTML = '<p>Payload executed without errors.</p>';
        } catch (e) {
            consoleOutput.innerHTML = `<p class="error">Error: ${e.message}</p>`;
        }
    }

    // Handle successful payload
    function handleSuccess() {
        successes++;
        
        // Add to completed levels if not already there
        if (!completedLevels.includes(currentLevel)) {
            completedLevels.push(currentLevel);
            unlockAchievement(currentLevel);
        }
        
        // Update stats
        updateStats();
        
        // Show success modal
        document.getElementById('successMessage').textContent = 
            `You've successfully completed ${challenges[currentLevel].title}!`;
        successModal.style.display = 'flex';
    }

    // Switch between tabs
    function switchTab(tabName) {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabName}Tab`) {
                content.classList.add('active');
            }
        });
    }

    // Toggle hint visibility
    function toggleHint() {
        hintContent.style.display = hintContent.style.display === 'block' ? 'none' : 'block';
        toggleHintBtn.innerHTML = hintContent.style.display === 'block' ? 
            '<i class="fas fa-lightbulb"></i> Hide Hint' : '<i class="fas fa-lightbulb"></i> Show Hint';
    }

    // Toggle dark/light theme
    // Theme toggle function (update if you already have one)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.body.classList.contains('light-theme') ? 'sun' : 'moon';
    toggleThemeBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;
    
    // Save preference to localStorage
    localStorage.setItem('themePreference', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Add this to your init function to check for saved preference
function init() {
    // Load theme preference
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Rest of your existing init code
    loadLevel(currentLevel);
    updateStats();
    setupEventListeners();
}

    // Update statistics
    function updateStats() {
        currentLevelEl.textContent = currentLevel;
        completedLevelsEl.textContent = `${completedLevels.length}/${totalLevels}`;
        attemptCountEl.textContent = attempts;
        
        const rate = attempts > 0 ? Math.round((successes / attempts) * 100) : 0;
        successRateEl.textContent = `${rate}%`;
    }

    // Unlock achievement
    function unlockAchievement(level) {
    const achievements = achievementList.querySelectorAll('.achievement');
    
    if (level === 1 && !achievements[0].classList.contains('unlocked')) {
        achievements[0].classList.remove('locked');
        achievements[0].classList.add('unlocked');
        achievements[0].innerHTML = '<i class="fas fa-trophy"></i> <span>First Blood (Complete Level 1)</span>';
    } else if (level === 5 && !achievements[1].classList.contains('unlocked')) {
        achievements[1].classList.remove('locked');
        achievements[1].classList.add('unlocked');
        achievements[1].innerHTML = '<i class="fas fa-trophy"></i> <span>Filter Evader (Complete Level 5)</span>';
    } else if (level === 8 && !achievements[2].classList.contains('unlocked')) {
        achievements[2].classList.remove('locked');
        achievements[2].classList.add('unlocked');
        achievements[2].innerHTML = '<i class="fas fa-trophy"></i> <span>DOM Master (Complete Level 8)</span>';
    } else if (level === 11 && !achievements[3].classList.contains('unlocked')) {
        achievements[3].classList.remove('locked');
        achievements[3].classList.add('unlocked');
        achievements[3].innerHTML = '<i class="fas fa-trophy"></i> <span>Obfuscation Expert (Complete Level 11)</span>';
    } else if (level === 14 && !achievements[4].classList.contains('unlocked')) {
        achievements[4].classList.remove('locked');
        achievements[4].classList.add('unlocked');
        achievements[4].innerHTML = '<i class="fas fa-trophy"></i> <span>CSP Hacker (Complete Level 14)</span>';
    } else if (level === 16 && completedLevels.length === 16 && !achievements[5].classList.contains('unlocked')) {
        achievements[5].classList.remove('locked');
        achievements[5].classList.add('unlocked');
        achievements[5].innerHTML = '<i class="fas fa-trophy"></i> <span>XSS Guru (Complete All Levels)</span>';
    }
}

    // Reset all progress
    function resetAll() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            currentLevel = 1;
            attempts = 0;
            successes = 0;
            completedLevels = [];
            
            // Reset achievements
            const achievements = achievementList.querySelectorAll('.achievement');
            achievements.forEach(ach => {
                ach.classList.remove('unlocked');
                ach.classList.add('locked');
                ach.innerHTML = ach.innerHTML.replace('fa-trophy', 'fa-lock');
            });
            
            loadLevel(currentLevel);
            updateStats();
        }
    }

    // Initialize the app
    init();
});