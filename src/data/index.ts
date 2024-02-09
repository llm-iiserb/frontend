export const URL = "https://qna.iiserb.ac.in";

/**
 * Creates a backend endpoint URL based on the slug passed
 *
 * @param slug The slug of the api endpoint
 * @returns The endpoint URL
 */
export const createEndpoint = (slug: string) => `${URL}/${slug}`;
