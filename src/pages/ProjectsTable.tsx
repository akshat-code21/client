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
      slugs: `${item.id}` || "", 
      status: "pending", 
      title: item.name || "", 
    }));

    return projects; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; 
  }
}
async function getAdminData():Promise<Project[]>{
  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch('http://localhost:3000/admin/projects', {
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
      slugs: `${item.id}` || "", 
      status: "pending", 
      title: item.name || "", 
    }));

    return projects; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; 
  }
}

export function DemoPage() {
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
export function AdminDemoPage(){
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    const fetchAdminData = async () => {
      const data = await getAdminData();
      setData(data);
    };
    fetchAdminData();
  }, []);
  return <DataTable columns={columns} data={data} />;
}

