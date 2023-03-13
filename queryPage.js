import fs from 'fs'

let queryPage = async (n2m, pageId, pageName) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  //writing to file
  fs.writeFile(pageName, mdString, (err) => {
    if (err)
        console.log(err);
  });
};

export { queryPage };