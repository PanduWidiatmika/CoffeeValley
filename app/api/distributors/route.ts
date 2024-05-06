import { NextResponse } from "next/server";
import executeQuery from "../../../lib/db";
import { Distributor } from "../_utilities/types";

export const GET = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery({
      query: "SELECT * FROM distributors",
      values: [],
    });
    return NextResponse.json({ message: "success", results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};

export const POST = async (req: Request, res: Response) => {
  const { distributor_name, city, region, phone, email }: Distributor = await req.json();

  try {
    const query = `INSERT INTO distributors (distributor_name, city, region, phone, email) VALUES (?, ?, ?, ?, ?)`;
    await executeQuery({
      query,
      values: [distributor_name, city, region, phone, email],
    });
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};
