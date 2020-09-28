export class ReadXlsPlayerError implements Error {
  message: string;
  name: string = 'Error during player file uploading';
  stack: string;

  createMessage(cause: string, row: number): string {
    return cause + " in row: " + row;
  }
}
