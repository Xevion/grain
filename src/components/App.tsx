import { useInterval, useWindowSize, useToggle } from "usehooks-ts";
import useBackground from "@/utils/useBackground";
import Post from "@/components/Post";

import {
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

function App() {
  const { width, height } = useWindowSize();
  const { svg, backgrounds, regenerate } = useBackground({
    width,
    height,
    ratio: 0.4,
  });
  const [postHidden, toggleHidden] = useToggle(false);

  const [iconSpinning, , setIconSpinning] = useToggle(false);
  useInterval(
    () => {
      setIconSpinning(false);
    },
    iconSpinning ? 200 : null
  );

  const style = {
    background: [`url("${svg}")`, ...backgrounds].join(", "),
  };

  return (
    <div
      style={style}
      className="text-zinc-800 gradient max-w-[100vw] max-h-[100vh] overflow-clip"
    >
      <div className="font-inter w-full h-full bg-zinc-800/50 bg-blend-overlay">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-3 sm:col-span-2">
            <button
              className="block p-2 w-10 h-10 rounded mx-auto xs:mx-0 xs:ml-5 mt-5 shadow-inner-md bg-zinc-700 text-zinc-100 button"
              onClick={() => {
                setIconSpinning(true);
                regenerate();
              }}
            >
              <ArrowPathIcon
                className={`transition-transform duration-200 ${
                  iconSpinning ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <button
              className="block p-2 w-10 h-10 rounded mx-auto xs:mx-0 xs:ml-5 mt-5 shadow-inner-md bg-zinc-700 text-zinc-100 button"
              onClick={toggleHidden}
            >
              {postHidden ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </div>
          <div
            className={`h-[100vh] transition-opacity ease-in-out duration-75 ${
              postHidden ? "opacity-0" : ""
            } flex col-span-9 sm:col-span-6 md:col-span-5 w-full min-h-[100vh]`}
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

export default App;
