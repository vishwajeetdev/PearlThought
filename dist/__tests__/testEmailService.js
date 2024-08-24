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
const EmailService_1 = require("../EmailService");
describe('EmailService', () => {
    let mockProvider1;
    let mockProvider2;
    let emailService;
    beforeEach(() => {
        mockProvider1 = {
            sendEmail: jest.fn(),
        };
        mockProvider2 = {
            sendEmail: jest.fn(),
        };
        emailService = new EmailService_1.EmailService([mockProvider1, mockProvider2]);
    });
    test('should retry sending email on failure and fall back to the second provider', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(10000); // Optional: Increase timeout to 10 seconds
        // Test data
        const email = 'vishwajeet@gmail.com';
        const subject = 'Pearl Thought';
        const body = 'Working on this mini project for Internship at Pearl Thought';
        // Mock sendEmail implementations
        mockProvider1.sendEmail.mockRejectedValueOnce(new Error('Provider 1 failure'));
        mockProvider2.sendEmail.mockResolvedValue(true);
        // Call the method to test
        const result = yield emailService.sendEmail(email, subject, body);
        // Check that the methods were called as expected
        expect(mockProvider1.sendEmail).toHaveBeenCalledWith(email, subject, body);
        expect(mockProvider2.sendEmail).toHaveBeenCalledWith(email, subject, body);
        expect(result).toBe(true);
    }));
});
