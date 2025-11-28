import { visit } from "unist-util-visit";
import { glossary } from "@/content/dict/glossary";

export default function rehypeDict() {
  const vocabulary = glossary.flatMap((item) => [item.term, ...(item.aliases || [])]);
  const regex = new RegExp(`\\b(${vocabulary.join("|")})\\b`, "g");
  const excluded = new Set(["a", "pre", "code", "kbd", "button"]);
  return (tree: any) => {
    if (tree?.data && tree.data.dict === false) return;
    let disabled = false;
    visit(tree, (node: any) => {
      if (disabled) return;
      if (node.type === "comment" && /dict\s*:\s*false/i.test(node.value || "")) disabled = true;
    });
    if (disabled) return;
    visit(tree, "text", (node, index, parent) => {
      if (!parent || excluded.has(parent.tagName)) return;
      const matches = node.value.match(regex);
      if (!matches) return;
      const newNodes: any[] = [];
      let lastIndex = 0;
      node.value.replace(regex, (match: string, _term: string, offset: number) => {
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
    });
  };
}
