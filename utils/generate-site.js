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

export const copyFile = () => {
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
    });
};
