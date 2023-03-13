import fs from 'fs'

let queryPage = async (n2m, pageId, pageName) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  const dir = './blog';

  //writing to folder
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  //writing to file
  fs.writeFile(`./${dir}/${pageName}`, mdString, (err) => {
    if (err)
        console.log(err);
  });
};

export { queryPage };