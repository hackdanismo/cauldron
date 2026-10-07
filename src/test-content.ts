import type { ContentEntry, ContentType } from "./content/content-types";
import { saveContentType, getContentEntry } from "./content/content-store";
import { createContentEntry } from "./content/content-service";

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

const articleEntry: ContentEntry = {
    id: "123",
    contentTypeId: "article",
    data: {
        title: "My first article",
        body: "This is my first CMS article.",
        published: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};

const errors = createContentEntry(articleEntry);

if (errors.length > 0) {
    console.log("Validation failed:");
    console.log(errors);
} else {
    console.log("Content entry saved successfully.");

    const savedEntry = getContentEntry("123");

    console.log(savedEntry);
}