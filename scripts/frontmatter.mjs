import fs from 'fs'

const args = process.argv.slice(2);
const folderPath = args[0];
//const fileName = args[1];

let fileData = ''
let linesToRemoveStack = []
let delimiterCodeCount = 0
let delimiterCode = '```'

const removeLines = (data, lines = []) => {
    return data
        .split('\n')
        .filter((_val, idx) => lines.indexOf(idx) === -1)
        .join('\n')
}

let isBeforeFirstCodeBlock = (delimiterCodeCount) =>
    delimiterCodeCount === 0

let isAtFirstCodeBlock = (delimiterCodeCount) =>
    delimiterCodeCount === 1 || delimiterCodeCount === 2

let isPastFirstCodeBlock = (delimiterCodeCount) =>
    delimiterCodeCount > 2

let parseFrontMatter = (file) => fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err

    fileData = data.split('\n')
    fileData.map((line, index) => {
        let isDelimiterCode = line.startsWith(delimiterCode)
        if (isDelimiterCode) delimiterCodeCount += 1

        if (isBeforeFirstCodeBlock(delimiterCodeCount)) {
            linesToRemoveStack.push(index)
            return
        }

        // Remove empty lines before first code block ends
        if (isPastFirstCodeBlock(delimiterCodeCount)) return
        if (line.length === 0 && delimiterCodeCount < 2)
            linesToRemoveStack.push(index)

        // Remove delimiter lines
        if (isAtFirstCodeBlock(delimiterCodeCount)) {
            if (isDelimiterCode) {
                linesToRemoveStack.push(index)
            }
            return
        }
    })

    fs.writeFile(
        file,
        removeLines(data, linesToRemoveStack),
        'utf8',
        function(err) {
            if (err) throw err
        }
    )
})

let dir = './' + folderPath
fs.readdir(dir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
        parseFrontMatter(`${dir}/${file}`);
    });
});
