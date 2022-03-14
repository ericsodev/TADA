import fetch from "node-fetch";
import User from "./database/models/userSchema";

export async function getDiscordUser(token: string): Promise<Record<any, any> | null> {
    try {
        const discord_res = await fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: token,
            },
            mode: "cors",
        });
        const user = await discord_res.json();
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function verifyUserExists(token: string): Promise<boolean> {
    try {
        const discordID = await fetch("https://discord.com/api/users/@me", { headers: { authorization: token } })
            .then((res) => res.json())
            .then((res) => res.id);
        return (await User.findOne({ userId: discordID })) !== null;
    } catch (err) {
        console.log(err);
        return false;
    }
}
