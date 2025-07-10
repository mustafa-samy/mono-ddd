"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain = domain;
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function domain(_options) {
    return (_tree, _context) => {
        const selectedFeatures = _options.operations ? _options.operations : [];
        const templateOptions = Object.assign(Object.assign({}, _options), { hasCreate: selectedFeatures.includes("create"), hasRead: selectedFeatures.includes("read"), hasReadOne: selectedFeatures.includes("read-one"), hasUpdate: selectedFeatures.includes("update"), hasDelete: selectedFeatures.includes("delete") });
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)("./files"), [
            // Filter files based on selections
            (0, schematics_1.filter)((path) => {
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
                if (path.includes("details") &&
                    !selectedFeatures.includes("read-one")) {
                    return false;
                }
                //features
                if (!selectedFeatures.includes("create") &&
                    !selectedFeatures.includes("update") &&
                    path.includes("edit")) {
                    return false;
                }
                return true;
            }),
            // Process templates
            (0, schematics_1.applyTemplates)(Object.assign(Object.assign({}, templateOptions), { classify: schematics_1.strings.classify, dasherize: schematics_1.strings.dasherize, name: _options.name })),
            (0, schematics_1.move)((0, path_1.normalize)(`/${_options.path}/${schematics_1.strings.dasherize(_options.name)}`)),
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]);
    };
}
//# sourceMappingURL=index.js.map