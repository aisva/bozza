export function generateErrorResponse(statusCode: number, errorMessage: string): { statusCode: number; body: string } {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      error: errorMessage
    })
  };
}
