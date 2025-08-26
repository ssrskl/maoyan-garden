import { visit } from "unist-util-visit";
import { glossary } from "@/content/dict/glossary";

export default function rehypeDict() {
  const terms = glossary.map((item) => item.term);
  const regex = new RegExp(`\\b(${terms.join("|")})\\b`, "g");
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      if (parent.tagName === 'a' || parent.tagName === 'pre' || parent.tagName === 'code') return;
      const matches = node.value.match(regex);
      if (matches) {
        const newNodes = [];
        let lastIndex = 0;
        node.value.replace(regex, (match: any, term: any, offset: any) => {
          if (offset > lastIndex) {
            newNodes.push({ type: "text", value: node.value.slice(lastIndex, offset) });
          }
          const newNode = {
            type: "element",
            tagName: "DictTooltip",
            properties: {},
            children: [{ type: "text", value: match }],
          };
          newNodes.push(newNode);
          lastIndex = offset + match.length;
          return match;
        });
        if (lastIndex < node.value.length) {
          newNodes.push({ type: "text", value: node.value.slice(lastIndex) });
        }
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}