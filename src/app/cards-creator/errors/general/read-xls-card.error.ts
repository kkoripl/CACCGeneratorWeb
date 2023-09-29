export class ReadXlsCardError implements Error {
  message: string;
  name: string = 'Error during card file uploading';
  stack: string;

  createMessage(cause: string, row: number): string {
    return cause + " in row: " + row;
  }
}
