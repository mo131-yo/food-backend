import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL ,AUTH_PASS} = process.env;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
    debug: true,
    logger: true
})


    export const verifyUserEmail = async (receiver: string, verifiLink: string) => {
        await transport.sendMail({
            from: `Foods <${AUTH_EMAIL}>`,
            to: receiver,
            subject: "Verify user",
            html: `<p>Click <a href="${verifiLink}">here</a> to verify your email.</p>`
        })
    }