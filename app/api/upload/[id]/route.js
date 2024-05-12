import { NextResponse } from "next/server";
import fs from "fs";
import { promisify } from "util";
import executeQuery from "@/lib/db";
import path from "path";
import mime from "mime-types"; // Assuming you install `mime-types` package

const readFile = promisify(fs.readFile);

export async function GET(req, res) {
  const id = req.url.split("upload/")[1];

  const results = await executeQuery({
    query: "SELECT * FROM upload WHERE id = ?",
    values: [id],
  });

  if (!results.length) {
    return NextResponse.json({ status: "error", message: "File not found" });
  }

  const filePath = path.join(process.cwd(), "public", `${results[0].docPath}`);

  try {
    const fileData = await readFile(filePath);
    const base64Data = Buffer.from(fileData).toString("base64");
    const contentType = mime.lookup(results[0].docPath);
    const fileExtension = path.extname(filePath)

    const response = {
      status: "success",
      data: base64Data,
      filename: `${results[0].title}.docx`,
      contentType,
      fileExtension,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ status: "error", message: "Failed to download file" });
  }
}
