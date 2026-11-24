import 'dotenv/config.js';

// fail fast: crash at boot if a required variable is missing
// instead of falling mysteriously at request time

const required = ['DATABASE_URL']

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

// One typed, frozen config object. The rest of the app imports this
// and never touches process.env directly. This is a good practice because it makes
// it easier to see what environment variables are used, and to mock them in tests.

export const env = Object.freeze({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    databaseURL: process.env.DATABASE_URL,
    clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
});