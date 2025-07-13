import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";

export function ngAdd(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info("Updating tsconfig.json…");

    const path = "tsconfig.json";
    const file = tree.read(path);
    if (!file) throw new Error(`Could not read ${path}`);
    const stringFile = file
      .toString()
      .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
        g ? "" : m
      );
    const json = JSON.parse(stringFile);
    const compilerOptions = json.compilerOptions || {};
    compilerOptions.baseUrl = compilerOptions.baseUrl || ".";
    compilerOptions.paths = compilerOptions.paths || {};

    const setPath = (key: string, value: string[]) => {
      const existing = compilerOptions.paths[key];
      if (!Array.isArray(existing) || existing[0] !== value[0]) {
        compilerOptions.paths[key] = value;
      }
    };

    setPath("@domains/*", ["./src/app/domains/*"]);
    setPath("@shared/*", ["./src/app/shared/*"]);

    json.compilerOptions = compilerOptions;
    tree.overwrite(path, JSON.stringify(json, null, 2));
    return tree;
  };
}
