import { SparklesIcon } from "@heroicons/react/20/solid";

const Post = () => {
  return (
    <>
      <div className="m-5 md:m-8 md:mt-5 w-[90%]">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl pb-1 tracking-wide font-semibold drop-shadow-xl">
            Grain
          </h2>
          <span className="pl-1 py-1 text-zinc-500">
            Created by{" "}
            <a
              href="https://xevion.dev"
              target="_blank"
              className="transition-colors text-sky-800 hover:text-sky-600"
            >
              Ryan Walters
            </a>
            <a href="https://github.com/Xevion" target="_blank" className="hover:text-yellow-600 transition-colors cursor-pointer">
              <SparklesIcon className="h-4 inline mb-2.5 m-2 " />
            </a>
          </span>
        </div>
        <div className="space-y-4">
          <p className="semibold-children">
            A small experiment on creating beautiful, dynamic backgrounds with
            colorful gradients & film grain. Built in <b>React</b> & <b>Vite</b>{" "}
            with <b>SVGs</b> and layers of <b>Radial Gradients</b>.
          </p>
          <p>
            This app was inspired by the gradients used{" "}
            <a
              href="https://www.instagram.com/p/ClUe3ONJaER/"
              target="_blank"
              className="text-sky-800 hover:text-sky-600"
            >
              certain popular instagram post
            </a>{" "}
            with beautiful gradients and a slight film grain applied. I wanted
            to create something similar, but in a website form.
          </p>
          <p>
            By using a SVG with a{" "}
            <pre className="inline">&lt;feTurbulence&gt;</pre> filter inside,
            stacked upon several <pre className="inline">radial-gradient</pre>{" "}
            background images, the same effect can be created. Since SVGs do not
            naturally repeat internally, the SVG itself must be generated in
            such a way that the noise always displays the same way.
          </p>
          <p>
            React comes in handy here, allowing composition of an SVG, and then
            conversion to a <pre className="inline">base64</pre> encoded string.
            As a <pre className="inline">base64</pre> image, it can be fed into
            the <pre className="inline">background</pre> CSS property, allowing
            dynamic SVG generation.
          </p>
        </div>
      </div>
    </>
  );
};
export default Post;
