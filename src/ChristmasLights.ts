type Instruction = `${Action} ${number},${number} through ${number},${number}`;

const ACTIONS = ["turn on", "turn off", "toggle"] as const;

type Action = (typeof ACTIONS)[number];
type Position = [number, number];
type Area = { start: Position; end: Position };
type Command = { action: Action; area: Area };

export class ChristmasLights {
  private grid: Light[][];

  constructor(size: number = 1000) {
    this.grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => new Light())
    );
  }

  public applyInstruction(instruction: Instruction) {
    const command = this.parseInstructionToCommand(instruction);

    this.applyCommand(command);
  }

  private applyCommand({ action, area }: Command) {
    const UPDATER: Record<Action, () => void> = {
      "turn on": () => this.updateArea(area, (light) => light.turnOn()),
      "turn off": () => this.updateArea(area, (light) => light.turnOff()),
      toggle: () => this.updateArea(area, (light) => light.toggle()),
    };

    UPDATER[action]();
  }

  private parseInstructionToCommand(instruction: Instruction): Command {
    const actionsPattern = ACTIONS.join("|");
    const pattern = `^(${actionsPattern}) (\\d+),(\\d+) through (\\d+),(\\d+)$`;
    const regex = new RegExp(pattern);

    const match = instruction.match(regex);

    if (!match) {
      throw new Error(`Invalid input: ${instruction}`);
    }

    const [, action, startRow, startColumn, endRow, endColumn] = match;

    const start: Position = [parseInt(startRow), parseInt(startColumn)];
    const end: Position = [parseInt(endRow), parseInt(endColumn)];

    return { action: action as Action, area: { start, end } };
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
