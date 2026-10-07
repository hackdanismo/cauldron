// Make sure invalid content cannot be saved.

import type { ContentEntry } from "./content-types";
import { getContentType, saveContentEntry } from "./content-store";
import { validateContentData } from "./validation";

export function createContentEntry(entry: ContentEntry): string[] {
    const contentType = getContentType(entry.contentTypeId);

    if (!contentType) {
        return [`Content type "${entry.contentTypeId}" does not exist.`];
    }

    const errors = validateContentData(contentType, entry.data);

    if (errors.length > 0) {
        return errors;
    }

    saveContentEntry(entry);

    return [];
}