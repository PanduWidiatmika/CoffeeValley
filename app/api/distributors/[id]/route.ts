import { NextResponse } from "next/server";
import executeQuery from "../../../../lib/db";
import { Distributor } from "../../_utilities/types";

export const GET = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("distributors/")[1];
    const results = await executeQuery({
      query: "SELECT * FROM distributors WHERE id = ?",
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
  const { distributor_name, city, region, phone, email }: Distributor = await req.json();

  try {
    const id = req.url.split("distributors/")[1];

    await executeQuery({
      query: "UPDATE distributors SET distributor_name = ?, city = ?, region = ?, phone = ?, email = ? WHERE id = ?",
      values: [distributor_name, city, region, phone, email, id],
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
