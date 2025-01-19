import { ResponseBuilder } from "@fermyon/spin-sdk";
import fs from 'fs';

export async function handler(req: Request, res: ResponseBuilder) {
    console.log(req);

    fs.readFileSync('/no-such-file', 'utf8');
    res.send("hello universe");
}
