// import fs
import fs from 'fs';

// Remove the files inside /dist directory
export const clearDistDirectory = () => {
    // define dist
    const distPath = './dist';

    try {
        // Using Node.js readdirSync() to read through the directory files 
        const files = fs.readdirSync(distPath)

        console.log(files);
    
        // loop through the list and delete each ile

        // log results

    } catch (err) {
        console.log('There was an error clearing the files!');
    }
};