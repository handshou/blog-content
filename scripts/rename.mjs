import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const args = process.argv.slice(2);

const folderPath = './src/pages/' + args[0];

let filesArr = fs.readdirSync(folderPath);

filesArr.forEach((file, index) => {
    let fullPath = path.join(folderPath, file);
    let fileExtension = path.extname(file);
    // let fileName = path.basename(file, fileExtension);

    // do not need to parse backup files
    if (String(fileExtension).includes(".bak"))
        return;
    console.log({fullPath, fileExtension, folderPath, file})
    try {
        const doc = yaml.load(fs.readFileSync(fullPath, 'utf8'))
        console.log(doc);
        let newFileName = doc.slug + fileExtension;
        fs.renameSync(fullPath, path.join(folderPath, newFileName));
    } catch (e) {
        console.error(e);
    }
})
