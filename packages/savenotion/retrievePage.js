let retrievePage = async (notion, pageId) => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
};

export { retrievePage };