/*
 * In-memory storage layer for the CMS.
 * This provides temporary storage to save and retrieve ContentType and ContentEntry objects.
 * The ContentType object, could be an Article schema.
 * The ContentEntry objects. could be one specific article.
 */

/*
 * Import the ContentEntry and ContentType types.
 *
 * These types describe the shape of the data that
 * this store is allowed to save.
 */
import type { ContentEntry, ContentType } from "./content-types";

/*
 * Store content types in memory.
 *
 * A Map stores values using a key.
 *
 * In this case:
 * - The key is a string, such as "article".
 * - The value is a ContentType object.
 *
 * Example:
 *
 * "article" -> {
 *   id: "article",
 *   name: "Article",
 *   fields: [...]
 * }
 */
const contentTypes = new Map<string, ContentType>();

/*
 * Store content entries in memory.
 *
 * In this case:
 * - The key is the content entry ID, such as "123".
 * - The value is a ContentEntry object.
 */
const contentEntries = new Map<string, ContentEntry>();

/*
 * Save a ContentType.
 *
 * The function accepts one ContentType object.
 *
 * `: void` means this function does not return a value.
 */
export function saveContentType(contentType: ContentType): void {

    /*
     * Add the content type to the Map.
     *
     * The content type's ID is used as the key.
     *
     * For example:
     *
     * contentType.id = "article"
     */
    contentTypes.set(contentType.id, contentType);
}

/*
 * Retrieve a ContentType using its ID.
 *
 * For example:
 *
 * getContentType("article")
 *
 * The function returns either:
 * - A ContentType if one exists with that ID.
 * - undefined if nothing was found.
 */
export function getContentType(id: string): ContentType | undefined {
    return contentTypes.get(id);
}

/*
 * Save a ContentEntry.
 *
 * The entry's ID is used as the key in the Map.
 *
 * For example:
 *
 * entry.id = "123"
 */
export function saveContentEntry(entry: ContentEntry): void {
    contentEntries.set(entry.id, entry);
}

/*
 * Retrieve a ContentEntry using its ID.
 *
 * For example:
 *
 * getContentEntry("123")
 *
 * The function returns either:
 * - A ContentEntry if one exists with that ID.
 * - undefined if nothing was found.
 */
export function getContentEntry(id: string): ContentEntry | undefined {
    return contentEntries.get(id);
}