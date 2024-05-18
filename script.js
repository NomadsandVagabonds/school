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
  'videos/scene3B.mp4': 3
};

function startAdventure() {
  titleScreen.style.display = 'none';
  container.style.display = 'block';
  videoSource.src = 'videos/scene0.mp4';
  videoPlayer.load();
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
      <button onclick="choosePath('videos/scene2C.mp4')">Destroy the alarm clock</button>
    `;
  } else if (video === 'videos/scene2B.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/go2B.mp4')">Snooze again</button>
      <button onclick="choosePath('videos/scene2D.mp4')">Reluctantly get up</button>
    `;
  } else if (video === 'videos/scene2D.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'prom')">Ask out the crush to prom</button>
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'test')">Ace the physics test</button>
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'coolKids')">Get invited to sit with the cool kids at lunch</button>
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'ritual')">Save the town from the dark ritual</button>
      <button onclick="choosePath('videos/scene3.mp4', 'goal', 'chaos')">Embrace the chaos</button>
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
  } else if (currentVideo === 'videos/scene2D.mp4') {
    videoSource.src = 'videos/scene3.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/go2B.mp4') {
    showRebirthButton(); // Show rebirth button for game over
  } else if (currentVideo === 'videos/scene3.mp4') {
    showChoices('videos/scene3.mp4'); // Show choices for Scene 3 when the video ends
  } else if (currentVideo === 'videos/scene3A.mp4' || currentVideo === 'videos/scene3B.mp4') {
    videoSource.src = 'videos/scene4.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene3C.mp4') {
    showChoices('videos/scene3C.mp4'); // Show choices for Scene 3C when the video ends
  } else if (currentVideo === 'videos/go3C.mp4') {
    showRebirthButton(); // Show rebirth button for game over
  }

  // Check if the video is a game over video
  if (currentVideo.startsWith('videos/go')) {
    showRebirthButton(); // Show the rebirth button for game over videos
  }
});
