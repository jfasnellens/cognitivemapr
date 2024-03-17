/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

export interface NotificationOptions {
  id: string;
  title: string;
  text: string;
  type: 'success' | 'warning' | 'error';
  callback?: () => void;
}
