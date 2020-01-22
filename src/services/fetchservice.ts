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

interface ValErrors {
  [key: string]: Array<string>;
}

interface IValidationError {
  title: string;
  errors: ValErrors;
}

export interface IResponse<T> {
  type: "success" | "error" | "serverError" | "validationError";
  response: string | T | IError | IValidationError;
}

const isValidationError = (
  error: string | IError | IValidationError
): error is IValidationError => {
  return (error as IValidationError).errors !== undefined;
};

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
  return await fetchMeth<TR>(request);
};
export const put = async <TD, TR>(
  endpoint: string,
  data: TD,
  authenticated: boolean
) => {
  let request = new Request(`${baseUrl}${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: getHeaders(authenticated)
  });
  return await fetchMeth<TR>(request);
};

export const get = async <TR>(endpoint: string, authenticated: boolean) => {
  let request = new Request(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: getHeaders(authenticated)
  });
  return await fetchMeth<TR>(request);
};

export const httpDelete = async <TR>(
  endpoint: string,
  authenticated: boolean
) => {
  let request = new Request(`${baseUrl}${endpoint}`, {
    method: "DELETE",
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
  const responseText = await getDataFromResponse<IError | IValidationError>(
    response
  );
  if (isValidationError(responseText)) {
    return {
      type: "validationError",
      response: responseText
    } as IResponse<T>;
  }
  return {
    type: "error",
    response: responseText
  } as IResponse<T>;
};

const getErrorStr = (errors: ValErrors) => {
  let retString = "";
  for (let key in errors) {
    errors[key].forEach(error => {
      retString += `${key}: ${error}\n`;
    });
  }
  return retString;
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
  if (response.type === "validationError") {
    const responseObj = response.response as IValidationError;
    return {
      severity: "error",
      summary: responseObj.title,
      detail: getErrorStr(responseObj.errors)
      // life: 5000
    };
  }
  return {
    severity: response.type,
    detail: response.response as string,
    life: 3000
  };
};
