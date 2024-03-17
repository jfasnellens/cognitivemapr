/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

/**
 * Special error type to throw in the scripts that can be caught when back in nuxt context.
 */
export class ScriptError extends Error {
  from: string;
  subComponent?: string;
  data?: object;

  constructor({
    from,
    message,
    subComponent,
    data,
  }: {
    from: string;
    message: string;
    subComponent?: string;
    data?: object;
  }) {
    super(message);
    this.from = from;
    this.subComponent = subComponent;
    this.data = data;
  }
}
