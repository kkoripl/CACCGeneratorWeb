export class GradesStyle {
  public static HEX = new GradesStyle('Hex', 'hex')
  public static CIRCLE = new GradesStyle('Circle', 'circle')

  name: string;
  directory: string

  private constructor(name: string, directory: string) {
    this.name = name;
    this.directory = directory;
  }
}
