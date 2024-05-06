"use client";
import React, { useState, useEffect } from "react";
import TableComponent from "../components/Table";
import { User } from "../api/_utilities/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableComponent data={users} />
    </div>
  );
}
