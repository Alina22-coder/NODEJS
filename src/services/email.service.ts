import nodemailer from 'nodemailer'
import config from '../config'
import fs from 'node:fs/promises'
import path from 'node:path'

import handlebars from 'handlebars'

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
            path.join(process.cwd(), 'src', 'templates', 'base.hbs'), 'utf8'
        );

        const layoutTemplate = handlebars.compile(layoutSource);

        const templateSource = await fs.readFile(
            path.join(process.cwd(), 'src', 'templates', `${templateName}.hbs`), 'utf8'
        );

        const childTemplate = handlebars.compile(templateSource);
        const childHtml = childTemplate(context);

        return layoutTemplate({ body: childHtml });
    }

    public async sendEmail(to: string, subject: string, templateName: string, context: Record<string, any>): Promise<void> {
        await this.transporter.sendMain({
            to,
            subject,
            html: await this._renderTemplate(templateName, context),
        })
    }
}


export const emailService = new EmailService();