interface SectionHeadingProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

function SectionHeading({ title, description, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className=" text-xl">
            <b>{title}</b>
          </h1>
          {description && <h3>{description}</h3>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default SectionHeading;
