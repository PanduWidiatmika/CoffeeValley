import { NextResponse } from "next/server";
import executeQuery from "../../../lib/db";
import { Coffee } from "../_utilities/types";

export const GET = async (req: Request, res: Response) => {
  try {
    const results = await executeQuery({
      query: "SELECT * FROM catalogue",
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
  const { bean, description, price }: Coffee = await req.json();

  try {
    const query = `INSERT INTO catalogue (bean, description, price) VALUES (?, ?, ?)`;
    await executeQuery({
      query,
      values: [bean, description, price],
    });
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }.error, {
      status: 500,
    });
  }
};
