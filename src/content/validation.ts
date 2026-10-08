/*
 * Validation to check ContentEntry data against its ContentType.
 *
 * This function checks whether the values provided in `data`
 * match the field definitions stored in the content type.
 */

/* 
 * Import the ContentType type so TypeScript knows
 * what shape the contentType argument should have.
 */
import type { ContentType } from "./content-types";

/*
 * Validate some content data against a ContentType.
 *
 * Parameters:
 * - contentType: The schema that defines which fields exist
 *   and what type each field should contain.
 * - data: The actual content values we want to validate.
 *
 * Returns:
 * - An array of error messages.
 * - If the array is empty, the data passed validation.
 */
export function validateContentData(
    contentType: ContentType,
    data: Record<string, unknown>
): string[] {

    // Store any validation errors we find.
    const errors: string[] = [];

    // Unknown field validation.
    const allowedKeys = new Set(
        // Build a set of valid field names from the schema.
        contentType.fields.map((field) => field.key)
    );

    // Check every key submitted in the data and reject anything that isn't defined by the ContentType.
    for (const key of Object.keys(data)) {
        if (!allowedKeys.has(key)) {
            errors.push(`${key} is not a valid field.`);
        }
    }

    /*
     * Loop through every field defined in the ContentType.
     *
     * For example, an Article might have:
     * - title
     * - body
     * - published
     */
    for (const field of contentType.fields) {

        /*
         * Get the value from the data object that matches
         * the current field's key.
         *
         * For example:
         *
         * field.key = "title"
         *
         * data = {
         *   title: "My article"
         * }
         *
         * value would be "My article".
         */
        const value = data[field.key];

        /*
         * Check whether this field is required.
         *
         * If it is required but no value was supplied,
         * add an error message.
         */
        if (field.required && value === undefined) {
            errors.push(`${field.key} is required.`);

            /*
             * Stop validating this field and move on
             * to the next field.
             *
             * There is no point checking its type because
             * the value does not exist.
             */
            continue;
        }

        /*
         * If the field is optional and no value was supplied,
         * there is nothing else to validate.
         *
         * Move on to the next field.
         */
        if (value === undefined) {
            continue;
        }

        /*
         * If the field expects text, make sure the value
         * is a JavaScript string.
         */
        if (field.type === "text" && typeof value !== "string") {
            errors.push(`${field.key} must be text.`);
        }

        /*
         * If the field expects a number, make sure the value
         * is a JavaScript number.
         */
        if (field.type === "number" && typeof value !== "number") {
            errors.push(`${field.key} must be a number.`);
        }

        /*
         * If the field expects a boolean, make sure the value
         * is either true or false.
         */
        if (field.type === "boolean" && typeof value !== "boolean") {
            errors.push(`${field.key} must be a boolean.`);
        }

        /*
        * If the field expects a date, make sure the value
        * is a valid date string.
        *
        * JSON sends dates as strings, for example:
        * "2026-10-08T08:00:00.000Z"
        */
        if (field.type === "date") {
            if (
                typeof value !== "string" ||
                Number.isNaN(Date.parse(value))
            ) {
                errors.push(`${field.key} must be a valid date.`);
            }
        }
    }

    /*
     * Return every validation error that was found.
     *
     * An empty array means the data is valid:
     *
     * []
     */
    return errors;
}