import { NextResponse } from "next/server";
import fs from "fs";
import path from "path"; // Import the path module
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file found in request" });
    }

    const filePath = path.join(process.cwd(), 'public', 'file', file.name);

    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", data: file.size });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
