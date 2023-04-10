let queryDatabase = async (notion, databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
        property: "Tags",
        multi_select: {
            contains: "published"
        }
    },
  });
  return response.results.map(res => {
    if(res.object === "page") return res.id;
  });
};

export { queryDatabase };