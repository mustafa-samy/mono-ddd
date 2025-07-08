import {
  apply,
  filter,
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
    const selectedFeatures = _options.operations ? _options.operations : [];

    const templateOptions = {
      ..._options,
      hasCreate: selectedFeatures.includes("create"),
      hasRead: selectedFeatures.includes("read"),
      hasReadOne: selectedFeatures.includes("read-one"),
      hasUpdate: selectedFeatures.includes("update"),
      hasDelete: selectedFeatures.includes("delete"),
    };

    const templateSource = apply(url("./files"), [
      // Filter files based on selections
      filter((path) => {
        //use-cases
        if (path.includes("create") && !selectedFeatures.includes("create")) {
          return false;
        }
        if (path.includes("delete") && !selectedFeatures.includes("delete")) {
          return false;
        }
        if (path.includes("update") && !selectedFeatures.includes("update")) {
          return false;
        }
        if (path.includes("list") && !selectedFeatures.includes("read")) {
          return false;
        }
        if (
          path.includes("details") &&
          !selectedFeatures.includes("read-one")
        ) {
          return false;
        }

        //features
        if (
          !selectedFeatures.includes("create") &&
          !selectedFeatures.includes("update") &&
          path.includes("edit")
        ) {
          return false;
        }
        return true;
      }),
      // Process templates
      applyTemplates({
        ...templateOptions,
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name,
      }),
      move(normalize(`/${_options.path}/${strings.dasherize(_options.name)}`)),
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
