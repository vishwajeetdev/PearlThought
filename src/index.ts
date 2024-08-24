import { EmailService } from './EmailService';
import { MockEmailProvider } from './MockEmailProvider';


const provider1 = new MockEmailProvider('Provider1');
const provider2 = new MockEmailProvider('Provider2');

const emailService = new EmailService([provider1, provider2]);

const emailAddresses = [
    'vishwajeet@gmail.com',
    'vishwajeet.singh@yahoo.com',
    'vishwajeet.pratap@hotmail.com',
    'singh.vishwajeet@yahoomail.com'
];

const subject = 'Pearl Thought';
const body = 'Working on this mini project for Internship at Pearl Thought';

async function testEmailService() {
    for (const email of emailAddresses) {
        try {
            await emailService.sendEmail(email, subject, body);
            console.log(`Email sent successfully to ${email}.`);
        } catch (error) {
            console.error(`Failed to send email to ${email}:`, error);
        }
    }
}

testEmailService();
