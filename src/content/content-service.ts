import { randomUUID } from "node:crypto";

import type {
    ContentEntry,
    CreateContentEntryInput,
} from "./content-types";

import {
    getContentType,
    saveContentEntry,
} from "./content-store";

import { validateContentData } from "./validation";

type CreateContentEntryResult =
    | {
        success: true;
        entry: ContentEntry;
    }
    | {
        success: false;
        errors: string[];
    };

export function createContentEntry(
    input: CreateContentEntryInput
): CreateContentEntryResult {
    const contentType = getContentType(input.contentTypeId);

    if (!contentType) {
        return {
            success: false,
            errors: [
                `Content type "${input.contentTypeId}" does not exist.`,
            ],
        };
    }

    const errors = validateContentData(
        contentType,
        input.data
    );

    if (errors.length > 0) {
        return {
            success: false,
            errors,
        };
    }

    const now = new Date();

    const entry: ContentEntry = {
        id: randomUUID(),
        contentTypeId: input.contentTypeId,
        data: input.data,
        createdAt: now,
        updatedAt: now,
    };

    saveContentEntry(entry);

    return {
        success: true,
        entry,
    };
}