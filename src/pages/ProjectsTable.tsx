import { Project, columns } from "../components/Table/columns";
import { DataTable } from "../components/Table/data-table";
import { useEffect, useState } from "react";

let isRefreshing = false; // Flag to track if a refresh is in progress
let refreshTokenPromise: Promise<string> | null = null; // Store the ongoing refresh promise

// Function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return tokenData.exp < currentTime;
};

// Function to refresh the token
async function refreshUserTokenFunction(refreshToken: string): Promise<string> {
  if (isRefreshing) {
    if (refreshTokenPromise) {
      return refreshTokenPromise;
    }
  }

  isRefreshing = true; // Set the flag to true while refresh is in progress
  refreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3000/auth/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to refresh token: ${errorMessage}`);
      }

      const data = await response.json();
      const newToken = data.token;
      
      localStorage.setItem('token', newToken); // Store the new token
      resolve(newToken);
    } catch (err) {
      reject(err);
    } finally {
      isRefreshing = false; // Reset the flag when refresh is done
      refreshTokenPromise = null; // Clear the ongoing promise
    }
  });

  return refreshTokenPromise;
}
async function refreshAdminTokenFunction(refreshToken: string): Promise<string> {
  if (isRefreshing) {
    if (refreshTokenPromise) {
      return refreshTokenPromise;
    }
  }

  isRefreshing = true; // Set the flag to true while refresh is in progress
  refreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3000/auth/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to refresh token: ${errorMessage}`);
      }

      const data = await response.json();
      const newToken = data.token;
      
      localStorage.setItem('adminToken', newToken); // Store the new token
      resolve(newToken);
    } catch (err) {
      reject(err);
    } finally {
      isRefreshing = false; // Reset the flag when refresh is done
      refreshTokenPromise = null; // Clear the ongoing promise
    }
  });

  return refreshTokenPromise;
}
async function getAdminData():Promise<Project[]>{
  try {
    let token = localStorage.getItem('adminToken'); 
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      throw new Error('Token or refresh token is missing');
    }

    // Check if the token is expired
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      // If expired, refresh the token
      token = await refreshAdminTokenFunction(refreshToken);
    }
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
async function getData(): Promise<Project[]> {
  try {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      throw new Error('Token or refresh token is missing');
    }

    // Check if the token is expired
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      // If expired, refresh the token
      token = await refreshUserTokenFunction(refreshToken);
    }

    // Make the API request with the valid token
    const response = await fetch('http://localhost:3000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch projects: ${errorMessage}`);
    }

    const data = await response.json();
    console.log(data.data);

    const projects: Project[] = data.data.map((item: any) => ({
      id: item.id,
      projects: `Project ${item.id}`,
      slugs: `${item.id}` || "",
      status: "pending", // You can adjust the logic for status here
      title: item.name || "",
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
// async function getData(): Promise<Project[]> { 
//   try {
//     const token = localStorage.getItem('token'); 

//     const response = await fetch('http://localhost:3000/projects', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, 
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch projects'); 
//     }

//     const data = await response.json();
//     console.log(data.data); 

    
//     const projects: Project[] = data.data.map((item: any) => ({
//       id: item.id, 
//       projects: `Project ${item.id}`, 
//       slugs: `${item.id}` || "", 
//       status: "pending", 
//       title: item.name || "", 
//     }));

//     return projects; 
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return []; 
//   }
// }

// export default function DemoPage() {
// =======
    
//     const projects: Project[] = data.data.map((item: any) => ({
//       id: item.id, 
//       projects: `Project ${item.id}`, 
//       slugs: `${item.id}` || "", 
//       status: "pending", 
//       title: item.name || "", 
//     }));

//     return projects; 
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return []; 
//   }
// }

export function DemoPage() {

  const [data, setData] = useState<Project[]>([]);
  // let token = localStorage.getItem('token');
  // let refreshToken = localStorage.getItem('refreshToken');
  // if (isTokenExpired(token)) {
  //   refreshTokenFunction(refreshToken);
  // }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  return <DataTable columns={columns} data={data} />;
  // );
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