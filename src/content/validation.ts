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
         * If the field expects a date, check that the value
         * is an instance of JavaScript's Date object.
         */
        if (field.type === "date" && !(value instanceof Date)) {
            errors.push(`${field.key} must be a Date.`);
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