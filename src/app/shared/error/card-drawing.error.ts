export class CardDrawingError implements Error {
  message: string;
  name: string = 'Error during card drawing';
  stack: string;
}
