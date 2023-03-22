import { promises as fs } from 'fs'
import yaml from 'js-yaml'

let queryPage = async (n2m, pageId, pageName) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  const dir = './blog';

  //writing to folder
  if (!fs.existsSync(dir)){
    await fs.mkdirSync(dir);
  }

  const filePath = `./${dir}/${pageName}`

  //writing to file
  fs.writeFile(filePath, mdString, (err) => {
    if (err)
        console.log(err);
  }).then(async () => {
    try {
      const doc = yaml.load(await fs.readFileSync(filePath, 'utf8'))
      console.log(doc);
    } catch (e) {
      console.error(e);
    }
  });


};

export { queryPage };