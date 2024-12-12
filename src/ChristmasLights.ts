const ACTIONS = ["turn on", "turn off", "toggle", "boost"] as const;
type Action = (typeof ACTIONS)[number];

type Instruction = `${Action} ${number},${number} through ${number},${number}`;

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

  public applyInstructions(instructions: Instruction[]) {
    instructions.forEach((instruction) => this.applyInstruction(instruction));
  }

  private applyInstruction(instruction: Instruction) {
    const command = this.parseInstructionToCommand(instruction);

    this.applyCommand(command);
  }

  private applyCommand({ action, area }: Command) {
    const performAction = (action: (light: Light) => void) =>
      this.updateArea(area, action);

    const AREA_UPDATER: Record<Action, () => void> = {
      "turn on": () => performAction((light) => light.turnOn()),
      "turn off": () => performAction((light) => light.turnOff()),
      toggle: () => performAction((light) => light.toggle()),
      boost: () => performAction((light) => light.boost()),
    };

    AREA_UPDATER[action]();
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

    const area: Area = {
      start: [parseInt(startRow), parseInt(startColumn)],
      end: [parseInt(endRow), parseInt(endColumn)],
    };

    return { action: action as Action, area };
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
  private hasBeenBoosted: boolean = false;

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

  public boost(): void {
    if (this.hasBeenBoosted) {
      this.state = false;
      this.brightness = 0;
    } else {
      this.state = true;
      this.brightness += 5;
    }

    this.hasBeenBoosted = true;
  }

  public isOn(): boolean {
    return this.state;
  }

  public getBrightness(): number {
    return this.brightness;
  }
}
