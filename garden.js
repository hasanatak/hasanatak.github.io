function injectGarden() {
  const style = document.createElement('style');
  style.textContent = `
  /* Base Styles - Applied to the whole page */

  #gamification {
  width: 100%;
      max-width: 480px;
      margin: 10px auto;  /* Center horizontally */
      font-family: sans-serif; /* Default font */
  }


  /* Isometric Grid Styles */
  .garden-element {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background-size: contain; /* Ensure image is contained within the element */
      background-repeat: no-repeat; /* Prevent image from repeating */
      background-position: center; /* Center the image in the element */
      position: relative; /* For tooltip positioning */
      pointer-events: auto; /* Make element clickable */
      cursor: pointer; /* Indicate it's clickable */
      transition: transform 0.2s ease-in-out; /* Smooth hover transition */
      display: flex; /* To center tooltip text */
      justify-content: center; /* Center horizontally */
      align-items: flex-start; /* Align tooltip to top */
      flex-direction: column; /* Stack tooltip above element */
  }

  .garden-element:hover {
      transform: scale(2.5) !important; /* Scale up on hover, !important to override inline scale, increased scale for better visibility */
      z-index: 2; /* Ensure hovered element is above others */
  }

  .element-tooltip-iso {
      position: absolute; /* Absolutely position tooltip */
      top: -40px; /* Position above element */

      color: #fff; /* White text for visibility */
      font-size: 0.2em;
      padding: 4px 8px;
      background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
      border-radius: 4px;
      pointer-events: none; /* Ensure tooltip doesn't interfere with clicks */
      opacity: 0; /* Initially hidden */
      transition: opacity 0.2s ease-in-out; /* Fade in transition */
      z-index: 3; /* Above hover effect */
      white-space: nowrap; /* Prevent text wrapping */
  }

  .garden-element:hover .element-tooltip-iso {
      opacity: 1; /* Show tooltip on hover */
  }

  /* Progress Bar Styles - Corrected and styled */
  .progress-container {
    width: 90%;
    height: 15px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    margin-bottom: 0.75rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .progress-container:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(to right, #ffcc00, #ffa500);
    width: 0%;
    border-radius: 8px; /* Match container's border-radius */
    transition: width 0.5s ease-in-out;
  }

  .milestone-container {
      height: 60px;
      margin-bottom: 0.5rem;
      display: flex; /* Use flexbox for layout */
      justify-content: space-around; /* Distribute milestones evenly */
      align-items: center; /* Vertically align milestones */
  }

  .milestone {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .milestone-marker {
      width: 2px;
      height: 10px;
      background-color: #666; /* Example marker color */
      margin-bottom: 4px;
  }

  .milestone-upgrade {
      width: 30px;
      height: 30px;
      border: 1px solid #ccc; /* Example border */
      border-radius: 50%; /* Circular shape */
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden; /* Clip image to circle */
  }

  .milestone-upgrade img {
      max-width: 100%;
      max-height: 100%;
      display: block; /* Remove extra space below image */
  }

  .milestone-name {
      font-size: 0.7rem;
      margin-top: 0.2rem;
      text-align: center;
  }

  .milestone-score {
      font-size: 0.8rem;
      margin-top: 0.2rem;
      text-align: center;
      color: #777; /* Example score color */
  }

  /* Current Score Style */
  .current-score-display {
      font-size: 1.2rem;
      
      margin-bottom: 0.75rem;
      text-align: center; /* Center the text */
      position: relative; /* For input positioning */
  }

  .score-input {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      padding: 0.25rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
      font-size: 1rem;
  }


  /* Button Style - REMOVED BUTTON STYLES */


  #garden-grid {
      /* Initial size and position */
      width: 300px;
      height: 300px;
      margin: auto; /* Center the grid */
      transform-origin: center; /* Set transform origin for scaling */
      transition: transform 0.3s ease, z-index 0s ease; /* Smooth transition */
      z-index: 1;
      position: relative;
      background-image: url('https://t4.ftcdn.net/jpg/02/76/96/63/360_F_276966363_n1fng6eYoGkgHMWOfTQnNKhd9EnoAlKn.jpg');
      background-size: cover;
      background-position: center;
      border-radius: 10px;
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3); /* Good Shadow for Garden Grid */
      cursor: grab; /* Indicate it's draggable */
      user-select: none; /* Prevent text selection while dragging */
  }
      /* Hover effect for scaling - REMOVED GRID HOVER SCALE EFFECT */
  #garden-grid:hover {
      /* transform: scale(1.1) rotateX(60deg) rotateZ(-45deg);  REMOVED SCALE FROM GRID HOVER */
      z-index: 1000;
  }

  #garden-grid.dragging {
      cursor: grabbing; /* Change cursor while dragging */
      transition: none; /* Disable transition during drag for immediate response */
      transform: scale(1.1) rotateX(60deg) rotateZ(-45deg); /* Maintain scale during drag */
  }
  #garden-grid.dragging:hover {
      transform: scale(1.1) rotateX(60deg) rotateZ(-45deg); /* Override hover effect during dragging */
  }


  .cell {
    overflow: visible; /* Ensure cells do not clip content */
  }


  /* Responsive adjustments */
  @media (max-width: 768px) {
      #gamification {
      position: fixed;

          margin: 10px auto;
          max-width: 95%;
      }

        .progress-container {
width: 105%;
    height: 60px;
}

.milestone-container {
    height: 75px;
}
      #garden-grid {
      bottom:20px;
          width: 60vw;
        height: 60vw;
          max-width: 250px;
          max-height: 250px;
      }
      .current-score-display{
            color: #ffc000;
        font-weight: bolder;
        font-family: 'Quran';
        top: 117px;
        position: relative;
        margin-bottom: 9px;
        font-size: 20px;
        left: -26%;
          }


      #garden-grid:hover {
          /* transform: scale(1.1) rotateX(60deg) rotateZ(-45deg);  REMOVED SCALE FROM GRID HOVER MOBILE */
      }
      #garden-grid.dragging:hover {
          transform: scale(1.1) rotateX(60deg) rotateZ(-45deg); /* Override hover effect during dragging on mobile too */
      }
  }
  `;
  document.head.appendChild(style);

  const framerMotionScript = document.createElement('script');
  framerMotionScript.src = "https://unpkg.com/framer-motion@12.4.1/dist/framer-motion.js";
  document.head.appendChild(framerMotionScript);

  const gamificationHTML = `
      <div class="current-score-display">
          حسناتك: <span id="current-score">0</span>
      </div>

      <div class="progress-container" id="progress-container">
          <div class="progress-bar" id="progress-bar"></div>
      </div>

      <div class="milestone-container" id="milestone-container">
          <!-- Milestone dynamically added here -->
      </div>
      <!-- REMOVED BUTTONS HERE -->
      <div id="garden-grid"
           style="transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; perspective: 1000px;"
           class="relative rounded-lg p-8 shadow-2xl transition-all duration-500">
      </div>
  `;

  const gamificationContainer = document.createElement('div');
  gamificationContainer.id = "gamification";
  gamificationContainer.innerHTML = gamificationHTML;
  document.body.prepend(gamificationContainer);

  setupGamificationScript();
  }

  function setupGamificationScript() {
  let GRID_SIZE = 3;
  let TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

  const GRID_EXPANSIONS = [
      { score: 0, size: 3, image: 'https://t4.ftcdn.net/jpg/02/76/96/63/360_F_276966363_n1fng6eYoGkgHMWOfTQnNKhd9EnoAlKn.jpg' }, // Added image
      // { score: 20, size: 4, image: 'https://img.freepik.com/premium-photo/green-football-field-fake-grass-texture-background_7189-2627.jpg?semt=ais_hybrid' }, // Added image
      // { score: 50, size: 5 }, // Added image
      // { score: 100, size: 6 }  // Added image
  ];


  const SLOT_UPGRADES = {
    1: [
      { score: 30,  name: "بيت صغير", image: './garden/house1.png', scale: 4.5, elevation: 0, tip: "زهرة جميلة", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 600, name: "بيت المؤمن", image: './garden/house2.png', scale: 4.5,elevation: 0  },
      { score: 1100, name: "منزل مبارك", image: './garden/house3.png', scale: 4.5,elevation: 0 },
      { score: 1600,name: "مسكن هنيء", image: './garden/house4.png', scale: 4.5,elevation: 0 },
      { score: 2100,name: "دار السلام", image: './garden/house5.png', scale: 4.5, elevation: 0},
      { score: 2600,name: "قصر المؤمن", image: './garden/house6.png', scale: 4.5,elevation: 0 },
      { score: 3100,name: "حصن حصين", image: './garden/house7.png', scale: 4.5,elevation: 0 },
      { score: 3600,name: "بيت الأبرار", image: './garden/house8.png', scale: 5.5,elevation: 0 },
      { score: 4900,name: "روضة الدارين", image: './garden/house9.png', scale: 5.5,elevation: 0 },
      { score: 6200,name: "جنة الفردوس", image: './garden/house10.png', scale:5.5,elevation: 0 }
    ],
    6: [
      { score: 10,  name: "زهرة", image: './garden/flower1.png', scale: 1.5, elevation: 0, tip: "زهرة جميلة", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 500, name: "زهرة المؤمن", image: './garden/flower2.png', scale: 1.5,elevation: 0  },
      { score: 1000, name: "ريحان الجنة", image: './garden/flower3.png', scale: 1.5,elevation: 0 },
      { score: 2500,name: "وردة طيبة", image: './garden/flower4.png', scale: 1.5,elevation: 0 },
      { score: 3000,name: "باقة أمل", image: './garden/flower5.png', scale: 1.5, elevation: 0},
      { score: 3500,name: "نرجس", image: './garden/flower6.png', scale: 1.5,elevation: 0 },
      { score: 4000,name: "ياسمين", image: './garden/flower7.png', scale: 1.5,elevation: 0 },
      { score: 4500,name: "قرنفل", image: './garden/flower8.png', scale: 1.5,elevation: 0 },
      { score: 5000,name: "زنبق", image: './garden/flower9.png', scale: 1.5,elevation: 0 },
      { score: 5500,name: "فُل", image: './garden/flower10.png', scale: 1.5,elevation: 0 }
    ],
    0: [
      { score: 30,  name: "نخلة صغيرة", image: './garden/palm1.png', scale: 2.5, elevation: 0, tip: "شجرة مباركة", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 700, name: "نخلة باسقة", image: './garden/palm2.png', scale: 2.5,elevation: 0  },
      { score: 1800, name: "نخلة مثمرة", image: './garden/palm3.png', scale: 2.5,elevation: 0 },
      { score: 2800,name: "بستان النخيل", image: './garden/palm4.png', scale: 2.5,elevation: 0 },
      { score: 3800,name: "ظل النخيل", image: './garden/palm5.png', scale: 2.5, elevation: 0},
      { score: 4800,name: "فسيلة نخل", image: './garden/palm6.png', scale: 2.5,elevation: 0 },
      { score: 5800,name: "نخيل الجنة", image: './garden/palm7.png', scale: 2.5,elevation: 0 },
  
    ],
    5: [
      { score: 30,  name: "حمار", image: './garden/pet1.png', scale: 2.5, elevation: 0, tip: "حيوان أليف", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 900, name: "حصان", image: './garden/pet2.png', scale: 2.5,elevation: 0  },
      { score: 1500, name: "حصان ذهب", image: './garden/pet3.png', scale: 2.5,elevation: 0 },
      { score: 2600,name: "جمل صبور", image: './garden/pet4.png', scale: 2.5,elevation: 0 },
      { score: 2300,name: "جمل غالي", image: './garden/pet5.png', scale: 2.5, elevation: 0},
      { score: 2900,name: "اسد ابن اسد", image: './garden/pet6.png', scale: 2.5,elevation: 0 },
      { score: 3300,name: "اسد ابن لبؤه", image: './garden/pet7.png', scale: 2.5,elevation: 0 },
      { score: 3900,name: "فيل اصيل", image: './garden/pet8.png', scale: 2.5,elevation: 0 },
      { score: 4300,name: "فيل ذهب", image: './garden/pet9.png', scale: 2.5,elevation: 0 },
      { score: 6300,name: "الدابه الرهيبه", image: './garden/pet10.png', scale: 2.5,elevation: 0 }
    ],
    4: [
      { score: 80,  name: "نافورة صغيرة", image: './garden/water1.png', scale: 2.5, elevation: 0, tip: "ماء عذب", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 1600, name: "نافورة زمزم", image: './garden/water2.png', scale: 2.5,elevation: 0  },
      { score: 2700, name: "سبيل ماء", image: './garden/water3.png', scale: 2.5,elevation: 0 },
      { score: 3700,name: "عين جارية", image: './garden/water4.png', scale: 2.5,elevation: 0 },
      { score: 5300,name: "نهر الكوثر", image: './garden/water5.png', scale: 2.5, elevation: 0},
  
    ],
    2: [
      { score: 40,  name: "شجرة صغيرة", image: './garden/tree1.png', scale: 2.5, elevation: 0, tip: "ظل ظليل", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 470, name: "شجرة وارفة", image: './garden/tree2.png', scale: 2.5,elevation: 0  },
      { score: 2350, name: "دوحة عظيمة", image: './garden/tree3.png', scale: 2.5,elevation: 0 },
      { score: 2950,name: "شجرة مباركة", image: './garden/tree4.png', scale: 2.5,elevation: 0 },
      { score: 3350,name: "ظل شجرة", image: './garden/tree5.png', scale: 2.5,elevation: 0 },
      { score: 3950,name: "أغصان مورقة", image: './garden/tree6.png', scale: 2.5, elevation: 0},
      { score: 4350,name: "غابة صغيرة", image: './garden/tree7.png', scale: 2.5,elevation: 0 },
      { score: 4950,name: "بستان الأشجار", image: './garden/tree8.png', scale: 2.5,elevation: 0 },
      { score: 5350,name: "روضة الأشجار", image: './garden/tree9.png', scale: 2.5,elevation: 0 },
      { score: 6050,name: "أشجار الجنة", image: './garden/tree10.png', scale: 2.5,elevation: 0 },
  
    ],
    3: [
      { score: 40,  name: "بئر صغيرة", image: './garden/well1.png', scale: 2.5, elevation: 0, tip: "ماء مبارك", callback: () => { console.log("Flower clicked!"); alert("You clicked a flower!"); } },
      { score: 470, name: "بئر عذبة", image: './garden/well2.png', scale: 2.5,elevation: 0  },
      { score: 1490, name: "مورد الماء", image: './garden/well3.png', scale: 2.5,elevation: 0 },
      { score: 1990,name: "عين زمزم", image: './garden/well4.png', scale: 2.5,elevation: 0 },
      { score: 2490,name: "بئر السقيا", image: './garden/well5.png', scale: 2.5, elevation: 0},
      { score: 2990,name: "ماء معين", image: './garden/well6.png', scale: 2.5, elevation: 0},
      { score: 3490,name: "بئر الكوثر", image: './garden/well7.png', scale: 2.5,elevation: 0 },
      { score: 3990,name: "مياه الري", image: './garden/well8.png', scale: 2.5,elevation: 0 },
      { score: 4390,name: "بئر الأمان", image: './garden/well9.png', scale: 2.5,elevation: 0 },
      { score: 5190,name: "سلسبيل", image: './garden/well10.png', scale: 2.5,elevation: 0 },
  
    ],

 
  };


  // Load cached score or initialize
  hasanatScore = parseInt(localStorage.getItem('hasanatScore')) || 10;
  document.getElementById('current-score').textContent = hasanatScore;
  updateGridSize(hasanatScore);
  updateProgressBar();
  renderMilestones();
  renderGrid();

  let clickCount = 0;
  let timer;
  const progressContainer = document.getElementById('progress-container');
  const currentScoreDisplay = document.getElementById('current-score');


  progressContainer.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 1) {
          timer = setTimeout(() => {
              clickCount = 0; // Reset if not clicked again within timeframe
          }, 500); // 500ms timeout between clicks
      } else if (clickCount === 3) {
          clearTimeout(timer);
          clickCount = 0;
          enableScoreEdit();
      }
  });


  function enableScoreEdit() {
      const scoreInput = document.createElement('input');
      scoreInput.type = 'number';
      scoreInput.className = 'score-input';
      scoreInput.value = hasanatScore;
      currentScoreDisplay.textContent = ''; // Clear current score text
      currentScoreDisplay.appendChild(scoreInput);
      scoreInput.focus();

      scoreInput.addEventListener('blur', handleScoreInputChange);
      scoreInput.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              handleScoreInputChange();
          }
      });

      function handleScoreInputChange() {
          const newScore = parseInt(scoreInput.value, 10);
          currentScoreDisplay.removeChild(scoreInput); // Remove input field
          if (!isNaN(newScore)) {
              updateScore (newScore); // Call updateScore with manual flag
          } else {
              document.getElementById('current-score').textContent = hasanatScore; // Revert if invalid input
          }
      }
  }


  window.updateScore = function(change) {
      // const newScore = hasanatScore + change;
      // if (newScore < 0) return;
      updateScoreInternal(change);
  }

  // Internal updateScore function to handle both manual and button updates
  function updateScoreInternal(newScore) {
      hasanatScore = newScore;
      localStorage.setItem('hasanatScore', hasanatScore); // Save to localStorage
      document.getElementById('current-score').textContent = hasanatScore;
      updateGridSize(hasanatScore);
      updateProgressBar();
      renderMilestones();
      renderGrid();
  }

  // Separate function for manual score update to avoid infinite loop if updateScore calls itself directly
  function updateScore (newScore) {
      updateScoreInternal(newScore);
  }


  function updateGridSize(currentScore) {
    const applicableExpansions = GRID_EXPANSIONS.filter(exp => currentScore >= exp.score);
    const currentExpansion = applicableExpansions[applicableExpansions.length - 1];

        if (currentExpansion && currentExpansion.size !== GRID_SIZE) {
            GRID_SIZE = currentExpansion.size;
            TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
             const gridElement = document.getElementById('garden-grid');

            // Update grid background image
            gridElement.style.backgroundImage = `url('${currentExpansion.image}')`;

            //Adjust the size only if NOT hovering
            if(!gridElement.matches(':hover')){
              let newSize = 300 + (GRID_SIZE - 3) * 50; // Smaller increment for growth
                //For responsive
                if(window.innerWidth <= 768){
                    newSize = Math.min(window.innerWidth * 0.9, 250 + (GRID_SIZE-3) * 20); //limit and increment adjustment
                }
                gridElement.style.width = `${newSize}px`;
                gridElement.style.height = `${newSize}px`;
            }

        }
    }

  function calculateRequiredElements(currentScore) {
      const elements = [];
      for (const [position, upgrades] of Object.entries(SLOT_UPGRADES)) {
          const pos = parseInt(position);
          if (pos < TOTAL_CELLS) {
              const applicableUpgrades = upgrades.filter(upgrade => currentScore >= upgrade.score);
              if (applicableUpgrades.length > 0) {
                  const highestUpgrade = applicableUpgrades[applicableUpgrades.length - 1];
                  elements.push({ position: pos, ...highestUpgrade }); // Spread operator to include all properties
              }
          }
      }
      return elements;
  }
  function updateProgressBar() {
      const nextUpgrade = getNextUpgrade();
      const progressBar = document.getElementById('progress-bar');

      if (nextUpgrade) {
          const prevUpgrades = getAllPreviousUpgrades();
          const prevUpgrade = prevUpgrades.pop();

          let prevUpgradeScore = 0;
          if (prevUpgrade) {
              prevUpgradeScore = prevUpgrade.score;
          }

          const scoreWithinTier = hasanatScore - prevUpgradeScore;
          const tierSize = nextUpgrade.score - prevUpgradeScore;
          const progress = (scoreWithinTier / tierSize) * 100;

          progressBar.style.width = `${Math.min(progress, 100)}%`;
      } else {
          progressBar.style.width = '100%';
      }
  }
  function getAllPreviousUpgrades() {
    let allPrevUpgrades = [];
    for (const upgrades of Object.values(SLOT_UPGRADES)) {
      const prevUpgrades = upgrades.filter(upgrade => upgrade.score <= hasanatScore);
      allPrevUpgrades.push(...prevUpgrades);
    }

    return allPrevUpgrades;
  }

  function getNextUpgrade() {
      let nextUpgrade = null;
      let minNextScore = Infinity;

      for (const upgrades of Object.values(SLOT_UPGRADES)) {
          const upcomingUpgrade = upgrades.find(upgrade => upgrade.score > hasanatScore);

          if (upcomingUpgrade && upcomingUpgrade.score < minNextScore) {
              nextUpgrade = upcomingUpgrade;
              minNextScore = upcomingUpgrade.score;
          }
      }

      return nextUpgrade;
  }

  function renderMilestones() {
      const milestoneContainer = document.getElementById('milestone-container');
      milestoneContainer.innerHTML = ''; // Clear container

      const nextUpgrade = getNextUpgrade();

      if (nextUpgrade) {
          const milestone = document.createElement('div');
          milestone.classList.add('milestone');

          const marker = document.createElement('div');
          marker.classList.add('milestone-marker');
          milestone.appendChild(marker);

          const upgradeDiv = document.createElement('div');
          upgradeDiv.classList.add('milestone-upgrade');
          const img = document.createElement('img');
          img.src = nextUpgrade.image;
          img.alt = nextUpgrade.type;
          upgradeDiv.appendChild(img);
          milestone.appendChild(upgradeDiv);

          const nameText = document.createElement('div');
          nameText.classList.add('milestone-name');
          nameText.textContent = nextUpgrade.name;
          milestone.appendChild(nameText);

          const scoreText = document.createElement('div');
          scoreText.classList.add('milestone-score');
          scoreText.textContent = nextUpgrade.score;
          milestone.appendChild(scoreText);

          milestoneContainer.appendChild(milestone);
      }
  }

  function handleElementClick(elementConfig) { //elementConfig is passed now
      if (elementConfig && elementConfig.callback) {
          elementConfig.callback(); //use elementConfig directly
      }
  }

  function renderGrid() {
      const elements = calculateRequiredElements(hasanatScore);
      const grid = document.getElementById('garden-grid');

      grid.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(${GRID_SIZE}, 1fr); gap: 4px; width: 100%; height: 100%;">
      ${Array.from({ length: TOTAL_CELLS }).map((_, index) => {
          const element = elements.find(el => el.position === index);
          return `
            <div class="cell relative bg-white/10 rounded-lg transition-colors" style="transform-style: preserve-3d; overflow: visible;">
              ${element ? `
                <div class="absolute inset-0 flex items-center justify-center"
                     style="transform: translateZ(${element.elevation}px) rotateX(0deg) rotateZ(45deg); transform-style: preserve-3d;">
                  <div class="garden-element"
                       title="${element.tip}"
                       onclick="handleElementClick(${JSON.stringify(element)})" // Pass the whole element config
                       style="background-image: url('${element.image}'); transform: scale(${element.scale}); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); top: ${element.top}; left: ${element.left};">
                      <div class="element-tooltip-iso">${element.name}</div>
                  </div>
                </div>
              ` : ''}
            </div>
          `;
      }).join('')}
    </div>
  `;

      // Add drag rotation functionality after rendering the grid
      setupDragRotation();
  }

  let currentRotationX = 60; // Keep track of rotationX
  let currentRotationZ = -45; // Keep track of rotationZ

  function setupDragRotation() {
      const grid = document.getElementById('garden-grid');
      let isDragging = false;
      let startX, startY;

      // Define rotation limits
      const ROTATION_LIMIT_X = 10; // +/- from initial rotationX (60) - VERY LIMITED X ROTATION
      const ROTATION_LIMIT_Z = 40; // +/- from initial rotationZ (-45) - INCREASED Z ROTATION
      const ROTATION_SPEED_X = 0.05; // Reduced X rotation speed
      const ROTATION_SPEED_Z = 0.3; // Increased Z rotation speed


      grid.addEventListener('mousedown', (e) => {
          isDragging = true;
          grid.classList.add('dragging');
          startX = e.pageX;
          startY = e.pageY;
      });

      document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          e.preventDefault(); // Prevent default drag behavior

          const deltaX = e.pageX - startX;
          const deltaY = e.pageY - startY;

          // Correct rotation directions - Invert deltaX for Z rotation, and deltaY for X rotation for intuitive control
          currentRotationZ -= deltaX * ROTATION_SPEED_Z; // Z rotation with increased speed
          currentRotationX += deltaY * ROTATION_SPEED_X; // X rotation with reduced speed

          // Apply rotation limits - CLAMPING
          currentRotationX = Math.max(60 - ROTATION_LIMIT_X, Math.min(60 + ROTATION_LIMIT_X, currentRotationX)); // Limit X rotation
          currentRotationZ = Math.max(-45 - ROTATION_LIMIT_Z, Math.min(-45 + ROTATION_LIMIT_Z, currentRotationZ)); // Limit Z rotation


          // Apply rotation, keep scale and perspective
          grid.style.transform = `scale(1.1) rotateX(${currentRotationX}deg) rotateZ(${currentRotationZ}deg) perspective(1000px)`;

          startX = e.pageX;
          startY = e.pageY;
      });

      grid.addEventListener('mouseup', () => {
          isDragging = false;
          grid.classList.remove('dragging');
           // Smoothly transition back to the original scale and isometric rotation
           grid.style.transform = `scale(1.1) rotateX(${60}deg) rotateZ(${-45}deg) perspective(1000px)`;
           currentRotationX = 60; // Reset tracked rotationX to initial
           currentRotationZ = -45; // Reset tracked rotationZ to initial

           // After the transition, reset the inline style to allow hover to take over if needed.
           setTimeout(() => {
               if(!grid.matches(':hover') && !isDragging){ // Double check not hovering or dragging after timeout
                   grid.style.transform = `rotateX(60deg) rotateZ(-45deg) perspective(1000px)`; // Reset to original if not hovering
               }
           }, 300); // Match the CSS transition duration (0.3s)
      });

      grid.addEventListener('mouseleave', () => {
          if (isDragging) {
              isDragging = false;
              grid.classList.remove('dragging');
               // Smoothly transition back to the original scale and isometric rotation
               grid.style.transform = `scale(1.1) rotateX(${60}deg) rotateZ(${-45}deg) perspective(1000px)`;
               currentRotationX = 60; // Reset tracked rotationX to initial
               currentRotationZ = -45; // Reset tracked rotationZ to initial
               setTimeout(() => {
                   if(!grid.matches(':hover') && !isDragging){ // Double check not hovering or dragging after timeout
                       grid.style.transform = `rotateX(60deg) rotateZ(-45deg) perspective(1000px)`; // Reset to original if not hovering
                   }
               }, 300); // Match the CSS transition duration (0.3s)
          }
      });
  }
  } // Closing brace added here for setupGamificationScript function

  // Call the function
  injectGarden();
//gpt ====================================================
function toy(options) {
  console.log("toy function called with options:", options);

  let toyElementId = options.id;
  let toyElement = document.getElementById(toyElementId);
  let storedApiKey = localStorage.getItem('geminiApiKey');
  let apiKeyToUse = options.api !== "x" ? (options.api || storedApiKey) : null;
  let systemPrompt = options.systemPrompt;
  let userPrompt = options.userPrompt;
  let apiOption = options.api;
  let apiKeyPopup;
  let textModal;
  let deleteZone;
  let toyImageURL = options.image;
  let currentZSpeakInstance = null; // To store the current zSpeak instance
  let currentZSpeakText = null;     // To store the current zSpeak text

  // Inject CSS if not already present
  if (!document.getElementById('toy-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'toy-styles';
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      #toy-api-popup {
        display: none;
        position: fixed;
            width: 70%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #222;
        color: #eee;
        padding: 20px;
        border: 1px solid #555;
        box-shadow: 0 4px 8px rgba(0,0,0,0.6);
        z-index: 1001;
        text-align: right;
        direction: rtl;
      }

      #toy-api-popup .api-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      #toy-api-popup .close-button {
        background: none;
        color: #ccc;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
      }

      #toy-api-popup .close-button:hover {
        color: #fff;
      }


      #toy-api-popup h2 {
        margin-top: 0;
        color: #fff;
        margin-bottom: 0;
      }

      #toy-api-popup label {
        display: block;
        margin-bottom: 8px;
        color: #ccc;
      }

      #toy-api-popup input[type="text"] {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #777;
        background-color: #444;
        color: #eee;
        box-sizing: border-box;
      }

      #toy-api-popup button {
        background-color: #28a745;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      #toy-api-popup button:hover {
        background-color: #218838;
      }

      #toy-api-popup .manual-steps {
        margin-top: 20px;
        border: 1px solid #777;
        padding: 10px;
        background-color: #333;
        color: #ddd;
      }

      #toy-api-popup .manual-steps h3 {
        margin-top: 0;
        color: #fff;
      }

      #toy-api-popup .manual-steps ol {
        padding-right: 20px;
        padding-left: 0;
        list-style-type: arabic-indic;
      }

      #toy-api-popup .manual-steps ol li a {
        color: #00bcd4;
      }


      #toy-element {
        position: fixed;
        top: 10%;
        left: 10%;
        width: 10vw;
        height: 10vw;
        z-index: 2147483647;
        cursor: grab;
        border-radius: 50%;
        overflow: hidden;
        transition: transform 0.3s ease;
        touch-action: none;
      }

      #toy-element:hover {
        transform: scale(1.1);
      }

      #toy-element img {
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }


      .z-speak-bubble {
        position: absolute;
        z-index: 1000;
        font-family: "Roboto, sans-serif";
        background: linear-gradient(45deg, #00ff00);
        border: 2px solid #00ff00;
        box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
        max-width: 200px;
        font-size: 12px;
        padding: 3px;
        line-height: 1.5;
        word-wrap: break-word;
        transition: opacity 0.3s ease;
        margin: 0;
        overflow: hidden;
        direction: rtl;
        text-align: right;
      }

      .z-speak-content {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        margin: 0;
      }

      .z-speak-content img {
        max-width: 100%;
        height: auto;
      }

      .z-speak-show-more {
        color: #007bff;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      .z-speak-show-more:hover {
        text-decoration: underline;
      }


      #toy-text-modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        width:60%;
        height:60%;
        transform: translate(-50%, -50%);
        background-color: #222;
        color: #eee;
        padding: 20px;
        border: 1px solid #555;
        box-shadow: 0 4px 8px rgba(0,0,0,0.6);
        z-index: 1002;
        max-height: 80vh;
        overflow-y: auto;
        width: 80vw;
        max-width: 800px;
        text-align: right;
        direction: rtl;
      }

      #toy-text-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      #toy-text-modal .modal-close-button {
        background: none;
        color: #ccc;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
      }

      #toy-text-modal .modal-close-button:hover {
        color: #fff;
      }

      #toy-text-modal h2 {
        margin-top: 0;
        color: #fff;
        margin-bottom: 0;
      }

      #toy-text-modal .modal-content {
        margin-top: 20px;
        line-height: 1.6;
        white-space: pre-line;
      }

      #toy-text-modal .modal-content p,
      #toy-text-modal .modal-content ul,
      #toy-text-modal .modal-content ol {
        color: #eee;
      }

      #toy-text-modal .modal-content a {
        color: #00bcd4;
      }

      #delete-zone {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2147483646;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }

      #delete-zone.visible {
        opacity: 1;
      }

      #delete-zone.glow {
        background-color: rgba(255, 0, 0, 0.5);
      }

      #delete-zone::before {
        content: 'X';
        color: white;
        font-size: 50px;
        text-shadow: 2px 2px 4px #000000;
      }

    `;
    document.head.appendChild(styleSheet);
  }

  // API Key Popup Functions
  function showApiKeyPopup() {
    if (!apiKeyPopup) {
      apiKeyPopup = document.createElement('div');
      apiKeyPopup.id = 'toy-api-popup';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'api-popup-header';
      apiKeyPopup.appendChild(headerDiv);

      const title = document.createElement('h2');
      title.textContent = 'أدخل مفتاح API الخاص بـ Gemini';
      headerDiv.appendChild(title);

      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.textContent = 'X';
      closeButton.onclick = hideApiKeyPopup;
      headerDiv.appendChild(closeButton);


      const label = document.createElement('label');
      label.setAttribute('for', 'geminiApiKey');
      label.textContent = 'مفتاح API:';
      apiKeyPopup.appendChild(label);

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'geminiApiKey';
      input.name = 'geminiApiKey';
      apiKeyPopup.appendChild(input);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'حفظ مفتاح API';
      saveButton.onclick = testAndSaveApiKey;
      apiKeyPopup.appendChild(saveButton);

      const manualStepsDiv = document.createElement('div');
      manualStepsDiv.className = 'manual-steps';

      const manualTitle = document.createElement('h3');
      manualTitle.textContent = 'كيفية الحصول على مفتاح Gemini API';
      manualStepsDiv.appendChild(manualTitle);

      const manualList = document.createElement('ol');
      manualList.innerHTML = `
        <li>اذهب إلى <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>.</li>
        <li>سجل الدخول بحساب جوجل الخاص بك.</li>
        <li>اضغط على "إنشاء مفتاح API في مشروع جديد".</li>
        <li>انسخ مفتاح API الذي تم إنشاؤه.</li>
        <li>ألصق مفتاح API في حقل الإدخال أعلاه واضغط "حفظ مفتاح API".</li>
      `;
      manualStepsDiv.appendChild(manualList);
      apiKeyPopup.appendChild(manualStepsDiv);


      document.body.appendChild(apiKeyPopup);
    }
    apiKeyPopup.style.display = 'block';
  }

  function hideApiKeyPopup() {
    if (apiKeyPopup) {
      apiKeyPopup.style.display = 'none';
    }
  }


  async function testAndSaveApiKey() {
    const apiKey = document.getElementById('geminiApiKey').value;
    try {
      const testResponse = await callGeminiAPI("اختبر المفتاح", apiKey, "اختبار");
      if (testResponse) {
        localStorage.setItem('geminiApiKey', apiKey);
        apiKeyToUse = apiKey;
        storedApiKey = apiKey;
        hideApiKeyPopup();
        toy(options);
      } else {
        alert("مفتاح API غير صالح. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error testing API key:", error);
      alert("حدث خطأ أثناء اختبار مفتاح API. يرجى التحقق من المفتاح والمحاولة مرة أخرى.");
    }
  }


  // GPT Functionality
  async function callGeminiAPI(message, api, prompt) {
    const model = "gemini-pro";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${prompt}\n\nUser Question: ${message}\n\nAssistant Response:`
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        })
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403 || response.status === 400) {
          throw new Error('API Key Issue');
        } else {
          const errorData = await response.json();
          throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No valid response from Gemini API');
      }

    } catch (error) {
      console.error('Error in callGeminiAPI:', error.message);
      throw error;
    }
  }

  // ZSpeak Function
  function zSpeak({
    targetElement,
    text,
    speed = 50,
    backgroundImage = null,
    showMoreText = "Show more",
    typewriterEffect = true,
    neonColor = "#00ff00",
    enableNeon = true,
    fontFamily = "Roboto, sans-serif",
    fontColor = "#ffffff",
    bubbleBackground = null,
    gradient = ["#00ff00"],
    borderColor = "#00ff00",
    borderRadius = "10px",
    position = "auto",
    trackParent = true,
    disappearOnClick = false,
    appearOnHover = false,
    size = "small",
    distance = 1,
    maxVisibleChars = 200,
  }) {
    console.log("zSpeak function called with text:", text, "targetElement:", targetElement, "disappearOnClick:", disappearOnClick);
    removeExistingSpeechBubble(targetElement);

    const sizeStyles = {
      small: {
        maxWidth: "200px",
        fontSize: "12px",
        padding: "3px",
        lineHeightMultiplier: 1.5,
      },
      medium: {
        maxWidth: "300px",
        fontSize: "14px",
        padding: "6px",
        lineHeightMultiplier: 1.6,
      },
      large: {
        maxWidth: "400px",
        fontSize: "16px",
        padding: "9px",
        lineHeightMultiplier: 1.7,
      },
    };
    const selectedSize = sizeStyles[size] || sizeStyles.small;
    const isGradient = gradient.length > 1;
    const defaultGradientStyle = isGradient ? `linear-gradient(45deg, ${gradient.join(", ")})` : gradient[0];
    const backgroundStyle = bubbleBackground !== null ? bubbleBackground : defaultGradientStyle;


    const speechBubble = document.createElement("div");
    speechBubble.classList.add("z-speak-bubble");
    speechBubble.dataset.targetElementId = targetElement.id;

    if (backgroundImage) {
      speechBubble.style.backgroundImage = `url(${backgroundImage})`;
      speechBubble.style.backgroundSize = "cover";
    }
    speechBubble.style.fontFamily = fontFamily;
    speechBubble.style.color = fontColor;
    speechBubble.style.background = backgroundStyle;
    speechBubble.style.border = `2px solid ${borderColor}`;
    speechBubble.style.boxShadow = enableNeon ? `0 0 10px ${neonColor}, 0 0 20px ${neonColor}, 0 0 30px ${neonColor}` : "none";
    speechBubble.style.maxWidth = selectedSize.maxWidth;
    speechBubble.style.fontSize = selectedSize.fontSize;
    speechBubble.style.padding = selectedSize.padding;
    speechBubble.style.lineHeight = selectedSize.lineHeightMultiplier;
    speechBubble.style.borderRadius = borderRadius;
    speechBubble.style.display = 'block'; // Ensure it's visible initially

    const content = document.createElement("div");
    content.classList.add("z-speak-content");
    speechBubble.appendChild(content);

    const parsedHTML = marked.parse(text);

    let index = 0;
    let previousHeight = 0;
    let totalHeightAdjustment = 0;
    let fullText = parsedHTML;
    let truncatedHTML = parsedHTML;

    if (text.length > maxVisibleChars) {
        truncatedHTML = marked.parse(text.substring(0, maxVisibleChars) + "...");
    }


    const updatePosition = (heightDifference = 0, isTracking = trackParent) => {
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const bubbleRect = speechBubble.getBoundingClientRect();

      let top = rect.top + window.scrollY - distance;
      let left = rect.left + window.scrollX + rect.width + 10;
      let borderAdjustment = {};

      const heightAdjustmentFactor = 0.9;

      if (position !== "below") {
        if (!isTracking) {
          totalHeightAdjustment += heightDifference * heightAdjustmentFactor;
        }
        top -= totalHeightAdjustment;
      }

      if (left + bubbleRect.width > viewportWidth) {
        left = rect.left + window.scrollX - bubbleRect.width - 10;
        borderAdjustment = {
          borderBottomRightRadius: "0",
        };
      } else {
        borderAdjustment = {
          borderBottomLeftRadius: "0",
        };
      }

      if (position === "above") {
        top = rect.top + window.scrollY - bubbleRect.height - distance;
        borderAdjustment = {};
      } else if (position === "below") {
        top = rect.bottom + window.scrollY + distance;
      }

      Object.assign(speechBubble.style, {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        ...borderAdjustment,
        top: `${top}px`,
        left: `${left}px`
      });
    };

    const showFullTextInModal = () => {
      if (!textModal) {
        textModal = document.createElement('div');
        textModal.id = 'toy-text-modal';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        textModal.appendChild(modalHeader);

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'النص الكامل';
        modalHeader.appendChild(modalTitle);

        const modalCloseButton = document.createElement('button');
        modalCloseButton.className = 'modal-close-button';
        modalCloseButton.textContent = 'X';
        modalCloseButton.onclick = hideTextModal;
        modalHeader.appendChild(modalCloseButton);

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        textModal.appendChild(modalContent);

        document.body.appendChild(textModal);
      }
      document.querySelector('#toy-text-modal .modal-content').innerHTML = fullText;
      textModal.style.display = 'block';
    };

    const hideTextModal = () => {
      if (textModal) {
        textModal.style.display = 'none';
      }
    };


    const type = () => {
      let currentHTML = text.length > maxVisibleChars ? truncatedHTML : parsedHTML;
      if (index < currentHTML.length) {
        content.innerHTML = currentHTML.substring(0, index + 1);
        const currentHeight = speechBubble.offsetHeight;
        const heightDifference = currentHeight - previousHeight;

        if (heightDifference !== 0) {
          const prevLines = previousHeight / (parseInt(selectedSize.fontSize) * selectedSize.lineHeightMultiplier);
          const currentLines = currentHeight / (parseInt(selectedSize.fontSize) * selectedSize.lineHeightMultiplier);
          const linesDifference = currentLines - prevLines;

          updatePosition(heightDifference + (linesDifference > 0 ? linesDifference * 2 : 0), false);
          previousHeight = currentHeight;
        }

        index++;
        setTimeout(type, speed);
      } else {
        if (text.length > maxVisibleChars) {
          const showMore = document.createElement("span");
          showMore.innerText = showMoreText;
          showMore.classList.add('z-speak-show-more');
          showMore.addEventListener("click", showFullTextInModal);
          content.appendChild(showMore);
        }
      }
    };

    if (typewriterEffect) {
      document.body.appendChild(speechBubble);
      previousHeight = speechBubble.offsetHeight;
      updatePosition(0, false);
      type();
    } else {
      if (text.length > maxVisibleChars) {
        content.innerHTML = truncatedHTML;
        const showMore = document.createElement("span");
        showMore.innerText = showMoreText;
        showMore.classList.add('z-speak-show-more');
        showMore.addEventListener("click", showFullTextInModal);
        content.appendChild(showMore);
      } else {
        content.innerHTML = parsedHTML;
      }
      document.body.appendChild(speechBubble);
      updatePosition(0, false);
    }

    if (disappearOnClick) {
      const removeOnClick = () => {
        document.body.removeChild(speechBubble);
        document.removeEventListener("click", removeOnClick);
      };
      document.addEventListener("click", removeOnClick);
    }

    if (trackParent) {
      const trackingInterval = setInterval(() => {
        updatePosition(0, true);
      }, 100);
      speechBubble.addEventListener("remove", () => {
        clearInterval(trackingInterval);
      });
    }


    if (appearOnHover) {
      targetElement.addEventListener("mouseenter", () => {
        speechBubble.style.display = "block";
      });
      targetElement.addEventListener("mouseleave", () => {
        speechBubble.style.display = "none";
      });
    }

    return {
      remove: () => {
        if (speechBubble.parentNode) {
          speechBubble.parentNode.removeChild(speechBubble);
        }
      },
      show: () => {
        speechBubble.style.display = 'block';
      },
      hide: () => {
        speechBubble.style.display = 'none';
      },
      updateText: (newText) => {
        text = newText;
        content.innerHTML = marked.parse(text);
      }
    };
  }

  function removeExistingSpeechBubble(targetElement) {
    const existingBubble = document.querySelector(`.z-speak-bubble[data-target-element-id="${targetElement.id}"]`);
    if (existingBubble) {
      if (existingBubble.parentNode) {
        existingBubble.parentNode.removeChild(existingBubble);
      }
    }
  }


  // Check if the element already exists
  toyElement = document.getElementById(toyElementId);
  console.log("toy element before check:", toyElement, "ID:", toyElementId);

  if (!toyElement) {
    console.log("toy element NOT found, creating...", "ID:", toyElementId);
    // Draggable Div Creation and Injection if element doesn't exist
    toyElement = document.createElement('div');
    toyElement.id = toyElementId;
    toyElement.style.position = 'fixed';
    toyElement.style.top = '10%';
    toyElement.style.left = '10%';
    toyElement.style.width = '10vw';
    toyElement.style.height = '10vw';
    toyElement.style.zIndex = '2147483647';
    toyElement.style.cursor = 'grab';
    toyElement.style.borderRadius = '50%';
    toyElement.style.overflow = 'hidden';
    toyElement.style.transition = 'transform 0.3s ease';
    toyElement.style.touchAction = 'none';

    toyElement.addEventListener('mouseover', () => {
      toyElement.style.transform = 'scale(1.1)';
    });
    toyElement.addEventListener('mouseout', () => {
      toyElement.style.transform = 'scale(1)';
    });

    const toyImg = document.createElement('img');
    toyImg.src = toyImageURL || 'https://www.57357.org/app/uploads/2020/06/%D8%A7%D9%84%D8%B4%D9%8A%D8%AE-%D8%A7%D9%84%D8%B4%D8%B9%D8%B1%D8%A7%D9%88%D9%8A-%D8%B5%D9%88%D8%B1-1.jpg';
    toyImg.style.width = '100%';
    toyImg.style.height = '100%';
    toyImg.style.display = 'block';
    toyImg.style.pointerEvents = 'none';

    toyElement.appendChild(toyImg);
    document.body.appendChild(toyElement);
    console.log("toy element CREATED and appended:", toyElement, "ID:", toyElementId, "Image URL:", toyImg.src);

    // Create Delete Zone if it doesn't exist
    deleteZone = document.getElementById('delete-zone');
    if (!deleteZone) {
      deleteZone = document.createElement('div');
      deleteZone.id = 'delete-zone';
      document.body.appendChild(deleteZone);
    }


    // Make the div draggable (PC and Mobile)
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let isOverDeleteZone = false;

    const startDrag = (e) => {
      isDragging = true;
      offsetX = (e.type === 'mousedown' ? e.clientX : e.touches[0].clientX) - toyElement.offsetLeft;
      offsetY = (e.type === 'mousedown' ? e.clientY : e.touches[0].clientY) - toyElement.offsetTop;
      toyElement.style.cursor = 'grabbing';
      toyElement.style.opacity = '0.7';
      deleteZone.classList.add('visible');

      // Hide zSpeak when dragging starts
      if (currentZSpeakInstance) {
        currentZSpeakInstance.hide();
      }

      e.preventDefault();
    };

    const dragElement = (e) => {
      if (!isDragging) return;
      const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
      const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
      toyElement.style.left = (clientX - offsetX) + 'px';
      toyElement.style.top = (clientY - offsetY) + 'px';

      const toyRect = toyElement.getBoundingClientRect();
      const deleteRect = deleteZone.getBoundingClientRect();

      isOverDeleteZone = !(
        toyRect.right < deleteRect.left ||
        toyRect.left > deleteRect.right ||
        toyRect.bottom < deleteRect.top ||
        toyRect.top > deleteRect.bottom
      );

      if (isOverDeleteZone) {
        deleteZone.classList.add('glow');
      } else {
        deleteZone.classList.remove('glow');
      }
      e.preventDefault();
    };

    const endDrag = () => {
      isDragging = false;
      toyElement.style.cursor = 'grab';
      toyElement.style.opacity = '1';
      deleteZone.classList.remove('visible');
      deleteZone.classList.remove('glow');

      // Reappear zSpeak when dragging ends
      if (currentZSpeakInstance && currentZSpeakText) {
        currentZSpeakInstance.show();
        // Alternatively, if you want to recreate the bubble every time after dragging:
        // currentZSpeakInstance.remove();
        // currentZSpeakInstance = zSpeak({
        //   text: currentZSpeakText,
        //   targetElement: toyElement,
        //   trackParent: true,
        //   disappearOnClick: options.disappearOnClick,
        //   maxVisibleChars: 200,
        //   showMoreText: "Show more"
        // });
      }


      if (isOverDeleteZone) {
        console.log("toy element dropped on delete zone - DELETING", "ID:", toyElementId);
        if (toyElement && toyElement.parentNode) {
          toyElement.parentNode.removeChild(toyElement);
        }
        const speechBubbles = document.querySelectorAll(`.z-speak-bubble[data-target-element-id="${toyElementId}"]`);
        speechBubbles.forEach(bubble => {
          if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
          }
        });
        toyElement = null;
      }
      isOverDeleteZone = false;
    };

    // Mouse events
    toyElement.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', endDrag);

    // Touch events
    toyElement.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', dragElement, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);

    // Click event
    toyElement.addEventListener('click', (e) => {
      if (!isDragging && !isOverDeleteZone) {
        zSpeak({ text: "ماذا تحتاج يا بني؟", targetElement: toyElement, trackParent: false, disappearOnClick: true });
      }
    });
  } else {
    console.log("toy element ALREADY EXISTS:", toyElement, "ID:", toyElementId);
    deleteZone = document.getElementById('delete-zone');
    if (!deleteZone) {
      deleteZone = document.createElement('div');
      deleteZone.id = 'delete-zone';
      document.body.appendChild(deleteZone);
    }
  }


  // API Logic and zSpeak
  if (apiOption === "x") {
    let textToSpeak;
    if (Array.isArray(systemPrompt)) {
      const randomIndex = Math.floor(Math.random() * systemPrompt.length);
      textToSpeak = systemPrompt[randomIndex];
    } else {
      textToSpeak = systemPrompt; // Fallback to systemPrompt if userPrompt is not array and api is 'x'
    }

    console.log(`API option is 'x', using system prompt as zSpeak text for element ID: ${toyElementId}, Text: ${textToSpeak}`);
    currentZSpeakText = textToSpeak; // Store the text
    currentZSpeakInstance = zSpeak({ // Store the instance
      text: textToSpeak,
      targetElement: toyElement,
      trackParent: true,
      disappearOnClick: options.disappearOnClick,
      maxVisibleChars: 200,
      showMoreText: "عرض المزيد"
    });
  } else {
    const apiKeyToUseForCall = apiKeyToUse;
    if (!apiKeyToUseForCall) {
      console.log("No API key provided and API option is not 'x', showing API popup for element ID:", toyElementId);
      showApiKeyPopup();
      return;
    }

    callGeminiAPI(userPrompt, apiKeyToUseForCall, systemPrompt).then(responseText => {
      if (responseText !== null) {
        console.log("Gemini API call successful, using Gemini response for zSpeak for element ID:", toyElementId);
        currentZSpeakText = responseText; // Store the text
        currentZSpeakInstance = zSpeak({ // Store the instance
          text: responseText,
          targetElement: toyElement,
          trackParent: true,
          disappearOnClick: options.disappearOnClick,
          maxVisibleChars: 200,
          showMoreText: "Show more"
        });
      }
    }).catch(error => {
      if (error.message === 'API Key Issue') {
        console.log("Gemini API call failed due to API key issue, showing API popup for element ID:", toyElementId);
        zSpeak({
          text: "فيه مشكله في مفتاح الذكاء الصناعي..دوس هنا و حط واحد بداله",
          targetElement: toyElement,
          trackParent: true,
          disappearOnClick: options.disappearOnClick,
          borderColor: 'red',
          gradient: ['#ff0000'],
          maxVisibleChars: 200,
          showMoreText: "Show more"
        });
        showApiKeyPopup();
      } else {
        console.log("Gemini API call failed (not API key issue), showing error message in zSpeak for element ID:", toyElementId);
        zSpeak({
          text: `خطأ في التواصل مع الذكاء الاصطناعي: ${error.message}`,
          targetElement: toyElement,
          trackParent: true,
          disappearOnClick: options.disappearOnClick,
          borderColor: 'red',
          gradient: ['#ff0000'],
          maxVisibleChars: 200,
          showMoreText: "Show more"
        });
      }
    });
  }
}
// Example 1: Create a new toy with ID "toy-1", custom image, and system prompt directly (API "x")
// toy({
//   id: "toy-1",
//   api: "x", // api option as "x"
//   systemPrompt: "This is toy 1 speaking from system prompt with a custom image.",
//   userPrompt: "This user prompt will be ignored.", // Ignored when API is "x"
//   image: "URL_TO_YOUR_IMAGE_1.jpg" // Replace with your image URL
// });

// // Example 2: Create a new toy with ID "toy-2", another custom image, and use Gemini API
// toy({
//   id: "toy-2",
//   api: "YOUR_GEMINI_API_KEY", // api option as API Key
//   systemPrompt: "You are a helpful assistant for toy 2 with a different image.",
//   userPrompt: "What is the capital of Japan?",
//   image: "URL_TO_YOUR_IMAGE_2.png" // Replace with your image URL
// });

// // Example 3: Update the speech bubble of existing "toy-1" (image remains the same)
// toy({
//   id: "toy-1", // Use existing ID "toy-1"
//   api: "x",
//   systemPrompt: "Toy 1 with custom image says hello again!",
//   userPrompt: "Another ignored prompt."
//   // image parameter is not needed here, it will keep the original image
// });

// Example 4: Create another new toy "toy-3" with default image (if no image parameter is provided) and use stored API key
toy({
  id: "sheikh",
  api: "x", // api option as something other than "x"
  systemPrompt: [
    "السلام عليكم يا ابني...دا موقع للقران فيه خواص ذكاء اصطناعي و افكار جديدة تخليك تستمع بقرايه القران",
    "صلِّ قبل أن يصلى عليك.",
    "لو علمت كيف يدبر الله أمورك، لذاب قلبك من محبته.",
    "لا تحزن، فربما منعك الله شيئًا تحبه ليعطيك شيئًا أعظم مما تتخيل.",
    "اقرأ القرآن، فالقلب بلا قرآن كالصحراء بلا ماء.",
    "التوبة تجبّ ما قبلها، لا تيأس من رحمة الله.",
    "إذا كنت بعيدًا عن الله، اقترب، فلن تجد راحة إلا معه.",
    "صلاة الفجر حياة، لا تحرم نفسك منها.",
    "استغفر، فربك غفورٌ رحيم.",
    "اتق الله حيثما كنت، فالله أقرب إليك مما تتخيل.",
    "سارع بالأعمال الصالحة، فالموت يأتي فجأة.",
    "اذكر الله، فمن ذكر الله ذكره الله.",
    "كن قريبًا من القرآن، فهو نورٌ في الدنيا وشفيعٌ في الآخرة.",
    "إذا ضاقت بك الدنيا، فافتح المصحف.",
    "اللهم اجعلنا من الذاكرين الشاكرين.",
    "احفظ لسانك، فكلمة قد تهوي بك أو ترفعك.",
    "عامل الناس بأخلاقك، لا بأخلاقهم.",
    "كن صادقًا، فالصدق يهدي إلى البر.",
    "لا تنسَ الدعاء، فالدعاء يغير الأقدار.",
    "أحب الأعمال إلى الله أدومها وإن قلّ.",
    "الصدقة تطفئ غضب الرب، فلا تبخل.",
    "من ترك شيئًا لله، عوضه الله خيرًا منه.",
    "الدنيا دار عبور، فلا تجعلها دار قرار.",
    "عامل والديك برحمة، فدعاؤهما لك كنز.",
    "تحلَّ بالصبر، فالصبر مفتاح الفرج.",
    "احرص على النوافل، فهي طريق المحبة من الله.",
    "اجعل لنفسك خبيئة من الأعمال الصالحة لا يعلمها إلا الله.",
    "القرآن رفعةٌ لصاحبه، فأكثر من تلاوته.",
    "قل الحمد لله، فبالشكر تدوم النعم.",
    "صاحب الأخيار، فالصديق الصالح كنزٌ لا يُقدّر بثمن.",
    "احذر من الغيبة، فإنها تحبط الأعمال.",
    "إذا أردت رضا الله، فارضَ عنه في كل حال.",
    "حافظ على وضوئك، فإنه نورٌ لك في الدنيا والآخرة.",
    "من توكل على الله كفاه.",
    "لا تجعل قلبك متعلقًا بالدنيا، فهي فانية.",
    "أصلح نيتك، فإنما الأعمال بالنيات.",
    "ذكر الموت يرقق القلب، فلا تغفل عنه.",
    "العبادة في أوقات الفتن كالهجرة إلى رسول الله ﷺ.",
    "استشعر عظمة الله، فبها تحلو العبادة.",
    "لا تيأس من رحمة الله، فإنه أرحم بك من أمك."],
  userPrompt: ""
  // image parameter is omitted, it will use the default image URL
});
