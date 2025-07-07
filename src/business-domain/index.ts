import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  strings,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { Schema } from "./schema";
import { normalize } from "path";
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function businessDomain(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url("./files"), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name,
      }),
      move(normalize(`/${_options.path}/${strings.dasherize(_options.name)}`)),
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
