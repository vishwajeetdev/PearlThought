import { MockEmailProvider } from './MockEmailProvider';
import { retryOperation } from './RetryLogic';

interface EmailSendStatus {
    success: boolean;
    provider: string;
    attempts: number;
}

export class EmailService {
    private providers: MockEmailProvider[];
    private sentEmails: Set<string> = new Set();
    private emailSendStatus: Map<string, EmailSendStatus> = new Map();

    constructor(providers: MockEmailProvider[]) {
        this.providers = providers;
    }

    private async sendEmailWithProvider(provider: MockEmailProvider, to: string, subject: string, body: string): Promise<boolean> {
        return retryOperation(() => provider.sendEmail(to, subject, body), 3, 1000);
    }

    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        if (this.sentEmails.has(to)) {
            console.log(`Email already sent to ${to}.`);
            return;
        }

        for (const provider of this.providers) {
            try {
                const success = await this.sendEmailWithProvider(provider, to, subject, body);
                if (success) {
                    this.sentEmails.add(to);
                    this.emailSendStatus.set(to, { success: true, provider: provider.constructor.name, attempts: 1 });
                    return;
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(`Provider ${provider.constructor.name} failed for ${to}: ${error.message}`);
                } else {
                    console.log(`Provider ${provider.constructor.name} failed for ${to} with unknown error`);
                }
            }
        }

        this.emailSendStatus.set(to, { success: false, provider: 'None', attempts: 3 });
    }
}
