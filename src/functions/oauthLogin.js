const { ACC_CLIENT_ID, ACC_REDIRECT_URI, ACC_SCOPES } = process.env;

export default async function (context, req) {
  const query = new URLSearchParams({
    response_type: 'code',
    client_id: ACC_CLIENT_ID,
    redirect_uri: ACC_REDIRECT_URI,
    scope: ACC_SCOPES
  });

  const authUrl = `https://developer.api.autodesk.com/authentication/v2/authorize?${query.toString()}`;

  context.log(`Redirecting to: ${authUrl}`);
  context.res = {
    status: 302,
    headers: {
      Location: authUrl
    }
  };
};


