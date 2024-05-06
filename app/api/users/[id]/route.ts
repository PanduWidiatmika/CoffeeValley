import { NextResponse } from "next/server";
import executeQuery from "../../../../lib/db";
import { User } from "../../_utilities/types";

export const GET = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("users/")[1];
    const results = await executeQuery({
      query: "SELECT * FROM users WHERE id = ?",
      values: [id],
    });
    return NextResponse.json({ message: "success", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};

export const PUT = async (req: Request, res: Response) => {
  const { name, age, address, photos }: User = await req.json();

  try {
    const id = req.url.split("users/")[1];

    const results = await executeQuery({
      query: "UPDATE users SET name = ?, age = ?, address = ?, photos = ? WHERE id = ?",
      values: [name, age, address, photos, id],
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("users/")[1];

    const results = await executeQuery({
      query: "DELETE FROM users WHERE id = ?",
      values: [id],
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};
