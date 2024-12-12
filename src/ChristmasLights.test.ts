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
      christmasLights.applyInstructions(["turn on 0,0 through 999,999"]);

      expect(christmasLights.getLightsOn()).toEqual(1_000_000);
    });

    it("encendemos todas las luces y apagamos todas las luces", () => {
      christmasLights.applyInstructions([
        "turn on 0,0 through 999,999",
        "turn off 0,0 through 999,999",
      ]);

      expect(christmasLights.getLightsOn()).toEqual(0);
    });

    it("toggleamos todas las luces desde apagadas", () => {
      christmasLights.applyInstructions(["toggle 0,0 through 999,999"]);

      expect(christmasLights.getLightsOn()).toEqual(1_000_000);
    });

    it("toggleamos todas las luces desde encendidas", () => {
      christmasLights.applyInstructions([
        "turn on 0,0 through 999,999",
        "toggle 0,0 through 999,999",
      ]);

      expect(christmasLights.getLightsOn()).toEqual(0);
    });

    it("sobrecargamos todas las luces", () => {
      christmasLights.applyInstructions(["boost 0,0 through 999,999"]);

      expect(christmasLights.getLightsOn()).toEqual(1_000_000);
    });

    it("sobrecargamos todas las luces 2 veces", () => {
      christmasLights.applyInstructions([
        "boost 0,0 through 999,999",
        "boost 0,0 through 999,999",
      ]);

      expect(christmasLights.getLightsOn()).toEqual(0);
    });
  });

  describe("brillo", () => {
    it("todas las luces comienzan sin brillo", () => {
      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("encendemos todas las luces", () => {
      christmasLights.applyInstructions(["turn on 0,0 through 999,999"]);

      expect(christmasLights.getTotalBrightness()).toEqual(1_000_000);
    });

    it("encendemos todas las luces y apagamos todas las luces", () => {
      christmasLights.applyInstructions([
        "turn on 0,0 through 999,999",
        "turn off 0,0 through 999,999",
      ]);

      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("apagamos todas las luces sin encenderlas", () => {
      christmasLights.applyInstructions(["turn off 0,0 through 999,999"]);

      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });

    it("toggleamos todas las luces desde apagadas", () => {
      christmasLights.applyInstructions(["toggle 0,0 through 999,999"]);

      expect(christmasLights.getTotalBrightness()).toEqual(2_000_000);
    });

    it("sobrecargamos todas las luces", () => {
      christmasLights.applyInstructions(["boost 0,0 through 999,999"]);

      expect(christmasLights.getTotalBrightness()).toEqual(5_000_000);
    });

    it("sobrecargamos todas las luces 2 veces", () => {
      christmasLights.applyInstructions([
        "boost 0,0 through 999,999",
        "boost 0,0 through 999,999",
      ]);

      expect(christmasLights.getTotalBrightness()).toEqual(0);
    });
  });
});
