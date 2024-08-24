"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("./EmailService");
const MockEmailProvider_1 = require("./MockEmailProvider");
// Create instances of the mock email providers
const provider1 = new MockEmailProvider_1.MockEmailProvider('Provider1');
const provider2 = new MockEmailProvider_1.MockEmailProvider('Provider2');
// Instantiate the EmailService with the mock providers
const emailService = new EmailService_1.EmailService([provider1, provider2]);
// Array of email addresses
const emailAddresses = [
    'vishwajeet@gmail.com',
    'vishwajeet.singh@yahoo.com',
    'vishwajeet.pratap@hotmail.com',
    'singh.vishwajeet@yahoomail.com'
];
const subject = 'Pearl Thought';
const body = 'Working on this mini project for Internship at Pearl Thought';
// Function to test the email sending service
function testEmailService() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const email of emailAddresses) {
            try {
                yield emailService.sendEmail(email, subject, body);
                console.log(`Email sent successfully to ${email}.`);
            }
            catch (error) {
                console.error(`Failed to send email to ${email}:`, error);
            }
        }
    });
}
// Run the test function
testEmailService();
