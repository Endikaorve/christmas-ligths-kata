import { ChristmasLights } from "./ChristmasLights";

describe("ChristmasLights", () => {
  let christmasLights: ChristmasLights;

  beforeEach(() => {
    christmasLights = new ChristmasLights();
  });

  describe("encender/apagar", () => {
    it("todas las luces comienzan apagadas", () => {
      expect(christmasLights.getLightsOn()).toEqual(0);
    });

    it("encendemos todas las luces", () => {
      christmasLights.applyInstruction("turn on 0,0 through 999,999");

      expect(christmasLights.getLightsOn()).toEqual(1_000_000);
    });

    it("encendemos todas las luces y apagamos todas las luces", () => {
      christmasLights.applyInstruction("turn on 0,0 through 999,999");
      christmasLights.applyInstruction("turn off 0,0 through 999,999");

      expect(christmasLights.getLightsOn()).toEqual(0);
    });

    it("toggleamos todas las luces desde apagadas", () => {
      christmasLights.applyInstruction("toggle 0,0 through 999,999");

      expect(christmasLights.getLightsOn()).toEqual(1_000_000);
    });

    it("toggleamos todas las luces desde encendidas", () => {
      christmasLights.applyInstruction("turn on 0,0 through 999,999");
      christmasLights.applyInstruction("toggle 0,0 through 999,999");

      expect(christmasLights.getLightsOn()).toEqual(0);
    });
  });

  describe("brillo", () => {
    it("todas las luces comienzan sin brillo", () => {
      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("encendemos todas las luces", () => {
      christmasLights.applyInstruction("turn on 0,0 through 999,999");

      expect(christmasLights.getTotalBrightness()).toEqual(1_000_000);
    });

    it("encendemos todas las luces y apagamos todas las luces", () => {
      christmasLights.applyInstruction("turn on 0,0 through 999,999");
      christmasLights.applyInstruction("turn off 0,0 through 999,999");

      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("apagamos todas las luces sin encenderlas", () => {
      christmasLights.applyInstruction("turn off 0,0 through 999,999");

      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("toggleamos todas las luces desde apagadas", () => {
      christmasLights.applyInstruction("toggle 0,0 through 999,999");

      expect(christmasLights.getTotalBrightness()).toEqual(2_000_000);
    });
  });
});
