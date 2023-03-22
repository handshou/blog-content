import { promises as fsp } from 'fs'
import fs from 'fs'
import yaml from 'js-yaml'

let queryPage = async (n2m, pageId, pageName) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  const dir = './blog';

  //writing to folder
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const filePath = `./${dir}/${pageName}`

  //writing to file
  fsp.writeFile(filePath, mdString, (err) => {
    if (err)
        console.log(err);
  }).then(() => {
    try {
      const doc = yaml.load(fs.readFileSync(filePath, 'utf8'))
      console.log(doc);
    } catch (e) {
      console.error(e);
    }
  });


};

export { queryPage };