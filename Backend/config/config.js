const { env } = process;

const SERVER_PORT = env.SERVER_PORT ?? 3000;
const SECRET = env.SECRET ?? "dev-secret-lavadero";

export { SERVER_PORT, SECRET };
