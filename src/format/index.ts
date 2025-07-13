import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { execSync } from "child_process";
import { Schema } from "./schema";

export function format(_options: Schema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info("🔧 Running Prettier...");
    execSync(
      `npx prettier --yes --write "${_options.path}/**/*.{ts,js,json}"`,
      {
        stdio: "inherit",
      }
    );
    return _tree;
  };
}
