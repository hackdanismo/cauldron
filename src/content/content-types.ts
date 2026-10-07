/*
 * Define the shape of the data the CMS will use.
 * This tells TypeScript what objects are valid.
 */

/* 
 * Create a type where a value of this type can only be one of the strings listed.
 * The export keyword allows other files to import and use this type.
 */
export type FieldType = "text" | "number" | "boolean" | "date";

// Define a field in a content model.
export interface FieldDefinition {
    // A machine-readable name of the field.
    key: string;
    // Determines what kind of value the field accepts.
    type: FieldType;
    // Says whether the field must have a value (optional).
    required?: boolean;
}

/*
 * A ContentType describes a whole content model.
 * This could be something like: Article, Product, Author, or Landing Page.
 */
export interface ContentType {
    id: string;
    name: string;
    // An array of FieldDefinition objects so a content type can contain main field definitions.
    fields: FieldDefinition[];
}

/*
 * The ContentEntry represents the actual piece of content.
 * This is created from a ContentType.
 * For example, an Article may have: title, body, published.
 */
export interface ContentEntry {
    // The id for the content e.g. "123".
    id: string;
    /*
     * The content type e.g. "article".
     * Connects the entry to its schema.
     */
    contentTypeId: string;
    /*
     * The data is here such as: title, body, and if published.
     * An object whose keys are strings, but values could be anything.
     * Useful for a CMS as we don't know what fields the user will create.
     */
    data: Record<string, unknown>;
    // When the content was created.
    createdAt: Date;
    // When the content was updated.
    updatedAt: Date;
}