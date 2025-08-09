// Solar System Data
const planets = [
    {
        name: 'Sun',
        class: 'sun',
        symbol: '☀',
        stats: {
            'Type': 'Star',
            'Diameter': '1.39M km',
            'Temperature': '5,778 K',
            'Age': '4.6 Billion years'
        },
        description: 'The Sun is the star at the center of our Solar System. It\'s a nearly perfect sphere of hot plasma, generating energy through nuclear fusion in its core. The Sun contains 99.86% of the Solar System\'s mass.'
    },
    {
        name: 'Mercury',
        class: 'mercury',
        symbol: '☿',
        stats: {
            'Distance': '58M km',
            'Diameter': '4,879 km',
            'Day Length': '59 Earth days',
            'Year Length': '88 Earth days'
        },
        description: 'Mercury is the smallest planet in our solar system and closest to the Sun. It has extreme temperature variations, from 427°C during the day to -173°C at night due to its lack of atmosphere.'
    },
    {
        name: 'Venus',
        class: 'venus',
        symbol: '♀',
        stats: {
            'Distance': '108M km',
            'Diameter': '12,104 km',
            'Day Length': '243 Earth days',
            'Year Length': '225 Earth days'
        },
        description: 'Venus is the hottest planet in our solar system due to its thick atmosphere of carbon dioxide. It rotates backwards compared to most planets and has crushing atmospheric pressure 90 times that of Earth.'
    },
    {
        name: 'Earth',
        class: 'earth',
        symbol: '♁',
        stats: {
            'Distance': '150M km',
            'Diameter': '12,756 km',
            'Day Length': '24 hours',
            'Moons': '1'
        },
        description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is covered with water, and it has a protective atmosphere containing 21% oxygen.'
    },
    {
        name: 'Mars',
        class: 'mars',
        symbol: '♂',
        stats: {
            'Distance': '228M km',
            'Diameter': '6,792 km',
            'Day Length': '24.6 hours',
            'Moons': '2'
        },
        description: 'Mars is known as the "Red Planet" due to iron oxide on its surface. It has the largest volcano in the solar system (Olympus Mons) and evidence suggests it once had liquid water on its surface.'
    },
    {
        name: 'Jupiter',
        class: 'jupiter',
        symbol: '♃',
        stats: {
            'Distance': '779M km',
            'Diameter': '142,984 km',
            'Day Length': '9.9 hours',
            'Moons': '95+'
        },
        description: 'Jupiter is the largest planet in our solar system. It\'s a gas giant with a Great Red Spot - a storm larger than Earth that has raged for hundreds of years. It acts as a "cosmic vacuum cleaner" protecting inner planets.'
    },
    {
        name: 'Saturn',
        class: 'saturn',
        symbol: '♄',
        stats: {
            'Distance': '1.43B km',
            'Diameter': '120,536 km',
            'Day Length': '10.7 hours',
            'Moons': '146+'
        },
        description: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It\'s less dense than water and has beautiful hexagonal storms at its north pole. Its moon Titan has lakes of liquid methane.'
    },
    {
        name: 'Uranus',
        class: 'uranus',
        symbol: '♅',
        stats: {
            'Distance': '2.87B km',
            'Diameter': '51,118 km',
            'Day Length': '17.2 hours',
            'Moons': '27'
        },
        description: 'Uranus is unique because it rotates on its side, likely due to an ancient collision. It\'s an ice giant with a faint ring system and extremely cold temperatures reaching -224°C. It takes 84 Earth years to orbit the Sun.'
    },
    {
        name: 'Neptune',
        class: 'neptune',
        symbol: '♆',
        stats: {
            'Distance': '4.5B km',
            'Diameter': '49,528 km',
            'Day Length': '16.1 hours',
            'Moons': '16'
        },
        description: 'Neptune is the windiest planet with speeds reaching 2,100 km/h. It\'s the densest of the gas giants and has a deep blue color due to methane in its atmosphere. It takes 165 Earth years to complete one orbit.'
    }
];

// Global variables
let currentPlanet = 0;
let autoPlayInterval = null;
let isAutoPlaying = false;

// DOM elements
const planetElement = document.getElementById('planet');
const planetInfo = document.getElementById('planetInfo');
const planetName = document.getElementById('planetName');
const planetStats = document.getElementById('planetStats');
const planetDesc = document.getElementById('planetDesc');
const progressFill = document.querySelector('.progress-fill');
const navButtons = document.querySelectorAll('.nav-button');
const autoPlayBtn = document.getElementById('autoPlay');
const pauseBtn = document.getElementById('pauseBtn');

