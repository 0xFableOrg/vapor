export async function post(url: string, body?: any) {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  let requestObject: any = {
    method: "POST",
    headers: headers,
  };

  if (body) {
    requestObject = {
      ...requestObject,
      body: JSON.stringify(body),
    };
  }

  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const response = await fetch(request);
  return response;
}
