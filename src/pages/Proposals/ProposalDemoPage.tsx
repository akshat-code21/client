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
  // return [
  //   {
  //     id: "728ed52f",
  //     proposals: "Project 1",
  //     slugs: "proposal-1",
  //     status: "pending",
  //     title: "We need to bypass the neutral TCP sensor!",
  //   },
  //   {
  //     id: "728ed52g",
  //     proposals: "Project 2",
  //     slugs: "proposal-2",
  //     status: "processing",
  //     title:
  //       "Use the open-source THX transmitter, then you can hack the auxiliary sensor!",
  //   },
  //   {
  //     id: "728ed52h",
  //     proposals: "Project 3",
  //     slugs: "proposal-3",
  //     status: "success",
  //     title:
  //       "Try to quantify the HTTP transmitter, maybe it will bypass the digital firewall!",
  //   },
  // ];
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
