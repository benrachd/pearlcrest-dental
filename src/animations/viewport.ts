/** Shared viewport triggers — fire early, animate once, never leave content hidden. */
export const viewportHeader = { once: true, amount: 0.25, margin: "0px 0px -40px 0px" } as const;
export const viewportContent = { once: true, amount: 0.2, margin: "0px 0px -32px 0px" } as const;
export const viewportItem = { once: true, amount: 0.2, margin: "0px 0px -24px 0px" } as const;
