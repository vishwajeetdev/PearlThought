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
exports.retryOperation = void 0;
function retryOperation(operation, retries = 3, delay = 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield operation();
        }
        catch (error) {
            if (retries === 0) {
                throw error;
            }
            console.log(`Retrying after error: ${error}`);
            yield new Promise(res => setTimeout(res, delay));
            return retryOperation(operation, retries - 1, delay * 2);
        }
    });
}
exports.retryOperation = retryOperation;
