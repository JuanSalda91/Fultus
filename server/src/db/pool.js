import pg from 'pg';
import { env } from '../config/env.js';

// one pool for the entire app. A pool reuses a fixed set of open
// connections instead of opnening a new one per request (which is slow and can overwhelm the database)

export const pool = new pg.Pool({
    connectionString: env.databaseURL,
    max: 10,
    idleTimeoutMillis: 30_000, // 30 seconds
    connectionTimeoutMillis: 5_000, // 5 seconds
});

// Idle clients can emit errors (e.g., the DB restarts). With this
// listener, Node treats it as an unhandled 'error' event and crashes the process, which is what we want to happen in this case.
pool.on('error', (err) => {
    console.error('unexpected error on idle PostgreSQL client:', err);
});

// Thin wrapper so the rest of the code can write: await query('SELECT ...' [params])
// Always pass user inout through the params array, never string concatenation (SQLinjection is a real risk!)
export const query = (text, params) => pool.query(text, params);