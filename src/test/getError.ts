export function getError(action: {(): void}): Error|undefined {
    try {
        action();
        return undefined;
    } catch (error) {
        return error as Error;
    }
}

export async function getErrorAsync(action: {(): Promise<void>}): Promise<Error|undefined> {
    try {
        await action();
        return undefined;
    } catch (error) {
        return error as Error;
    }
}