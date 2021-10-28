export function findIntersections(c0, c1) {
    const dx = c1.x - c0.x;
    const dy = c1.y - c0.y;
    const len = Math.sqrt(dy * dy + dx * dx);
    const a = (c0.r * c0.r - c1.r * c1.r + len * len) / (2.0 * len);
    const x2 = c0.x + (dx * a) / len;
    const y2 = c0.y + (dy * a) / len;
    const h2 = Math.sqrt(c0.r * c0.r - a * a);
    const rx = -dy * (h2 / len);
    const ry = dx * (h2 / len);
    const xi = x2 + rx;
    const xi2 = x2 - rx;
    const yi = y2 + ry;
    const yi2 = y2 - ry;
    return { xi, yi, xi2, yi2 };
}

export function numberOfSharedRels(relMap, fromId, toId) {
    return function () {
        let fromPath = relMap[fromId];
        if (typeof fromPath === "undefined") {
            fromPath = { toId: 0 };
        }
        let toPath = relMap[toId];
        if (typeof toPath === "undefined") {
            toPath = { fromId: 0 };
        }
        return (fromPath[toId] || 0) + (toPath[fromId] || 0);
    };
}
