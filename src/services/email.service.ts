import nodemailer from 'nodemailer'
import config from '../config'
import fs from 'node:fs/promises'

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD
            }
        })
    }

    private async _renderTemplate(templateName: string, context: Record<string, any>): Promise<string> {
        const layoutSource = await fs.readFile(
            path.join(ProcessingInstruction.cwd(), 'src', 'templates', 'base.hbs'), 'utf8'
        )
    }

    public async sendEmail(): Promise<void> {
        await this.transporter.sendMain({
            to: "aburlakovait@gmail.com",
            subject: "First mail",
            text: "Hello from node"

        })
    }
}


export const emailService = new EmailService();