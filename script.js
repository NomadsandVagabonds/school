var videoPlayer = document.getElementById('videoPlayer');
var choices = document.getElementById('choices');
var videoSource = document.getElementById('videoSource');
var container = document.getElementById('container');
var titleScreen = document.getElementById('titleScreen');

// Dictionary to store choice times for each video
var choiceTimes = {
  'videos/scene1.mp4': 3,
  'videos/scene2B.mp4': 3,
  'videos/scene2C.mp4': 3,
  'videos/scene2D.mp4': 3,
  'videos/scene3A.mp4': 3,
  'videos/scene3B.mp4': 3,
  'videos/scene3C.mp4': 3
};

// Flag to check if choices have been displayed
var choicesDisplayed = false;

function startAdventure() {
  titleScreen.style.display = 'none';
  container.style.display = 'block';
  videoPlayer.play();
}

videoPlayer.addEventListener('timeupdate', function() {
  var currentVideo = videoSource.getAttribute('src');
  if (currentVideo in choiceTimes && !choicesDisplayed && videoPlayer.currentTime >= choiceTimes[currentVideo]) {
    showChoices(currentVideo); // Show choices for the current video
    choicesDisplayed = true; // Set flag to true to prevent multiple displays
  }
});

function showChoices(video) {
  clearChoices();
  choices.style.display = 'flex'; // Show choices bar

  if (video === 'videos/scene1.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene2A.mp4')">Get up immediately</button>
      <button onclick="choosePath('videos/scene2B.mp4')">Snooze the alarm</button>
      <button onclick="choosePath('videos/scene2C.mp4')">Destroy the alarm clock</button>
    `;
  } else if (video === 'videos/scene2D.mp4') {
    choices.innerHTML = `
      <button onclick="choosePath('videos/scene3A.mp4')">Ask out the crush to prom</button>
      <button onclick="choosePath('videos/scene3A.mp4')">Ace the physics test</button>
      <button onclick="choosePath('videos/scene3A.mp4')">Get invited to sit with the cool kids at lunch</button>
      <button onclick="choosePath('videos/scene3A.mp4')">Save the town from the dark ritual</button>
      <button onclick="choosePath('videos/scene3A.mp4')">Embrace the chaos</button>
    `;
  }
}

function clearChoices() {
  choices.innerHTML = '';
  choices.style.display = 'none'; // Hide choices bar
}

function choosePath(videoFile) {
  clearChoices();
  choicesDisplayed = false; // Reset flag for the next video
  videoSource.src = videoFile;
  videoPlayer.load(); // Load the new video
  videoPlayer.play();
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
    videoSource.src = 'videos/go2B.mp4';
    videoPlayer.load();
    videoPlayer.play();
  } else if (currentVideo === 'videos/scene3A.mp4') {
    // Add choices for Scene 3A here
  } else if (currentVideo === 'videos/scene3B.mp4') {
    // Add choices for Scene 3B here
  } else if (currentVideo === 'videos/scene3C.mp4') {
    videoSource.src = 'videos/go3C.mp4';
    videoPlayer.load();
    videoPlayer.play();
  }
});
