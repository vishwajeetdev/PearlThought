export class MockEmailProvider {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
        console.log(`[${this.name}] Sending email to ${to}`);

        //here i am assuming the 50% failure rate.
        if (Math.random() > 0.5) {
            throw new Error('Simulated sending failure');
        }
        return true;
    }
}
