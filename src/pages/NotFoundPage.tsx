import { buttonVariants } from "@/components/ui/variants";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      <span className="text-4xl">404 Page Not Found !!</span>
      <Link
        className={buttonVariants({
          variant: "default",
          className: "bg-bhasiniBlue",
        })}
        to="/"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
