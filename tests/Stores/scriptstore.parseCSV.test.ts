/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

import { describe } from "node:test";
import { nodeB64 } from "./utils/nodeFileBase64";
import { edgeB64 } from "./utils/edgeFileBase64";
import { it, expect } from "vitest";

const dayjs = useDayjs();

describe('edgelist', () => {
    const edgeBuffer = Buffer.from(edgeB64, 'base64');
    const edgeBlob = new Blob([edgeBuffer]);
    const edgeFile: File = {
        name: "edge.csv",
        lastModified: dayjs().unix(),
        webkitRelativePath: "",
        ...edgeBlob,
    }
    const scriptStore = useScriptStore();

    it("reads the file - parseless", async () => {
        const { parseless } = await scriptStore.readCSV(edgeFile, { type: "noparse" });
        expect(parseless!.length).toBe(163);
        expect(parseless![0]).toStrictEqual({
            from: "Compliance with SGP norms",
            to: "benefit of all",
            speaker: "Merkel Angela",
            weight: "1",
            edge_value: "1",
            edge_id: "0",
            map_id: "37",
            map_date: "20-05-2010",
            "value.x": "",
            "value.y": ""
        })
    });
    
    it("reads the file - edge parsing", async () => {
        const { edgelist } = await scriptStore.readCSV(edgeFile, { type: "edgelist" });
        expect(edgelist!.length).toBe(163);

        // Id is backreferenced since it is a UUID random assignement.
        expect(edgelist![0]).toStrictEqual({
            id: edgelist![0].id!,
            from: undefined,
            to: undefined,
            fromName: "Compliance with SGP norms",
            toName: "benefit of all",
            speaker: "Merkel Angela",
            weight: 1,
            edgeValue: 1,
            mapId: "37",
            mapDate: dayjs("2010-05-20").toISOString(),
            valueX: undefined,
            valueY: undefined
        });
    });
});

describe('nodelist', () => {
    const nodeBuffer = Buffer.from(nodeB64, 'base64');
    const nodeBlob = new Blob([nodeBuffer]);
    const nodeFile: File = {
        name: "node.csv",
        lastModified: dayjs().unix(),
        webkitRelativePath: "",
        ...nodeBlob,
    }
    const scriptStore = useScriptStore();

    it("reads the file - parseless", async () => {
        const { parseless } = await scriptStore.readCSV(nodeFile, { type: "noparse" });
        expect(parseless!.length).toBe(99);
        expect(parseless![0]).toStrictEqual({
            id: "3",
            node_name: "[E]CB independence",
            paradigms: "Ordoliberal",
            int: "Supranational",
            value: "1",
            instr: "NA",
            Keynesian: "0",
            Ordoliberal: "1"

        });
    });
    it("reads the file - node parsing", async () => {
        const { nodelist } = await scriptStore.readCSV(nodeFile, { type: "nodelist" });
        expect(nodelist!.length).toBe(99);
        expect(nodelist![0]).toStrictEqual({
            degrees: {
                all: 0,
                in: 0,
                out: 0,
            },
            evaluation: {
                inputValue: 1,
            },
            id: 3,
            instr: undefined,
            int: "Supranational",
            nodeName: "[E]CB independence",
            paradigm: "Ordoliberal",
            weightedDegrees: {
                all: 0,
                in: 0,
                out: 0,
            },
        });
    });
});