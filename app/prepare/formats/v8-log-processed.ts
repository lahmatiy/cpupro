// Process profiles generated by a combination of the following commands:
//
// > node --prof /path/to/script.js
// > node --prof-process -preprocess isolate*.log > v8log.json

import type { V8LogProfile } from './v8-log-processed/types.js';
import type { V8CpuProfile } from '../types.js';
import { processTicks } from './v8-log-processed/ticks.js';
import { processScripts } from './v8-log-processed/scripts.js';
import { processScriptFunctions } from './v8-log-processed/functions.js';

export function isV8Log(data: unknown): data is V8LogProfile {
    const maybe = data as Partial<V8LogProfile>;

    return (
        Array.isArray(maybe.code) &&
        Array.isArray(maybe.functions) &&
        Array.isArray(maybe.ticks)
    );
}

export function convertV8LogIntoCpuprofile(v8log: V8LogProfile): V8CpuProfile {
    const { nodes, samples, timeDeltas } = processTicks(v8log);
    const scripts = processScripts(v8log);
    const scriptFunctions = processScriptFunctions(v8log);
    const samplesInterval = timeDeltas.slice().sort()[timeDeltas.length >> 1];
    const lastTm = v8log.ticks[v8log.ticks.length - 1].tm;

    return {
        startTime: 0,
        endTime: lastTm + samplesInterval,
        nodes,
        samples,
        timeDeltas,
        // cpupro extensions
        _samplesInterval: samplesInterval,
        _scripts: scripts,
        _scriptFunctions: scriptFunctions
    };
}
