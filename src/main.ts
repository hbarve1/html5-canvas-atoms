import "./style.css";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;
const ratio = window.devicePixelRatio;

const width = windowWidth * ratio;
const height = windowHeight * ratio;

canvas.width = width;
canvas.height = height;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;

const SMALL_CIRCLE_RADIUS = 10;

// [protons, neutrons, electrons, name]
const elementNames = [
  [1, 0, 1, "Hydrogen"],
  [2, 2, 2, "Helium"],
  [3, 3, 3, "Lithium"],
  [4, 4, 4, "Beryllium"],
  [5, 5, 5, "Boron"],
  [6, 6, 6, "Carbon"],
  [7, 7, 7, "Nitrogen"],
  [8, 8, 8, "Oxygen"],
  [9, 9, 9, "Fluorine"],
  [10, 10, 10, "Neon"],
  [11, 11, 11, "Sodium"],
  [12, 12, 12, "Magnesium"],
  [13, 13, 13, "Aluminum"],
  [14, 14, 14, "Silicon"],
  [15, 15, 15, "Phosphorus"],
  [16, 16, 16, "Sulfur"],
  [17, 17, 17, "Chlorine"],
  [18, 18, 18, "Argon"],
  [19, 19, 19, "Potassium"],
  [20, 20, 20, "Calcium"],
  [21, 21, 21, "Scandium"],
  [22, 22, 22, "Titanium"],
  [23, 23, 23, "Vanadium"],
  [24, 24, 24, "Chromium"],
  [25, 25, 25, "Manganese"],
  [26, 26, 26, "Iron"],
  [27, 27, 27, "Cobalt"],
  [28, 28, 28, "Nickel"],
  [29, 29, 29, "Copper"],
  [30, 30, 30, "Zinc"],
  [31, 31, 31, "Gallium"],
  [32, 32, 32, "Germanium"],
  [33, 33, 33, "Arsenic"],
  [34, 34, 34, "Selenium"],
  [35, 35, 35, "Bromine"],
  [36, 36, 36, "Krypton"],
  [37, 37, 37, "Rubidium"],
  [38, 38, 38, "Strontium"],
  [39, 39, 39, "Yttrium"],
  [40, 40, 40, "Zirconium"],
  [41, 41, 41, "Niobium"],
  [42, 42, 42, "Molybdenum"],
  [43, 43, 43, "Technetium"],
  [44, 44, 44, "Ruthenium"],
  [45, 45, 45, "Rhodium"],
  [46, 46, 46, "Palladium"],
  [47, 47, 47, "Silver"],
  [48, 48, 48, "Cadmium"],
  [49, 49, 49, "Indium"],
  [50, 50, 50, "Tin"],
  [51, 51, 51, "Antimony"],
  [52, 52, 52, "Tellurium"],
  [53, 53, 53, "Iodine"],
  [54, 54, 54, "Xenon"],
  [55, 55, 55, "Cesium"],
  [56, 56, 56, "Barium"],
  [57, 57, 57, "Lanthanum"],
  [58, 58, 58, "Cerium"],
  [59, 59, 59, "Praseodymium"],
  [60, 60, 60, "Neodymium"],
  [61, 61, 61, "Promethium"],
  [62, 62, 62, "Samarium"],
  [63, 63, 63, "Europium"],
  [64, 64, 64, "Gadolinium"],
  [65, 65, 65, "Terbium"],
  [66, 66, 66, "Dysprosium"],
  [67, 67, 67, "Holmium"],
  [68, 68, 68, "Erbium"],
  [69, 69, 69, "Thulium"],
  [70, 70, 70, "Ytterbium"],
  [71, 71, 71, "Lutetium"],
  [72, 72, 72, "Hafnium"],
  [73, 73, 73, "Tantalum"],
  [74, 74, 74, "Tungsten"],
  [75, 75, 75, "Rhenium"],
  [76, 76, 76, "Osmium"],
  [77, 77, 77, "Iridium"],
  [78, 78, 78, "Platinum"],
  [79, 79, 79, "Gold"],
  [80, 80, 80, "Mercury"],
  [81, 81, 81, "Thallium"],
  [82, 82, 82, "Lead"],
  [83, 83, 83, "Bismuth"],
  [84, 84, 84, "Polonium"],
  [85, 85, 85, "Astatine"],
  [86, 86, 86, "Radon"],
  [87, 87, 87, "Francium"],
  [88, 88, 88, "Radium"],
  [89, 89, 89, "Actinium"],
  [90, 90, 90, "Thorium"],
  [91, 91, 91, "Protactinium"],
  [92, 92, 92, "Uranium"],
  [93, 93, 93, "Neptunium"],
  [94, 94, 94, "Plutonium"],
  [95, 95, 95, "Americium"],
  [96, 96, 96, "Curium"],
  [97, 97, 97, "Berkelium"],
  [98, 98, 98, "Californium"],
  [99, 99, 99, "Einsteinium"],
  [100, 100, 100, "Fermium"],
  [101, 101, 101, "Mendelevium"],
  [102, 102, 102, "Nobelium"],
  [103, 103, 103, "Lawrencium"],
  [104, 104, 104, "Rutherfordium"],
  [105, 105, 105, "Dubnium"],
  [106, 106, 106, "Seaborgium"],
  [107, 107, 107, "Bohrium"],
  [108, 108, 108, "Hassium"],
  [109, 109, 109, "Meitnerium"],
  [110, 110, 110, "Darmstadtium"],
  [111, 111, 111, "Roentgenium"],
  [112, 112, 112, "Copernicium"],
  [113, 113, 113, "Nihonium"],
  [114, 114, 114, "Flerovium"],
  [115, 115, 115, "Moscovium"],
  [116, 116, 116, "Livermorium"],
  [117, 117, 117, "Tennessine"],
  [118, 118, 118, "Oganesson"],
] as [number, number, number, string][];

