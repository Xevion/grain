const Post = () => {
  return (
    <>
      <div className="m-5 p-5 w-[90%]">
        <div className="mb-5">
          <h2 className="text-4xl pb-1 tracking-wide font-semibold drop-shadow-xl">
            Grain
          </h2>
          <span className="pl-1 py-1 text-zinc-500">
            Created by{" "}
            <a
              href="https://github.com/Xevion"
              target="_blank"
              className="text-zinc-800 hover:text-sky-700"
            >
              Ryan Walters
            </a>
          </span>
        </div>
        <h4 className="text-xl font-semibold">What?</h4>
        <div className="space-y-2">
          <p>
            A small experiment on creating beautiful, dynamic backgrounds with
            colorful gradients & film grain.
          </p>
        </div>
      </div>
    </>
  );
};
export default Post;
