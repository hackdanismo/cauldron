import type {
    ContentEntry,
    CreateContentEntryInput,
} from "./content-types";

import {
    getContentType,
    saveContentEntry,
} from "./content-store";

import { validateContentData } from "./validation";

export function createContentEntry(
    input: CreateContentEntryInput
): string[] {
    const contentType = getContentType(input.contentTypeId);

    if (!contentType) {
        return [
            `Content type "${input.contentTypeId}" does not exist.`,
        ];
    }

    const errors = validateContentData(
        contentType,
        input.data
    );

    if (errors.length > 0) {
        return errors;
    }

    const now = new Date();

    const entry: ContentEntry = {
        id: input.id,
        contentTypeId: input.contentTypeId,
        data: input.data,
        createdAt: now,
        updatedAt: now,
    };

    saveContentEntry(entry);

    return [];
}