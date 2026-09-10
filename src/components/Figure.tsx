const Figure = ({
  caption,
  children,
}: {
  caption: React.ReactNode;
  children: React.ReactNode;
}) => (
  <figure className="my-14">
    <div className="w-full overflow-x-auto">{children}</div>
    <figcaption className="mt-4 max-w-[62ch] border-t border-border pt-3 font-mono-label !leading-[1.6]">
      {caption}
    </figcaption>
  </figure>
);

export default Figure;
