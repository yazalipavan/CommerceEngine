import { bootstrapEnvironment } from "./bootstrap/env.js";

bootstrapEnvironment();

await import("./server.js");