class Circle {
  constructor(
    public x: number,
    public y: number,
    public r: number,
    public color: string,
  ) {}

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }
}

class Path {
  constructor(
    public x: number,
    public y: number,
    public r: number,
    public color: string,
  ) {}

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = this.color;
    context.stroke();
  }
}

class Atom {
  private shells = [2, 8, 18, 32, 50, 72, 98, 128, 162, 200, 242, 288, 338];

  constructor(
    public id: number,
    public protons: number,
    public neutrons: number,
    public electrons: number,
    public name: string,
  ) {}

  draw(timestamp: number) {
    const center = { x: windowWidth / 2, y: windowHeight / 2 };
    const radius = 190;

    const electronShellResult = this.shells.reduce(
      (previous, current, index) => {
        if (previous.totalElectrons <= 0) {
          return previous;
        }

        if (current < this.electrons) {
          return {
            totalElectrons: previous.totalElectrons - current,
            shellIndex: index + 1,
          };
        }

        return {
          totalElectrons: previous.totalElectrons,
          shellIndex: previous.shellIndex,
        };
      },
      { totalElectrons: this.electrons, shellIndex: 1 },
    );
    const { shellIndex: electronShell } = electronShellResult;

    let electrons = this.electrons;

    for (let i = 1; i <= electronShell; i++) {
      const electronRadius = radius + electronShell * 10 * i;

      const path = new Path(center.x, center.y, electronRadius, "blue");
      path.draw();

      const electronCount = Math.min(electrons, 2 * i * i);
      electrons -= electronCount;

      (
        Array.from({ length: electronCount }).map((_, idx) => {
          const radian = timestamp / 1000 + (Math.PI * idx * 2) / electronCount;

          return new Circle(
            center.x - Math.sin(radian) * electronRadius,
            center.y + Math.cos(radian) * electronRadius,
            SMALL_CIRCLE_RADIUS,
            "blue",
          );
        }) as Circle[]
      ).map((circle: Circle) => circle.draw());
    }

    const neuclideShells = [1, 6, 12, 18, 24, 30, 37, 44, 52, 60, 69, 78, 88];
    let totalNeucliousCount = this.protons + this.neutrons;
    for (let j = 0; j < neuclideShells.length; j++) {
      if (totalNeucliousCount <= 0) {
        break;
      }
      const neuclideRadius = 2 * SMALL_CIRCLE_RADIUS * j;
      const neucliousCount = neuclideShells[j];
      (
        Array.from({ length: neucliousCount }).map((_, idx) => {
          if (totalNeucliousCount <= 0) {
            return;
          }
          totalNeucliousCount -= 1;

          const radian =
            timestamp / 1000 + (Math.PI * idx * 2) / neucliousCount;

          return new Circle(
            center.x - Math.sin(radian) * neuclideRadius,
            center.y + Math.cos(radian) * neuclideRadius,
            SMALL_CIRCLE_RADIUS,
            "red",
          );
        }) as Circle[]
      )
        .filter(Boolean)
        .map((circle: Circle) => circle.draw());
    }
  }
}

const atomIndex = 117;
function drawAtom(timestamp: number) {
  const index = atomIndex;
  const [protons, neutrons, electrons, name] = elementNames[index];

  const atom = new Atom(index, protons, neutrons, electrons, name);
  atom.draw(timestamp);
}

function animate(timestamp: number) {
  // const dt = timestamp - oldTimestamp;
  // oldTimestamp = timestamp;
  context.clearRect(0, 0, width, height);
  drawAtom(timestamp);

  requestAnimationFrame((timestamp) => animate(timestamp));
}
requestAnimationFrame((timestamp) => animate(timestamp));
