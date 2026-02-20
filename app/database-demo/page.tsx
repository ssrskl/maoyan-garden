"use client";

import { DatabaseTable } from "@/components/database/database-table";
import { DatabaseData } from "@/components/database/database-schema";

// const SAMPLE_DATA: DatabaseData = {
//     columns: [
//         { id: "title", title: "Name", type: "text", width: 250 },
//         {
//             id: "status",
//             title: "Status",
//             type: "select",
//             width: 150,
//             options: [
//                 { id: "todo", label: "To Do", color: "#e3e2e0" },
//                 { id: "in-progress", label: "In Progress", color: "#d3e5ef" },
//                 { id: "done", label: "Done", color: "#dbeddb" },
//             ],
//         },
//         {
//             id: "tags",
//             title: "Tags",
//             type: "multi-select",
//             width: 250,
//             options: [
//                 { id: "feature", label: "Feature", color: "#fdecc8" },
//                 { id: "bug", label: "Bug", color: "#ffe2dd" },
//                 { id: "enhancement", label: "Enhancement", color: "#e8deee" },
//                 { id: "documentation", label: "Documentation", color: "#d3e5ef", url: "https://nextjs.org/docs" },
//             ],
//         },
//         {
//             id: "resources",
//             title: "Resources",
//             type: "multi-select",
//             width: 300,
//             options: [
//                 { id: "github", label: "GitHub", color: "#333333", url: "https://github.com" },
//                 { id: "stackoverflow", label: "Stack Overflow", color: "#f48024", url: "https://stackoverflow.com" },
//                 { id: "mdn", label: "MDN", color: "#83d0f2", url: "https://developer.mozilla.org" },
//             ],
//         },
//         { id: "effort", title: "Effort", type: "number", width: 100 },
//         { id: "link", title: "Related Link", type: "url", width: 200 },
//     ],
//     rows: [
//         {
//             id: "1",
//             cells: {
//                 title: "Implement Database Component",
//                 status: "in-progress",
//                 tags: ["feature", "documentation"],
//                 resources: ["github", "mdn"],
//                 effort: 5,
//                 link: "https://notion.so",
//             },
//         },
//         {
//             id: "2",
//             cells: {
//                 title: "Fix Navigation Bug",
//                 status: "todo",
//                 tags: ["bug"],
//                 resources: ["stackoverflow"],
//                 effort: 2,
//             },
//         },
//         {
//             id: "3",
//             cells: {
//                 title: "Update Documentation",
//                 status: "done",
//                 tags: ["documentation"],
//                 resources: ["github", "mdn"],
//                 effort: 1,
//                 link: "https://nextjs.org",
//             },
//         },
//     ],
// };

export default function DatabaseDemoPage() {
    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Database Component Demo</h1>
                <p className="text-muted-foreground">
                    A Notion-like database component with interactive cells.
                </p>
            </div>

            {/* <DatabaseTable initialData={SAMPLE_DATA} /> */}
        </div>
    );
}
