export default function Footer() {
  return (
    <footer className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0 md:text-xl"></p>

        <div className="flex -mx-6">
          <a
            href="./pdfs/about-plantfinder.pdf"
            className="mx-3 hover:opacity-80 duration-150"
          >
            Om PlantFinder
          </a>{" "}
          |
          <a
            href="./pdfs/plantfinder-crafting-guide.pdf"
            className="mx-3 hover:opacity-80 duration-150"
          >
            Crafting Guide
          </a>{" "}
          |
          <a
            href="https://github.com/simonmartinnielsen/plantfinder-production"
            className="mx-3 hover:opacity-80 duration-150"
          >
            GitHub
          </a>{" "}
          |
          <a
            href="mailto:post.smn@gmail.com"
            className="mx-3 hover:opacity-80 duration-150"
          >
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
