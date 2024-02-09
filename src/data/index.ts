export const URL = "http://203.18.51.89:80:5000";

/**
 * Creates a backend endpoint URL based on the slug passed
 *
 * @param slug The slug of the api endpoint
 * @returns The endpoint URL
 */
export const createEndpoint = (slug: string) => `${URL}/${slug}`;
