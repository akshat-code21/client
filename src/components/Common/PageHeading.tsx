import { PageHeadingProps } from "@/lib/interfaces";

function PageHeading({ title, description, children }: PageHeadingProps) {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className=" text-2xl">
          <b>{title}</b>
        </h1>
        <h3>{description}</h3>
      </div>
      {children}
    </div>
  );
}

export default PageHeading;