// Create starfield background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Update planet display and information
function showPlanet(index) {
    const planet = planets[index];
    
    // Update planet visual with smooth transition
    planetElement.className = `planet ${planet.class} entering`;
    
    setTimeout(() => {
        planetElement.className = `planet ${planet.class} active`;
    }, 100);

    // Update information panel
    planetName.textContent = planet.name;
    planetDesc.textContent = planet.description;
    
    // Update statistics dynamically
    planetStats.innerHTML = '';
    Object.entries(planet.stats).forEach(([label, value]) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
        `;
        planetStats.appendChild(statItem);
    });

    // Update progress indicator
    progressFill.style.width = ((index + 1) / planets.length) * 100 + '%';

    // Update navigation buttons
    navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    // Show info panel with delay for smooth transition
    setTimeout(() => {
        planetInfo.classList.add('show');
    }, 400);

    currentPlanet = index;
}

// Navigation button event listeners
navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (isAutoPlaying) {
            stopAutoPlay();
        }
        planetInfo.classList.remove('show');
        setTimeout(() => showPlanet(index), 200);
    });
});

// Auto-play functionality
function startAutoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayBtn.classList.add('active');
        pauseBtn.classList.remove('active');
        
        autoPlayInterval = setInterval(() => {
            planetInfo.classList.remove('show');
            setTimeout(() => {
                currentPlanet = (currentPlanet + 1) % planets.length;
                showPlanet(currentPlanet);
            }, 200);
        }, 4000); // 4 seconds per planet
    }
}

function stopAutoPlay() {
    if (isAutoPlaying) {
        isAutoPlaying = false;
        autoPlayBtn.classList.remove('active');
        pauseBtn.classList.add('active');
        clearInterval(autoPlayInterval);
    }
}

// Control button event listeners
autoPlayBtn.addEventListener('click', startAutoPlay);
pauseBtn.addEventListener('click', stopAutoPlay);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        if (isAutoPlaying) stopAutoPlay();
        planetInfo.classList.remove('show');
        setTimeout(() => {
            currentPlanet = (currentPlanet - 1 + planets.length) % planets.length;
            showPlanet(currentPlanet);
        }, 200);
    } else if (e.code === 'ArrowRight') {
        if (isAutoPlaying) stopAutoPlay();
        planetInfo.classList.remove('show');
        setTimeout(() => {
            currentPlanet = (currentPlanet + 1) % planets.length;
            showPlanet(currentPlanet);
        }, 200);
    } else if (e.code === 'Space') {
        e.preventDefault();
        if (isAutoPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }
});

// Touch/swipe support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (isAutoPlaying) stopAutoPlay();
        planetInfo.classList.remove('show');
        
        setTimeout(() => {
            if (diff > 0) {
                // Swipe left - next planet
                currentPlanet = (currentPlanet + 1) % planets.length;
            } else {
                // Swipe right - previous planet
                currentPlanet = (currentPlanet - 1 + planets.length) % planets.length;
            }
            showPlanet(currentPlanet);
        }, 200);
    }
}

// Window resize handler for responsive design
window.addEventListener('resize', () => {
    // Ensure proper layout on window resize
    const planetInfo = document.getElementById('planetInfo');
    if (window.innerWidth <= 768) {
        planetInfo.style.position = 'fixed';
        planetInfo.style.right = '20px';
    } else {
        planetInfo.style.right = '50px';
    }
});

// Initialize the solar system explorer
function initSolarSystem() {
    createStars();
    showPlanet(0);
    
    // Auto-start the presentation after 2 seconds
    setTimeout(startAutoPlay, 2000);
    
    // Add welcome message to console
    console.log('🌟 Solar System Explorer loaded successfully!');
    console.log('✨ Created by AARNA CHOPDEKAR');
    console.log('🎮 Controls: Arrow keys to navigate, Spacebar to play/pause');
    console.log('📱 Mobile: Swipe left/right to navigate between planets');
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initSolarSystem);

// Handle page visibility changes (pause when tab is not active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isAutoPlaying) {
        // Page is hidden, pause auto-play
        clearInterval(autoPlayInterval);
    } else if (!document.hidden && isAutoPlaying) {
        // Page is visible again, resume auto-play
        autoPlayInterval = setInterval(() => {
            planetInfo.classList.remove('show');
            setTimeout(() => {
                currentPlanet = (currentPlanet + 1) % planets.length;
                showPlanet(currentPlanet);
            }, 200);
        }, 4000);
    }
});