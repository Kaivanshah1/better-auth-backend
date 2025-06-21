import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import * as schema from "../db/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    session: {
        expiresIn: 60 * 2, 
        updateAge: 60 * 60 * 24,
    },
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins:[
        "http://localhost:5173",
        "http://localhost:3000"
    ]
});
