import * as functions from "firebase-functions";
import * as express from "express";
import {EscPos} from "@tillpos/xml-escpos-helper";
import * as fs from "fs";

const app = express();

app.use(express.json());

app.post("/printReceipt", async (req, res) => {
  try {
    const template = fs.readFileSync("./sample.xml", {encoding: "utf8"});

    const PRINTER = {
      device_name: "Epson TM-M30",
      host: "192.168.0.106",
      port: 9100,
    };

    const sampleInputData = {
      title: "Hello World!",
      date: "07-08-2021",
    };

    const message:any = generateBuffer(template, sampleInputData);
    await sendMsgToPrinter(PRINTER.host, PRINTER.port, message);

    res.status(200).json({message: "Receipt printed successfully"});
  } catch (error) {
    console.error("Error printing receipt:", error);
    res.status(500).json({error: "Error printing receipt"});
  }
});

const generateBuffer = (template: string, data: any) => {
  return EscPos.getBufferFromTemplate(template, data);
};

const sendMsgToPrinter=async (host:string, port:number, message:Buffer) => {
  try {
    // Implement your connectToPrinter logic here
  } catch (err) {
    console.log("Error sending message to printer:", err);
    throw err;
  }
};

export const printReceipt = functions.https.onRequest(app);
