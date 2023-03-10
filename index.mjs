import * as dotenv from 'dotenv';
dotenv.config()
import { NotionToMarkdown } from "notion-to-md";
import { queryDatabase } from './queryDatabase.js';
import { queryPage } from './queryPage.js';
import { Client } from '@notionhq/client';

class SaveNotion {
    constructor(DATABASE_ID) {
        const notion = new Client({
            auth: process.env.NOTION_API_KEY,
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

SaveNotion.prototype.fetchPage = function(name) {
    return queryPage(this.n2m, name);
}

const sn = new SaveNotion(process.env.DATABASE_ID);

for(let pageId of await sn.fetchDatabase()) {
    sn.fetchPage(`${pageId}.md`);
}