import { createServerCall, HandleServerError } from 'servercall';

export const defaultServerErrorHandler = ({ error, errorTag, defaultError }: HandleServerError) => {
  if (error.response) {
    const { status, statusText, data } = error.response;
    console.log({ error: error.response }, errorTag);

    return { success: false, error: { status, statusText, data } };
  }

  return { success: false, error };
};

export const serverCall = createServerCall({
    baseUrl: 'http://localhost:9000/api',
    logger: console,
    defaultAuthSource: () => 'fake-auth',
    successFieldDept: (response: any) => response?.['data']?.['success'],
   handleServerError: defaultServerErrorHandler,
  });

