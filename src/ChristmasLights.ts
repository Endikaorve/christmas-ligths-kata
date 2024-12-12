type Position = [number, number];
type Area = { start: Position; end: Position };
type Action = "turn on" | "turn off";
type Command = Area & { action: Action };

export class ChristmasLights {
  private grid: Light[][] = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => new Light())
  );

  public turnOn(area: Area) {
    this.updateArea(area, (light) => light.turnOn());
  }

  public turnOff(area: Area) {
    this.updateArea(area, (light) => light.turnOff());
  }

  public toggle(area: Area) {
    this.updateArea(area, (light) => light.toggle());
  }

  public applyCommand({ action, start, end }: Command) {
    if (action === "turn on") {
      this.turnOn({
        start,
        end,
      });
    }

    if (action === "turn off") {
      this.turnOff({
        start,
        end,
      });
    }
  }

  private updateArea(
    { start, end }: Area,
    updateLight: (light: Light) => void
  ) {
    const [startRow, startColumn] = start;
    const [endRow, endColumn] = end;

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        const light = this.grid[row][column];
        updateLight(light);
      }
    }
  }

  public getLightsOn(): number {
    return this.grid.flat().filter((light) => light.isOn()).length;
  }

  public getTotalBrightness(): number {
    return this.grid
      .flat()
      .reduce(
        (totalBrightness, light) => totalBrightness + light.getBrightness(),
        0
      );
  }
}

class Light {
  private state: boolean = false;
  private brightness: number = 0;

  public turnOn(): void {
    this.state = true;
    this.brightness += 1;
  }

  public turnOff(): void {
    this.state = false;
    this.brightness = Math.max(0, this.brightness - 1);
  }

  public toggle(): void {
    this.state = !this.state;
    this.brightness += 2;
  }

  public isOn(): boolean {
    return this.state;
  }

  public getBrightness(): number {
    return this.brightness;
  }
}
