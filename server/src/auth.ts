import { Router } from "express";
import fetch from "node-fetch";
import querystring from "querystring";
import btoa from "btoa";
import User from "./database/models/userSchema";
import { getDiscordUser } from "./discordAPI";

const router = Router();
const SERVER_PORT: number = parseInt(process.env["PORT"]) | 5000;
const FRONTEND_PORT = 3000;
const DISCORD_ID = process.env["DISCORD_APP_ID"];
const DISCORD_SECRET = process.env["DISCORD_SECRET"];
const AUTH_REDIRECT_URL = `http://localhost:${SERVER_PORT}/auth/callback`;

router.use((err, req, res, next) => {
    switch (err.message) {
        case "NoCodeProvided":
            return res.status(400).send({
                status: "ERROR",
                error: err.message,
            });
        default:
            return res.status(500).send({
                status: "ERROR",
                error: err.message,
            });
    }
});

router.get("/login", (_req, res) => {
    res.redirect(
        `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_ID}&scope=identify&response_type=code&redirect_uri=${AUTH_REDIRECT_URL}`
    );
});

router.get("/callback", async (req, res) => {
    if (req.query.code === undefined) throw new Error("NoCodeProvide");
    let code;
    if (req.query && req.query.code) {
        code = (req.query as any).code;
    }
    const creds = btoa(`${DISCORD_ID}:${DISCORD_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${creds}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: AUTH_REDIRECT_URL,
        }),
    });
    const auth_res: Record<any, any> = await response.json();
    if (await register_user(auth_res.access_token)) {
        res.redirect(`http://localhost:${FRONTEND_PORT}/?token=${auth_res.access_token}`);
    } else {
        res.status(400).send({ error: "Unable to verify existing User or create new User." });
    }
});

router.get("/user/me", async (req, res) => {
    if (req.headers.authorization) {
        try {
            let data = await getDiscordUser(req.headers.authorization);
            res.send(data);
        } catch (err) {
            res.status(400).send({ error: "Could not retrieve user info. Has your token expired?" });
        }
    } else {
        res.status(400).send({ error: "No token was provided" });
    }
});

/* 
Registers a user if the user does not exist in DB
Returns true if the user exists or is created, false if the user has not been created
*/
async function register_user(auth_token: string): Promise<boolean> {
    // Get User ID from Discord
    try {
        const discord_res = await fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: `Bearer ${auth_token}`,
            },
            mode: "cors",
        });
        const discord_user_id = (await discord_res.json()).id;

        if ((await User.findOne({ discordId: discord_user_id })) === null) {
            // User has not been created, create and save new user
            console.log(`HERE: ${discord_user_id}`);
            const newUser = new User({ discordId: discord_user_id });
            newUser.save();
        }

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default router;
