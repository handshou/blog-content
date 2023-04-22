import * as dotenv from 'dotenv';
dotenv.config()
import { NotionToMarkdown } from "notion-to-md";
import { queryDatabase } from '../packages/savenotion/queryDatabase.js';
import { queryPage } from '../packages/savenotion/queryPage.js';
import { retrievePage } from '../packages/savenotion/retrievePage.js';
import { Client } from '@notionhq/client';

class SaveNotion {
    constructor(DATABASE_ID) {
        const notion = new Client({
            auth: process.env.NOTION_TOKEN,
          });
        const n2m = new NotionToMarkdown({ notionClient: notion });
        this.n2m = n2m;
        this.notion = notion;
        this.DATABASE_ID = DATABASE_ID;
    }
}

SaveNotion.prototype.fetchDatabase = function() {
    return queryDatabase(this.notion, this.DATABASE_ID);
}

SaveNotion.prototype.fetchPage = function(pageId, pageName) {
    return queryPage(this.n2m, pageId, pageName);
}

SaveNotion.prototype.retrievePageTitle = function(pageId) {
    const fetchPage = Promise.resolve(retrievePage(this.notion, pageId));
    return fetchPage.then(response => {
        const { properties } = response;
        if(properties.Post)
            return `${properties.Post.title[0]["plain_text"]
                    .replace(/\s+/g, '-').toLowerCase()}.mdx`;
        else
            return `${pageId}.mdx`;
    })
}

const sn = new SaveNotion(process.env.NOTION_DATABASE_ID);

for(let pageId of await sn.fetchDatabase()) {
    const pageName = await sn.retrievePageTitle(pageId);
    sn.fetchPage(pageId, pageName);
}
