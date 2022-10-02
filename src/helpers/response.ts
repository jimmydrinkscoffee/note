const failedResponse = (err: string) => ({
  status: "failed",
  error: err,
});

const successResponse = (res: any) => ({
  status: "success",
  result: res,
});

export { failedResponse, successResponse };
