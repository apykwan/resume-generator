type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

export async function apiHandler<T>(fn: AsyncFunction<T>, ...args: any[]): Promise<T> {
  return await Promise
    .resolve(fn(...args))
    .catch(err => {
      if (err instanceof Error) {
        console.error("Database error occurred:", err.message);
        throw err;
      }
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred.");
    });
}