var videoPlayer = document.getElementById('videoPlayer');
var choices = document.getElementById('choices');
var videoSource = document.getElementById('videoSource');
var container = document.getElementById('container');
var titleScreen = document.getElementById('titleScreen');
var rebirthButton = document.createElement('button');
var choicesDisplayed = false;

// Dictionary to store choice times for each video
var choiceTimes = {
  'videos/scene1.mp4': 3,
  'videos/scene2B.mp4': 3,
  'videos/scene2C.mp4': 3,
  'videos/scene2D.mp4': 3,
  'videos/scene3.mp4': 3,
  'videos/scene3C.mp4': 3,
  'videos/scene3A.mp4': 3,
  'videos/scene3B.mp4': 3,
  'videos/scene4.mp4': 3,
  'videos/scene_principal.mp4': 3,
  'videos/scene_chemistry.mp4': 3,
  'videos/scene_chemistry_test.mp4': 3,
  'videos/scene_library.mp4': 3,
  'videos/scene_library_nerds.mp4': 3,
  'videos/scene_library_ritual.mp4': 3,
  'videos/scene_library_evil.mp4': 3,
  'videos/scene_dumpsters.mp4': 3,
  'videos/scene_dumpsters_cool.mp4': 3,
  'videos/scene_dumpsters_cool2.mp4': 3
  
};

function updateStateDisplay() {
  const stateDisplay = document.getElementById('stateDisplay');
  const drugs = sessionStorage.getItem('drugs');
  const study = sessionStorage.getItem('study');
  const plot = sessionStorage.getItem('plot');
  const nerds = sessionStorage.getItem('nerds');
  const location = sessionStorage.getItem('location');
  const knowledge = sessionStorage.getItem('knowledge');
  const help = sessionStorage.getItem('help');
  const hand = sessionStorage.getItem('hand');
  const breakfast = sessionStorage.getItem('breakfast');
  const cool = sessionStorage.getItem('cool');
  const popularity = sessionStorage.getItem('popularity');
  const evil = sessionStorage.getItem('evil')

  stateDisplay.innerHTML = `
    <p>Drugs: ${drugs}</p>
    <p>Plot: ${plot}</p>
    <p>Nerds: ${nerds}</p>
    <p>Study: ${study}</p>
    <p>Location: ${location}</p>
    <p>Knowledge: ${knowledge}</p>
    <p>Help: ${help}</p>
    <p>Hand: ${hand}</p>
    <p>Breakfast: ${breakfast}</p>
    <p>Cool: ${cool}</p>
    <p>Popularity: ${popularity}</p>
    <p>Evil: ${evil}</p>
  `;
}

function startAdventure() {
  titleScreen.style.display = 'none';
  container.style.display = 'block';
  videoSource.src = 'videos/scene0.mp4';
  videoPlayer.load();
  videoPlayer.play();
  // Initialize or reset the states
  sessionStorage.setItem('drugs', 'false');
  sessionStorage.setItem('plot', 'false');
  sessionStorage.setItem('nerds', 'false');
  sessionStorage.setItem('study', 'false');
  sessionStorage.setItem('location', 'false');
  sessionStorage.setItem('knowledge', 'false');
  sessionStorage.setItem('help', 'false');
  sessionStorage.setItem('hand', 'false');
  sessionStorage.setItem('breakfast', 'false');
  sessionStorage.setItem('cool', 'false');
  sessionStorage.setItem('popularity', '0');
  sessionStorage.setItem('evil', 'false');
  updateStateDisplay(); // Call this function to update the state display
}

function choosePath(videoFile, choiceKey = '', choiceValue = '') {
  clearChoices();
  choicesDisplayed = false; // Reset flag for the next video

  if (choiceKey && choiceValue) {
    sessionStorage.setItem(choiceKey, choiceValue); // Store the choice in session storage
  }
  // Set Drugs state to true if making drugs
  if (videoFile === 'videos/scene_chemistry_drugs.mp4') {
    sessionStorage.setItem('drugs', 'true');
  }

  updateStateDisplay(); // Call this function to update the state display

  videoSource.src = videoFile;
  videoPlayer.load(); // Load the new video
  videoPlayer.play();
}

videoPlayer.addEventListener('timeupdate', function() {
  var currentVideo = videoSource.getAttribute('src');
  if (currentVideo in choiceTimes && !choicesDisplayed && videoPlayer.currentTime >= choiceTimes[currentVideo]) {
    showChoices(currentVideo);
    choicesDisplayed = true;
  }
});

