import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export function testFs() {
    const blogDir = join(process.cwd(), 'content/blog');
    const files = readdirSync(blogDir, { withFileTypes: true });
    console.log(blogDir)
    console.log(files);
    console.log("hello")
}