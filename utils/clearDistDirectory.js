// import fs
import fs from 'fs';

// Remove the files inside /dist directory
export const clearDistDirectory = () => {
    // define dist
    const distPath = './dist';

    try {
        // Using Node.js readdirSync() to read through the directory files 
        const files = fs.readdirSync(distPath)

        if (files.length > 0) {
            // For each item in the list, loop through and delete.
            files.forEach((file) => {
                const filePath = `${distPath}/${file}`;

                // Check if the path points to a file. Using fs.statSync to get file status information. isFile() is checking if it's indeed a file.
                if (fs.statSync(filePath).isFile()) {
                    // Use unlinkSync to remove the filePath.
                    fs.unlinkSync(filePath);
                }
            });

            console.log('Files inside the /dist directory have been cleared!');
        } else {
            console.log('No files were found inside /dist directory. Nothing to clear.');
        }
    } 
    catch (err) 
    {
        console.log('There was an error clearing the files!');
    }
};