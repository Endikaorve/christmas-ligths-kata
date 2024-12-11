export class ChristmasLights {
  private grid: boolean[][] = Array.from({ length: 1000 }, () =>
    Array(1000).fill(false)
  );

  public turnOn(area: { start: [number, number]; end: [number, number] }) {
    const { start, end } = area;
    const [startRow, startColumn] = start;
    const [endRow, endColumn] = end;

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        this.grid[row][column] = true;
      }
    }
  }

  public turnOff(area: { start: [number, number]; end: [number, number] }) {
    const { start, end } = area;
    const [startRow, startColumn] = start;
    const [endRow, endColumn] = end;

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        this.grid[row][column] = false;
      }
    }
  }

  public toggle(area: { start: [number, number]; end: [number, number] }) {
    const { start, end } = area;
    const [startRow, startColumn] = start;
    const [endRow, endColumn] = end;

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        this.grid[row][column] = !this.grid[row][column];
      }
    }
  }

  public getLightsOn(): number {
    return this.grid.flat().filter((lightValue) => lightValue).length;
  }
}
