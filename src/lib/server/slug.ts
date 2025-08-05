export const usernameToSlug = (username: string) => {
    return username.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}