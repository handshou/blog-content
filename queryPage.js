import fs from 'fs'

let queryPage = async (n2m, name) => {
  const mdblocks = await n2m.pageToMarkdown("4948bba6-4efa-4981-859e-db06948041ca");
  const mdString = n2m.toMarkdownString(mdblocks);

  //writing to file
  fs.writeFile(name, mdString, (err) => {
    if (err)
        console.log(err);
  });
};

export { queryPage };