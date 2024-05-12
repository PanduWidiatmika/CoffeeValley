import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import executeQuery from "@/lib/db";

const pump = promisify(pipeline);

export async function GET(req, res) {
  const query = `SELECT * FROM upload`;
  const results = await executeQuery({ query });
  return NextResponse.json({ status: "success", data: results });
}

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const author = formData.get("author");

    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file found in request" });
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-')

    const newFileName = `${timestamp}_${file.name}`

    const filePath = `/file/${newFileName}`;

    const query = `INSERT INTO upload (title, docPath, author) VALUES (?, ?, ?)`;
    await executeQuery({
      query,
      values: [title, filePath, author],
    });

    const absoluteFilePath = path.join(process.cwd(), 'public', 'file', newFileName);

    await pump(file.stream(), fs.createWriteStream(absoluteFilePath));

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}
