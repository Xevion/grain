import Chance from "chance";
import ReactDOMServer from "react-dom/server";
import { useEventListener, useWindowSize } from "usehooks-ts";
import { useState } from "react";
import { getEdgePoint } from "@/utils";

const chance = Chance();
const colors = [
  "#ed625d",
  "#42b6c6",
  "#f79f88",
  "#446ba6",
  "#4b95f0",
  "#d16ba5",
];

const generateBackground = () => {
  return chance.pickset(colors, 5).map((color) => {
    const [x, y] = getEdgePoint(chance.integer({ min: 0, max: 100 }), 100, 100);
    return `radial-gradient(farthest-corner at ${x}% ${y}%, ${chance.pickone(
      colors
    )}, ${chance.pickone(colors)}, transparent 100%)`;
  });
};

function App() {
  const { width, height } = useWindowSize();
  const [background, setBackground] = useState(generateBackground());

  useEventListener("keydown", (e) => {
    if (e.code != "Enter") return;
    e.preventDefault();

    setBackground(generateBackground());
  });

  const ratio = 0.3;
  const svgWidth = Math.ceil((width ?? 1920) * ratio);
  const svgHeight = Math.ceil((height ?? 1080) * ratio);
  console.log({ svgWidth, svgHeight });

  const noise = (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="2"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <g opacity={0.9}>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </g>
    </svg>
  );

  const svg = `data:image/svg+xml;base64,${window.btoa(
    ReactDOMServer.renderToString(noise)
  )}`;

  const appStyle = {
    background: [`url("${svg}")`, ...background].join(", "),
  };

  return (
    <div style={appStyle} className="gradient">
      <div className="font-inter min-w-[100vw] min-h-[100vh] bg-zinc-800/50 bg-blend-overlay">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-1" />
          <div className="flex col-span-10 md:col-span-8 lg:col-span-6 offset-1 bg-white w-full min-h-[100vh] text-zinc-800">
            <div className="m-3 p-5 border-y-[1px] border-zinc-100">
              <div className="mb-3">
                <h2 className="text-4xl tracking-wide font-semibold drop-shadow-xl">
                  Ryan Walters
                </h2>
                <span className="py-1 text-zinc-500">
                  Published on {new Date().toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  consequat lacus sit amet erat efficitur elementum. Fusce
                  hendrerit bibendum ipsum, sit amet volutpat augue egestas sed.
                  Curabitur ut blandit felis. Suspendisse euismod, orci quis
                  consectetur pretium, libero eros lobortis lacus, vel interdum
                  ex sem sed sapien. Aliquam erat volutpat. Curabitur tempus
                  faucibus lobortis. Nulla sodales ipsum sit amet ligula
                  elementum faucibus. Donec aliquam enim a arcu gravida tempus.
                  Etiam tempus lectus et mauris feugiat, vel imperdiet quam
                  mattis. Suspendisse urna enim, cursus quis nibh et, egestas
                  ultrices tortor. Quisque imperdiet elit molestie lorem
                  placerat posuere. Duis in dolor non elit tempor mattis. Proin
                  vehicula facilisis nibh.
                </p>
                <p>
                  Maecenas rhoncus, erat auctor scelerisque condimentum, nibh
                  magna tristique felis, vitae condimentum mi est quis dui.
                  Fusce non imperdiet massa. Sed varius ultrices odio non
                  faucibus. Pellentesque habitant morbi tristique senectus et
                  netus et malesuada fames ac turpis egestas. Pellentesque
                  semper pulvinar vehicula. Fusce vel convallis eros. Duis
                  cursus feugiat quam, quis sodales enim malesuada non.
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Maecenas in efficitur elit,
                  sed suscipit magna. Duis finibus blandit leo vitae mollis. In
                  et est pulvinar, condimentum est sed, scelerisque nisl. Nunc
                  eleifend eros aliquet libero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
