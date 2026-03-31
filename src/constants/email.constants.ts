import { EmailEnum } from "../enums/email.enum"

export type IEmailData = {
    subject: string,
    tepmlate: string
}

export type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData
}

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.WELCOME]: {
        subject: 'Welcome',
        tepmlate: 'welcome'
    },
    [EmailEnum.ACTIVATE]: {
        subject: 'Activate Account',
        tepmlate: 'activate'
    },
    [EmailEnum.RECOVERY]: {
        subject: 'Recovery password',
        tepmlate: 'recovery'
    }
}