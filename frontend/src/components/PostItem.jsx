import blankpropic from '../assests/blankProfilePic.png'

const PostItem = ({ post }) => {
    const { fName, lName } = post.author;
    const capitalizedFName = fName.charAt(0).toUpperCase() + fName.slice(1);
    const capitalizedLName = lName.charAt(0).toUpperCase() + lName.slice(1);

    const postCreatedAt = post.createdAt; // Replace with your actual post creation time

const currentTime = new Date();
const createdAt = new Date(postCreatedAt);

// Calculate the difference in milliseconds
const timeDifference = currentTime - createdAt;

// Convert milliseconds to seconds, minutes, hours, and days
const seconds = Math.floor(timeDifference / 1000);
const minutes = Math.floor(seconds / 60);
const hours = Math.floor(minutes / 60);
const days = Math.floor(hours / 24);

// Create a function to format the time difference
function formatTimeAgo(time) {
  if (time < 60) {
    return time + "s";
  } else if (time < 60 * 60) {
    return Math.floor(time / 60) + "m";
  } else if (time < 60 * 60 * 24) {
    return Math.floor(time / (60 * 60)) + "h";
  } else {
    return Math.floor(time / (60 * 60 * 24)) + "d";
  }
}

// Format the time difference
const timeAgo = formatTimeAgo(seconds);
    return (
        <>
        <img src={post.author.photoUrl ? post.author.photoUrl : blankpropic} />
        <h2>{capitalizedFName} {capitalizedLName}</h2>
        <h3>{post.body}</h3>
        <h4>{timeAgo}</h4>
        </>
    );
};

export default PostItem;