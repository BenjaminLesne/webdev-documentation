import { test as base } from '@playwright/test';
const test = base.extend<TestOptions> ({
page: async ({ context, page }, use) => {
    context.on('weberror', err => {
    console.error(err.error());
    throw new Error('Failing test due to error in browser: ' + err.error());
    });
    page.on('pageerror', err => {
        console.error(err);
        throw new Error('Failing test due to error in browser: ' + err);
    });
    
    context.on('console', msg => {
    const originalText = msg.text();
    if (checkIfIsHydrationErrorMessage (originalText)) {
    throw new Error('Hydration error detected: ' + originalText);
    }
    });

    page.on('console', msg => {
    const originalText = msg.text();
    if (checkIfIsHydrationError Message (originalText)) {
    throw new Error('Hydration error detected: ' + originalText);
    }
    });
    await use(page)
}
})