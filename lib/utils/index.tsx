export function getGreeting(): string {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export function formatPrice(price: number): string {
    if(price >= 10000000) {
        const cr = (price/10000000).toFixed(1).replace(/\.0$/, '');
        return `₹${cr} Cr`;
    }

    if(price >= 100000) {
        const lac = (price/100000).toFixed(1).replace(/\.0$/, '');
        return `₹${lac}L`;
    }

    return `₹${price.toLocaleString()}`;
}