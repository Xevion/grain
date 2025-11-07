import { hydrate, prerender as ssr } from "preact-iso";

import "./index.css";

import { useViewportSize } from "./utils/useViewportSize";
import { useBooleanToggle } from "./utils/useBooleanToggle";
import useBackground from "./utils/useBackground";
import Post from "./components/Post";
import { RefreshCw, Eye, EyeOff } from "lucide-preact";
import { useMemo } from "preact/hooks";

export function App() {
  const { width, height } = useViewportSize();
  const { svg, backgrounds, regenerate } = useBackground({
    width,
    height,
    ratio: 0.4,
  });
  const [postHidden, toggleHidden] = useBooleanToggle(false);
  const [iconSpinning, toggleIconSpinning] = useBooleanToggle(false);

  const style = useMemo(() => {
    return {
      background: [`url("${svg}")`, ...backgrounds].join(", "),
    };
  }, [svg, backgrounds]);

  return (
    <div
      style={style}
      className="text-zinc-800 gradient max-w-screen max-h-screen overflow-clip"
    >
      <div className="font-inter w-full h-full bg-zinc-800/50 bg-blend-overlay">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-3 sm:col-span-2">
            <button
              className="block p-2 w-10 h-10 rounded mx-auto xs:mx-0 xs:ml-5 mt-5 shadow-inner-md bg-zinc-700 text-zinc-100 button"
              onClick={() => {
                toggleIconSpinning(true);
                regenerate();
                setTimeout(() => toggleIconSpinning(false), 200);
              }}
            >
              <RefreshCw
                className={`transition-transform duration-200 ${
                  iconSpinning ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <button
              className="block p-2 w-10 h-10 rounded mx-auto xs:mx-0 xs:ml-5 mt-5 shadow-inner-md bg-zinc-700 text-zinc-100 button"
              onClick={() => toggleHidden()}
            >
              {postHidden ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <div
            className={`h-screen transition-opacity ease-in-out duration-75 ${
              postHidden ? "opacity-0 pointer-events-none" : ""
            } flex col-span-9 sm:col-span-6 md:col-span-5 w-full min-h-screen`}
          >
            <div className="bg-white overflow-y-auto">
              <Post />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("root"));
}

export async function prerender(data: any) {
  return await ssr(<App {...data} />);
}
