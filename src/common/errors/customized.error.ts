export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function handleError(error: unknown): never {
  if (error instanceof Error) {
    throw new CustomError(
      error.message,
      (error as { status?: number }).status ?? 500
    );
  }

  throw new CustomError("Internal Server Error", 500);
}
