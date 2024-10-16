import { Project, columns } from "../components/Table/columns";
import { DataTable } from "../components/Table/data-table";

import { useEffect, useState } from "react";

async function getData(): Promise<Project[]> { 
  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch('http://localhost:3000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects'); 
    }

    const data = await response.json();
    console.log(data.data); 

    
    const projects: Project[] = data.data.map((item: any) => ({
      id: item.id, 
      projects: `Project ${item.id}`, 
      slugs: item.slug || "", 
      status: "pending", 
      title: item.name || "", 
    }));

    return projects; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; 
  }
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
