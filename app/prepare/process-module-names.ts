import { CpuProModule } from './types.js';

function moduleDisplayName(module: CpuProModule) {
    if (module.name) {
        return;
    }

    switch (module.package.type) {
        case 'npm':
            module.name = `${module.package.name}/${module.packageRelPath}`;
            break;

        case 'script':
        case 'wasm':
            module.name = module.packageRelPath;
            break;

        case 'node':
        case 'webpack/runtime':
            module.name = module.path;
            break;
    }

}

export function processDisplayNames(
    modules: CpuProModule[]
) {
    for (const module of modules) {
        moduleDisplayName(module);
    }
}