function showChoices(video) {
  clearChoices();
  choices.style.display = 'flex';

  if (video === 'videos/scene1.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene2A.mp4')">Get up immediately</button>
      <button onclick="choosePath('videos/scene2B.mp4')">Snooze the alarm</button>
      <button onclick="sessionStorage.setItem('hand', 'true'); updateStateDisplay(); choosePath('videos/scene2C.mp4')">Destroy the alarm clock</button>
    `;
  } else if (video === 'videos/scene2B.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/go2B.mp4')">Snooze again</button>
      <button onclick="choosePath('videos/scene2D.mp4')">Reluctantly get up</button>
    `;
  } else if (video === 'videos/scene2D.mp4') {
    choices.innerHTML = `
    <button onclick="sessionStorage.setItem('breakfast', 'true'); updateStateDisplay(); choosePath('videos/scene3.mp4')">Eat Breakfast</button>
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'test')">Skip and Go to School</button>
    `;
  } else if (video === 'videos/scene3.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene3A.mp4')">Enter the School Normally</button>
      <button onclick="choosePath('videos/scene3B.mp4')">Make an Impression</button>
      <button onclick="choosePath('videos/scene3C.mp4')">Turn Back</button>
    `;
  } else if (video === 'videos/scene3C.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene4.mp4')">Go back to school</button>
      <button onclick="choosePath('videos/go3C.mp4')">Commit to your choice</button>
    `;
  } else if (video === 'videos/scene4.mp4') {
    let prankButtonLabel = 'Do a Prank';
    let prankButtonAction = 'videos/scene_prank1.mp4';
    if (sessionStorage.getItem('prank1Done')) {
      prankButtonLabel = 'Do Another Prank';
      prankButtonAction = 'videos/scene_prank2.mp4';
    }
    if (sessionStorage.getItem('prank2Done')) {
      prankButtonLabel = 'Do Another Prank';
      prankButtonAction = 'videos/go_prank.mp4';
    }
  
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene_chemistry.mp4')">Chemistry Class</button>
      <button onclick="choosePath('videos/scene_library.mp4')">The Library</button>
      <button onclick="choosePath('videos/scene_dumpsters.mp4')">The Dumpsters</button>
    `;
  
    if (sessionStorage.getItem('location') === 'true') {
      choices.innerHTML += `
        <button onclick="choosePath('videos/scene_teachers_lounge.mp4')">The Teachers Lounge</button>
      `;
    } else {
      choices.innerHTML += `
        <button onclick="choosePath('${prankButtonAction}', 'prank', '${prankButtonLabel}')">${prankButtonLabel}</button>
      `;
    }
  } else if (video === 'videos/scene_chemistry.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene_chemistry_test.mp4')">Take the Exam</button>
      <button onclick="sessionStorage.setItem('drugs', 'true'); updateStateDisplay(); choosePath('videos/scene_chemistry_drugs.mp4')">Make drugs</button>
      <button onclick="choosePath('videos/scene_chemistry_bomb.mp4')">Make a bomb</button>
      <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
    `;
  } else if (video === 'videos/scene_chemistry_test.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene_chemistry_cheat.mp4')">Let Them Cheat</button>
      <button onclick="choosePath('videos/scene_chemistry_nocheat.mp4')">Tell Them No</button>
    `;
  } else if (video === 'videos/scene_library.mp4') {
    choices.innerHTML = `
      <button onclick="sessionStorage.setItem('study', 'true'); updateStateDisplay(); choosePath('videos/scene_library_study.mp4')">Study for the Test</button>
      <button onclick="choosePath('videos/scene_library_nerds.mp4')">Talk to the Nerds</button>
      <button onclick="choosePath('videos/scene_library_fort.mp4')">Build a Book Fort</button>
      <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
    `;
  } else if (video === 'videos/scene_library_nerds.mp4') {
      let nerdsOptions = `
        <button onclick="sessionStorage.setItem('popularity', (parseInt(sessionStorage.getItem('popularity')) + 1).toString()); sessionStorage.setItem('nerds', 'true'); updateStateDisplay(); choosePath('videos/scene_library_fun.mp4')">Make Fun of Them</button>
        <button onclick="choosePath('videos/scene_library.mp4')">Leave</button>
    `;
      if (sessionStorage.getItem('knowledge') === 'true' && sessionStorage.getItem('nerds') === 'false'  && sessionStorage.getItem('plot') === 'false') {
        nerdsOptions += `
          <button onclick="choosePath('videos/scene_library_ritual.mp4')">Ask About Summoning Rituals</button>
        `;
      }
      choices.innerHTML = nerdsOptions;
  } else if (video === 'videos/scene_library_ritual.mp4') {
      choices.innerHTML = `
        <button onclick="sessionStorage.setItem('plot', 'true'); updateStateDisplay(); choosePath('videos/scene_library_good.mp4')">How to Stop the Ritual</button>
        <button onclick="sessionStorage.setItem('evil', 'true'); sessionStorage.setItem('plot', 'true'); updateStateDisplay(); choosePath('videos/scene_library_evil.mp4')">How to Complete the Ritual</button>
    `;
  } else if (video === 'videos/scene_library_evil.mp4') {
      choices.innerHTML = `
        <button onclick="sessionStorage.setItem('help', 'true'); updateStateDisplay(); choosePath('videos/scene_library_evil_help.mp4')">Ask them for help</button>
        <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
    `;
  } else if (video === 'videos/scene_principal.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene_principal1.mp4')">Apologize</button>
      <button onclick="choosePath('videos/go_prank.mp4')">Shave his Mustache</button>
    `;
    if (sessionStorage.getItem('knowledge') === 'true' && sessionStorage.getItem('location') === 'false') {
      choices.innerHTML += `
        <button onclick="sessionStorage.setItem('location', 'true'); updateStateDisplay(); choosePath('videos/scene_principal_clues.mp4')">Look for Clues</button>
      `;
    }
  } else if (video === 'videos/scene_dumpsters.mp4') {
    choices.innerHTML = `
      <button onclick="sessionStorage.setItem('knowledge', 'true'); updateStateDisplay(); choosePath('videos/scene_dumpsters_snoop.mp4')">Snoop on the Principal</button>
      <button onclick="choosePath('videos/scene_dumpsters_cool.mp4')">Talk to the Cool Kids</button>
      <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
    `;
  } else if (video === 'videos/scene_dumpsters_cool.mp4') {
    let drugsState = sessionStorage.getItem('drugs');
    let coolState = sessionStorage.getItem('cool');
    let helpState = sessionStorage.getItem('help');
    choices.innerHTML = `
    <button onclick="sessionStorage.getItem('cool') === 'true' ? choosePath('videos/scene_dumpsters_cool2.mp4') : choosePath('videos/scene_dumpsters_uncool.mp4')">Talk to Them</button>
    <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
  `;
  
    if (coolState !== 'true') {
      choices.innerHTML += `
        <button onclick="choosePath('videos/scene_dumpsters_trick.mp4')">Impress them with a trick</button>
      `;
      if (drugsState === 'true' && coolState === 'false') {
        const offerDrugsVideo = helpState === 'true' ? 'videos/scene_dumpsters_trap.mp4' : 'videos/scene_dumpsters_drugs.mp4';
        choices.innerHTML += `
          <button onclick="sessionStorage.setItem('cool', 'true'); updateStateDisplay(); choosePath('${offerDrugsVideo}')">Offer them Drugs</button>
        `;
      }
    }
  } else if (video === 'videos/scene_dumpsters_cool2.mp4') {
    let knowledgeState = sessionStorage.getItem('knowledge');
    choices.innerHTML = '';
    
    if (knowledgeState === 'true') {
        choices.innerHTML += `
          <button onclick="sessionStorage.setItem('help', 'true'); updateStateDisplay(); choosePath('videos/scene_dumpsters_help.mp4')">Ask for Help</button>
        `;
    }
    
    choices.innerHTML += `
      <button onclick="choosePath('videos/scene4.mp4')">Leave</button>
    `;
  } else if (video === 'videos/scene_teachers_lounge.mp4') {
    let enterChoice = '';
    if (sessionStorage.getItem('plot') === 'false') {
      enterChoice = 'choosePath(\'videos/go_noplan.mp4\')';
    } else if (sessionStorage.getItem('plot') === 'true' && sessionStorage.getItem('help') === 'false') {
      enterChoice = 'choosePath(\'videos/go_nohelp.mp4\')';
    } else if (sessionStorage.getItem('help') === 'true') {
      if (sessionStorage.getItem('evil') === 'true') {
        enterChoice = 'choosePath(\'videos/ending_evil.mp4\')';
      } else if (sessionStorage.getItem('evil') === 'false') {
        enterChoice = 'choosePath(\'videos/scene_finale_good.mp4\')';
      }
    }
  
    choices.innerHTML = `
      <button onclick="${enterChoice}">Enter</button>
      <button onclick="choosePath('videos/scene4.mp4')">I Need More Time to Prepare</button>
      <button onclick="(parseInt(sessionStorage.getItem('popularity')) === 3) ? choosePath('videos/ending_pop.mp4') : choosePath('videos/go_unpop.mp4')">This is not my problem, I just want to be popular</button>
    `;
  } 
}

