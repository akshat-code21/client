import { Project, columns } from "../components/Table/columns";
import { DataTable } from "../components/Table/data-table";

import { useEffect, useState } from "react";

async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      projects: "Project 1",
      slugs: "project-1",
      status: "pending",
      title: "We need to bypass the neutral TCP sensor!",
    },
    {
      id: "728ed52g",
      projects: "Project 2",
      slugs: "project-2",
      status: "processing",
      title:
        "Use the open-source THX transmitter, then you can hack the auxiliary sensor!",
    },
    {
      id: "728ed52h",
      projects: "Project 3",
      slugs: "project-3",
      status: "success",
      title:
        "Try to quantify the HTTP transmitter, maybe it will bypass the digital firewall!",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  return <DataTable columns={columns} data={data} />;
}
