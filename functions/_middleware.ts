const REALM = 'Verity Docs';

function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${REALM}"` },
  });
}

export const onRequest: PagesFunction<{ DOCS_PASSWORD: string }> = async (context) => {
  const password = context.env.DOCS_PASSWORD;
  if (!password) return context.next();

  const header = context.request.headers.get('Authorization');
  if (!header?.startsWith('Basic ')) return unauthorized();

  const decoded = atob(header.slice(6));
  const [, pass] = decoded.split(':');

  if (pass !== password) return unauthorized();

  return context.next();
};
