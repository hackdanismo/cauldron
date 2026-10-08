import Fastify from "fastify";

import type { CreateContentEntryInput } from "./content/content-types";
import { createContentEntry } from "./content/content-service";
import { getContentEntry } from "./content/content-store";
import { seedContentTypes } from "./seed";

const app = Fastify();

// Seed the CMS with starter content types.
seedContentTypes();

/*
 * Create a new content entry.
 */
app.post("/entries", async (request, reply) => {
    const entry = request.body as CreateContentEntryInput;

    const errors = createContentEntry(entry);

    if (errors.length > 0) {
        return reply.status(400).send({
            errors,
        });
    }

    return reply.status(201).send(entry);
});

/*
 * Get a content entry by its ID.
 */
app.get("/entries/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const entry = getContentEntry(id);

    if (!entry) {
        return reply.status(404).send({
            error: "Content entry not found.",
        });
    }

    return entry;
});

/*
 * Basic health check / root route.
 */
app.get("/", async () => {
    return {
        message: "CMS API is running.",
    };
});

/*
 * Start the server.
 */
app.listen({
    port: 3000,
}).then(() => {
    console.log("CMS API running on http://localhost:3000");
});