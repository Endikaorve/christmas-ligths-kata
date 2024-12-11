import { ChristmasLights } from "./ChristmasLights";

describe("ChristmasLights", () => {
  let christmasLights: ChristmasLights;

  beforeEach(() => {
    christmasLights = new ChristmasLights();
  });

  it("todas las luces comienzan apagadas", () => {
    expect(christmasLights.getLightsOn()).toEqual(0);
  });

  it("encendemos todas las luces", () => {
    christmasLights.turnOn({
      start: [0, 0],
      end: [999, 999],
    });

    expect(christmasLights.getLightsOn()).toEqual(1_000_000);
  });

  it("encendemos todas las luces y apagamos la primera columna", () => {
    christmasLights.turnOn({
      start: [0, 0],
      end: [999, 999],
    });

    christmasLights.turnOff({
      start: [0, 0],
      end: [0, 999],
    });

    expect(christmasLights.getLightsOn()).toEqual(999_000);
  });

  it("encendemos todas las luces y apagamos todas las luces", () => {
    christmasLights.turnOn({
      start: [0, 0],
      end: [999, 999],
    });

    christmasLights.turnOff({
      start: [0, 0],
      end: [999, 999],
    });

    expect(christmasLights.getLightsOn()).toEqual(0);
  });

  it("toggleamos todas las luces desde apagadas", () => {
    christmasLights.toggle({
      start: [0, 0],
      end: [999, 999],
    });

    expect(christmasLights.getLightsOn()).toEqual(1_000_000);
  });

  it("toggleamos todas las luces desde encendidas", () => {
    christmasLights.turnOn({
      start: [0, 0],
      end: [999, 999],
    });

    christmasLights.toggle({
      start: [0, 0],
      end: [999, 999],
    });

    expect(christmasLights.getLightsOn()).toEqual(0);
  });
});
