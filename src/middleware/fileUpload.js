const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine the file type and set the destination accordingly
        const fileType = file.mimetype.split('/')[0];
        let dest = 'root/';
        if (fileType === 'image') {
            dest += 'picture';
        } else if (fileType === 'video') {
            dest += 'video';
        } else {
            // If the file is not an image or video, you might want to handle it differently
            // For this setup, we'll default to an 'others' directory
            dest += 'others';
        }
        cb(null, path.join(__dirname, '../../', dest));
    },
    filename: (req, file, cb) => {
        // Use the original filename, but you could also add a timestamp or generate a new name entirely
        cb(null, Date.now() + path.extname(file.originalname)); // Appending the timestamp to make the filename unique
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // For 10MB limit
    fileFilter: (req, file, cb) => {
        // Accept images and videos only
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'), false);
        }
    }
});

module.exports = upload;
