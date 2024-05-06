import { NextResponse } from "next/server";
import executeQuery from "../../../lib/db";
import { User } from "../_utilities/types";

export const GET = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery({
      query: "SELECT * FROM users",
      values: [],
    });
    // console.log("Query results:", results);
    return NextResponse.json({ message: "success", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};

export const POST = async (req: Request, res: Response) => {
  const { name, age, address, photos }: User = await req.json();

  try {
    const query = `INSERT INTO users (name, age, address, photos) VALUES (?, ?, ?, ?)`;
    await executeQuery({
      query,
      values: [name, age, address, photos],
    });
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};

// export const GET = async (req: Request, res: Response) => {
//   try {
//     const users = getUser();
//     return NextResponse.json({ message: "success", users }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }.error, {
//       status: 500,
//     });
//   }
// };

// export const POST = async (req: Request, res: Response) => {
//   const { name, age, address, photo } = await req.json();

//   try {
//     const user = { name, age, address, photo, id: Date.now().toString() };
//     addUser(user);
//     return NextResponse.json({ message: "success", user }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "error", error }.error, {
//       status: 500,
//     });
//   }
// };
