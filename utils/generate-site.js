import fs from 'fs';

export const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // If err is true, reject promise
            if (err) {
                reject(err);
                return;
            }

            // Resolve the promise and send successful data
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

export const copyFile = (cssFileName) => {

    const sourcePath = `./src/${cssFileName}`;
    const destinationPath = `./dist/${cssFileName}`;
    
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // If err is true, reject promise
            if (err) {
                reject(err);
                return;
            }

            // Resolve the promise and copy the stylesheet
            resolve({
                ok: true,
                message: 'Stylesheet Created!'
            });
        });
        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    ok: true,
                    message: `${cssFileName} copied to /dist`,
                });
            }
        });
    });
};
