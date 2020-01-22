const baseUrl = "http://localhost:52672/";

const getHeaders: any = (authenticated: boolean) => {
  return authenticated
    ? {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    : {
        "Content-Type": "application/json"
      };
};

interface IError {
  errorCode: string;
  error: string;
}

export interface IResponse<T> {
  type: "success" | "error" | "serverError";
  response: string | T | IError;
}

const getDataFromResponse = async <T>(response: Response) => {
  let resString = await response.text();
  try {
    return JSON.parse(resString) as T;
  } catch {
    return resString;
  }
};

export const post = async <TD, TR>(
  endpoint: string,
  data: TD,
  authenticated: boolean
) => {
  let request = new Request(`${baseUrl}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeaders(authenticated)
  });
  // eslint-disable-next-line no-console
  console.log(request);
  return await fetchMeth<TR>(request);
};

export const get = async <TR>(endpoint: string, authenticated: boolean) => {
  let request = new Request(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: getHeaders(authenticated)
  });
  return await fetchMeth<TR>(request);
};

const fetchMeth = async <T>(request: Request) => {
  const response = await fetch(request);
  if (response.ok && response.status >= 200 && response.status < 300) {
    return {
      type: "success",
      response: await getDataFromResponse(response)
    } as IResponse<T>;
  }
  if (response.status === 500) {
    return {
      type: "serverError",
      response: (await response.json()) as IError
    } as IResponse<T>;
  }
  return {
    type: "error",
    response: await getDataFromResponse(response)
  } as IResponse<T>;
};

export const getToastObj = (response: IResponse<string>) => {
  if (response.type === "serverError") {
    return {
      severity: "error",
      summary: "Server error",
      detail: (response.response as IError).error,
      life: 5000
    };
  }
  return {
    severity: response.type,
    detail: response.response as string,
    life: 3000
  };
};
