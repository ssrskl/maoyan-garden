import { NextResponse } from "next/server";
import { compile } from "@mdx-js/mdx";

type CompileRequest = {
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CompileRequest;
    const source = body?.source ?? "";

    if (!source.trim()) {
      return NextResponse.json({ code: "" });
    }

    const file = await compile(source, {
      format: "mdx",
      outputFormat: "function-body",
      providerImportSource: undefined,
      development: false,
    });

    return NextResponse.json({ code: String(file.value) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "编译失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
