import { Proposal, columns } from "../../components/Table/proposal-columns";
import { ProposalDataTable } from "../../components/Table/proposal-data-table";

import { useEffect, useState } from "react";

async function getData(): Promise<Proposal[]> { 
  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch('http://localhost:3000/proposals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch proposals'); 
    }

    const data = await response.json();
    console.log(data.data); 

    
    const proposals: Proposal[] = data.data.map((item: any) => ({
      id: item.id, 
      projects: `Project ${item.id}`, 
      slugs: item.slug || "", 
      status: "pending", 
      title: item.name || "", 
    }));///may have to change this 

    return proposals; 
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return []; 
  }
}


export default function DemoPage() {
  const [data, setData] = useState<Proposal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  return <ProposalDataTable columns={columns} data={data} />;
}
