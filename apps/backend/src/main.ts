import { bootstrapEnvironment } from "./bootstrap/env.js";
import { bootstrapDatabase } from "./bootstrap/database.js";

bootstrapEnvironment();

await bootstrapDatabase();

await import("./server.js");
