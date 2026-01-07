import { BlockObjectResponse, PartialBlockObjectResponse, ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlockWithChildren = (BlockObjectResponse | PartialBlockObjectResponse) & {
    children?: ListBlockChildrenResponse;
};

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
