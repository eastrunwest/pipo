import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/config"

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // const info = await pinata.groups.create({name:'pipo', isPublic:true});
    // console.log(info);
    const uploadData = await pinata.upload.file(file, {
      groupId: '01947615-8e47-775e-9e73-e030f0e207d2',
    });
    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}