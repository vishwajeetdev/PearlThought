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
exports.EmailService = void 0;
const RetryLogic_1 = require("./RetryLogic");
class EmailService {
    constructor(providers) {
        this.sentEmails = new Set();
        this.emailSendStatus = new Map();
        this.providers = providers;
    }
    sendEmailWithProvider(provider, to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, RetryLogic_1.retryOperation)(() => provider.sendEmail(to, subject, body), 3, 1000);
        });
    }
    sendEmail(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sentEmails.has(to)) {
                console.log(`Email already sent to ${to}.`);
                return;
            }
            for (const provider of this.providers) {
                try {
                    const success = yield this.sendEmailWithProvider(provider, to, subject, body);
                    if (success) {
                        this.sentEmails.add(to);
                        this.emailSendStatus.set(to, { success: true, provider: provider.constructor.name, attempts: 1 });
                        return;
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(`Provider ${provider.constructor.name} failed for ${to}: ${error.message}`);
                    }
                    else {
                        console.log(`Provider ${provider.constructor.name} failed for ${to} with unknown error`);
                    }
                }
            }
            this.emailSendStatus.set(to, { success: false, provider: 'None', attempts: 3 });
        });
    }
}
exports.EmailService = EmailService;
