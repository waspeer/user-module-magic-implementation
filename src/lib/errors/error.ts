/**
 * Should create a string from arbritrary arguments
 *
 * @template A - The arguments of the function
 */
interface MessageCreator<A extends any[]> {
  (...arguments_: A): string;
}

/**
 * Creates a custom error class
 *
 * @param {string} name - Name of the error
 * @param {MessageCreator} messageCreator - Function that creates the message of the error
 */
export function createCustomError<A extends any[]>(
  name: string,
  messageCreator: MessageCreator<A>,
) {
  class CustomError extends Error {
    public constructor(...arguments_: A) {
      super(messageCreator(...arguments_));
      this.name = name;
    }
  }

  return CustomError;
}
