export async function retryOperation<T>(operation: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        if (retries === 0) {

            throw error;
        }
        console.log(`Retrying after error: ${error}`);

        await new Promise(res => setTimeout(res, delay));
        return retryOperation(operation, retries - 1, delay * 2);
    }
}