function clearChoices() {
  choices.innerHTML = '';
  choices.style.display = 'none'; // Hide choices bar
}

function choosePath(videoFile, choiceKey = '', choiceValue = '') {
  clearChoices();
  choicesDisplayed = false; // Reset flag for the next video

  if (choiceKey && choiceValue) {
    sessionStorage.setItem(choiceKey, choiceValue); // Store the choice in session storage
  }
 // Set Drugs state to true if making drugs
 if (videoFile === 'videos/scene_chemistry_drugs.mp4') {
  sessionStorage.setItem('drugs', 'true');
}
  videoSource.src = videoFile;
  videoPlayer.load(); // Load the new video
  videoPlayer.play();
}

function showRebirthButton() {
  rebirthButton.innerText = 'Rebirth';
  rebirthButton.classList.add('rebirth'); // Add the rebirth class for styling
  rebirthButton.onclick = startAdventure;
  clearChoices();
  choices.appendChild(rebirthButton);
  choices.style.display = 'flex';
}

videoPlayer.addEventListener('loadeddata', function() {
  var currentVideo = videoSource.getAttribute('src');
  clearChoices(); // Ensure choices are hidden for non-choice videos
  choicesDisplayed = false; // Reset flag when a new video is loaded
});

videoPlayer.addEventListener('ended', function() {
  var currentVideo = videoSource.getAttribute('src');
  // Do not clear choices at the end of videos, they will be cleared at the start of the new video
  if (currentVideo === 'videos/scene0.mp4') {
    videoSource.src = 'videos/scene1.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene2A.mp4') {
    videoSource.src = 'videos/scene2D.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene2B.mp4') {
    showChoices('videos/scene2B.mp4'); // Show choices for Scene 2B when the video ends
  } else if (currentVideo === 'videos/scene2C.mp4') {
    videoSource.src = 'videos/scene2D.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/go2B.mp4') {
    showRebirthButton(); // Show rebirth button for game over
  } else if (currentVideo === 'videos/scene3.mp4') {
    showChoices('videos/scene3.mp4'); // Show choices for Scene 3 when the video ends
  } else if (currentVideo === 'videos/scene3A.mp4' || currentVideo === 'videos/scene3B.mp4' || currentVideo === 'videos/scene_prank1.mp4' || currentVideo === 'videos/scene_prank2.mp4') {
    videoSource.src = 'videos/scene4.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene3C.mp4') {
    showChoices('videos/scene3C.mp4'); // Show choices for Scene 3C when the video ends
  } else if (currentVideo === 'videos/go3C.mp4') {
    showRebirthButton(); // Show rebirth button for game over
  } else if (currentVideo === 'videos/scene4.mp4') {
    showChoices('videos/scene4.mp4'); // Show choices for Scene 4 when the video ends
  } else if (currentVideo === 'videos/scene_principal1.mp4') {
    videoSource.src = 'videos/scene4.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_chemistry_bomb.mp4') {
    videoSource.src = 'videos/go_fbi.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_chemistry_cheat.mp4' || currentVideo === 'videos/scene_chemistry_nocheat.mp4') {
    videoSource.src = 'videos/scene_chemistry_testoverp.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_chemistry_testoverp.mp4' || currentVideo === 'videos/scene_chemistry_drugs.mp4') {
    videoSource.src = 'videos/scene_chemistry.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_library_study.mp4' || 
    currentVideo === 'videos/scene_library_fort.mp4' || currentVideo === 'videos/scene_library_fun.mp4') {
    videoSource.src = 'videos/scene_library.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_dumpsters_snoop.mp4') {
    videoSource.src = 'videos/scene_dumpsters.mp4';
    videoPlayer.load();
  videoPlayer.play();
  } else if (currentVideo === 'videos/scene_dumpsters_uncool.mp4' || currentVideo === 'videos/scene_dumpsters_trick.mp4') {
    videoSource.src = 'videos/go_dumpsters.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_dumpsters_drugs.mp4') {
    videoSource.src = 'videos/scene_dumpsters_cool.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_teachers_lounge.mp4') {
    showChoices('videos/scene_teachers_lounge.mp4');
  } else if (currentVideo === 'videos/scene_library_good.mp4' || currentVideo === 'videos/scene_library_evil_help.mp4' || currentVideo === 'videos/scene_principal_clues.mp4' || currentVideo === 'videos/scene_dumpsters_help.mp4') {
    videoSource.src = 'videos/scene4.mp4';
    videoPlayer.load();
    videoPlayer.play();
}

  // Check if the video is a game over video
  if (currentVideo.startsWith('videos/go')) {
    showRebirthButton(); // Show the rebirth button for game over videos
  }

  // Track pranks
  if (currentVideo === 'videos/scene_prank1.mp4') {
    sessionStorage.setItem('prank1Done', true);
    videoSource.src = 'videos/scene_principal.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene_prank2.mp4') {
    sessionStorage.setItem('prank2Done', true);
    videoSource.src = 'videos/scene_principal.mp4';
    videoPlayer.load();
    videoPlayer.play();
  }
});
