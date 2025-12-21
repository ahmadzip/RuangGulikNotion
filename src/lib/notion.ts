import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_SECRET,
});


export interface Post {
    id: string;
    slug: string;
    title: string;
    date: string;
    authors: string[];
    summary: string;
    category: string;
    tags: string[];
    cover?: string;
}

export async function getPublishedPosts(): Promise<Post[]> {
    if (!process.env.NOTION_DATABASE_ID) return [];

    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: "Published",
            checkbox: {
                equals: true,
            },
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
    });

    return response.results.map((page: any) => {
        const props = page.properties;
        return {
            id: page.id,
            slug: props.Slug?.rich_text[0]?.plain_text || "",
            title: props.Name?.title[0]?.plain_text || "Untitled",
            date: props.Date?.date?.start || "",
            authors: props.Author?.people?.map((p: any) => p.name) || [],
            summary: props.Summary?.rich_text[0]?.plain_text || "",
            category: props.Category?.select?.name || "Uncategorized",
            tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
            cover: getCover(page),
        };
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!process.env.NOTION_DATABASE_ID) return null;

    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: "Slug",
                    rich_text: {
                        equals: slug,
                    },
                },
            ],
        },
    });

    if (!response.results.length) return null;

    const page: any = response.results[0];
    const props = page.properties;

    return {
        id: page.id,
        slug: props.Slug?.rich_text[0]?.plain_text || "",
        title: props.Name?.title[0]?.plain_text || "Untitled",
        date: props.Date?.date?.start || "",
        authors: props.Author?.people?.map((p: any) => p.name) || [],
        summary: props.Summary?.rich_text[0]?.plain_text || "",
        category: props.Category?.select?.name || "Uncategorized",
        tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
        cover: getCover(page),
    };
}

export async function getPostBlocks(id: string) {
    try {
        const blocks = await notion.blocks.children.list({
            block_id: id,
        });
        return blocks;
    } catch (error) {
        console.error("FAILED to get Notion blocks. Ensure the page is 'Shared to Web' in Notion.", error);
        return null;
    }
}

function getCover(page: any) {
    if (page.cover?.type === 'external') return page.cover.external.url;
    if (page.cover?.type === 'file') return page.cover.file.url;
    return null;
}
