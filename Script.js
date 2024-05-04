// Function to convert timestamp to seconds
function timestampToSeconds(timestamp) {
    const parts = timestamp.split(":");
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return minutes * 60 + seconds;
}

// Function to check and adjust playback speed based on the provided timestamp
function checkAndAdjustPlaybackSpeed(video, targetTimestamp, playbackSpeed) {
    // Get the current time of the video in seconds
    const currentTimeInSeconds = Math.floor(video.currentTime);

    // Convert timestamp to seconds
    const targetTimestampInSeconds = timestampToSeconds(targetTimestamp);

    // If the current time is below the target timestamp, set playback speed to normal
    if (currentTimeInSeconds < targetTimestampInSeconds) {
        video.playbackRate = 1;
    } else {
        // Set the playback speed
        video.playbackRate = playbackSpeed;
    }
}

// Find the video element
const video = document.querySelector('video');

// If the video element exists
if (video) {
    // Prompt the user to enter the timestamp
    const targetTimestamp = prompt("Enter the timestamp (in mm:ss format) to change the playback speed:");

    // If the user provides a valid timestamp
    if (targetTimestamp !== null) {
        // Prompt the user to enter the desired playback speed
        const playbackSpeed = parseFloat(prompt("Enter the desired playback speed:"));

        // If the user provides a valid playback speed
        if (!isNaN(playbackSpeed)) {
            // Function to handle time updates
            function handleTimeUpdate() {
                checkAndAdjustPlaybackSpeed(video, targetTimestamp, playbackSpeed);
            }

            // Add event listener for 'timeupdate' event
            video.addEventListener('timeupdate', handleTimeUpdate);

            // Start checking and adjusting playback speed
            checkAndAdjustPlaybackSpeed(video, targetTimestamp, playbackSpeed);
        } else {
            console.log('Invalid playback speed entered.');
        }
    } else {
        console.log('Timestamp input cancelled.');
    }
} else {
    console.error('Video element not found.');
}
