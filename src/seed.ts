import type { ContentType } from "./content/content-types";
import { saveContentType } from "./content/content-store";

/*
 * Create some starter content types so the CMS
 * has schemas available when the server starts.
 */
export function seedContentTypes(): void {
    const articleType: ContentType = {
        id: "article",
        name: "Article",
        fields: [
            {
                key: "title",
                type: "text",
                required: true,
            },
            {
                key: "body",
                type: "text",
                required: true,
            },
            {
                key: "published",
                type: "boolean",
            },
        ],
    };

    saveContentType(articleType);
}