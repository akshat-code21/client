import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const item = {
  title: "Project Title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  level: "Beginner",
  skills: ["React", "Node", "MongoDB"],
  proposals: 5,
};

function ProjectCard() {
  return (
    <Card key={item.title} className="w-full lg:min-w-[400px] ">
      <CardHeader>
        <CardTitle className="flex gap-4 items-center justify-between">
          <div>{item.title}</div>
          {/* <Badge variant="outline">{item.proposals}+</Badge> */}
          <Badge variant="outline">{item.level}</Badge>
        </CardTitle>

        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <span>{item.description}</span>
      </CardContent>
      <CardFooter className="flex gap-4 items-start flex-col">
        <div className="flex gap-2">
          {item.skills.map((skill) => (
            <Badge variant="outline">{skill}</Badge>
          ))}
        </div>
        {/* <span>Propsals : {item.proposals}</span> */}
        <Button className="w-full bg-bhasiniBlue">View Project</Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
