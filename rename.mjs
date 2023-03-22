import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const dir = './src/pages/blog';

let filesArr = fs.readdirSync(dir);

filesArr.forEach((file, index) => {
    let fullPath = path.join(folderPath, file);
    let fileExtension = path.extname(file);
    let fileName = path.basename(file, fileExtension);

    try {
        const doc = yaml.load(fs.readFileSync(filePath, 'utf8'))
        console.log(doc);
    } catch (e) {
    console.error(e);
    }

    let newFileName = fileName + index + "." + fileExtension;
    try {
        fs.renameSync(fullPath, path.join(folderPath, newFileName));
    } catch (error) {
        console.error(error)
    }
})