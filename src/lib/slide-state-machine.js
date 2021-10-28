import { writable } from "svelte/store";

export const NEXT = "next";
export const PREV = "prev";

export function createMachine() {
    let max = 0;
    const fss = writable(0);
    const customStore = {
        ...fss,
        setMax: (newMax) => (max = newMax),
        send: (direction) => {
            const directions = {
                [NEXT]: () => fss.update((state) => (state >= max ? state : state + 1)),
                [PREV]: () => fss.update((state) => (state <= 0 ? 0 : state - 1)),
            };
            if (!directions[direction]) {
                return;
            }
            directions[direction]();
        },
    };

    return customStore;
}
export const machine = createMachine();
