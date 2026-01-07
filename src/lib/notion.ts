import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockWithChildren, Post } from "@/types/notion";
import { cache } from 'react';

export const notion = new Client({
    auth: process.env.NOTION_SECRET,
    timeoutMs: 60000,
    notionVersion: "2022-06-28",
});

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
    if (!process.env.NOTION_DATABASE_ID) return [];

    let results: any[] = [];
    let hasMore = true;
    let cursor: string | undefined = undefined;

    try {
        while (hasMore) {
            const response: any = await notion.databases.query({
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
                start_cursor: cursor,
                page_size: 100,
            });

            results = [...results, ...response.results];
            hasMore = response.has_more;
            cursor = response.next_cursor;
        }
    } catch (error: any) {
        if (error.code === 'validation_error' && error.message.includes('multiple data sources')) {
            console.error("CRITICAL ERROR: The provided NOTION_DATABASE_ID points to a Database View with multiple sources (e.g. a combined view). The Notion API does NOT support this. Please use the ID of the original, single source Database.");
            throw new Error("Invalid Database ID: Multiple data sources not supported.");
        }
        throw error;
    }

    return results.map((page: any) => {
        const props = page.properties;
        const title = props.Name?.title[0]?.plain_text || "Untitled";
        return {
            id: page.id,
            slug: slugify(title),
            title: title,
            date: props.Date?.date?.start || "",
            authors: props.Author?.people?.map((p: any) => p.name) || [],
            summary: props.Summary?.rich_text[0]?.plain_text || "",
            category: props.Category?.select?.name || "Uncategorized",
            tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
            cover: getCover(page),
        };
    });
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
    const posts = await getPublishedPosts();
    return posts.find(p => p.slug === slug) || null;
});

export const getPostsByCategory = cache(async (category: string): Promise<Post[]> => {
    const posts = await getPublishedPosts();
    return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
});

export const getPostsByTag = cache(async (tag: string): Promise<Post[]> => {
    const posts = await getPublishedPosts();
    return posts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
});

export const getPostsBySearch = cache(async (query: string): Promise<Post[]> => {
    const posts = await getPublishedPosts();
    const lowerQuery = query.toLowerCase();
    return posts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.summary.toLowerCase().includes(lowerQuery)
    );
});

export const getPostBlocks = cache(async (id: string): Promise<ListBlockChildrenResponse & { results: BlockWithChildren[] } | null> => {
    try {
        const blocks = await notion.blocks.children.list({
            block_id: id,
        });

        // Recursively fetch children for blocks that have them
        const blocksWithChildren = await Promise.all(blocks.results.map(async (block) => {
            if ('has_children' in block && block.has_children) {
                const children = await getPostBlocks(block.id);
                // If children is null (error), we just don't attach it or attach undefined
                if (children) {
                    return { ...block, children };
                }
            }
            return block;
        }));

        return { ...blocks, results: blocksWithChildren as BlockWithChildren[] };
    } catch (error) {
        console.error("FAILED to get Notion blocks. Ensure the page is 'Shared to Web' in Notion.", error);
        return null;
    }
});

function getCover(page: any) {
    const props = page.properties;
    // Check for "Cover" property (Files & Media)
    if (props.Cover?.files?.length > 0) {
        const file = props.Cover.files[0];
        return file.type === 'external' ? file.external.url : file.file.url;
    }
    // Fallback to page cover
    if (page.cover?.type === 'external') return page.cover.external.url;
    if (page.cover?.type === 'file') return page.cover.file.url;
    return null;
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}
