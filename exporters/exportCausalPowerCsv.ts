/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import _ from 'lodash';

export class ExportCausalPowerCsv{
  causalPower: Array<Array<string>>;

  constructor(causalPower: Array<Array<string>>) {
    this.causalPower = causalPower;
  }

  /**
   * Exports causal power graph to human readable CSV
   * @returns String array with causal power array in base64 form
   */
  async export(): Promise<string[]> {
    return await new Promise((resolve) => {
      const csvCausalPower: string = this.causalPowerToCSV();
      const causalPowerBlob = new Blob([csvCausalPower], { type: 'text/csv;charset=utf-8,' });
      const url: string = URL.createObjectURL(causalPowerBlob);

      resolve([url]);
    });
  }

  /**
   * Converts causal power data from the graph to a CSV
   * @returns causal power data in CSV base64 form.
   */
  causalPowerToCSV(): string {
    const headers = 'Cause concept;Causal power;Effect concept'; // Column headers
    const rows = this.causalPower.map((causalPower) => `${causalPower[0] ?? 'NA'};${causalPower[1] ?? 'NA'};${causalPower[2] ?? 'NA'}`).join('\n');

    return headers.concat('\n', rows);
  }
}
