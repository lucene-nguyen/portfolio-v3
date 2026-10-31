/** Fired on window for every /api/ping response the lab receives (themes can visualize it). */
export const LAB_RESPONSE = "lab:response";
export type LabResponseDetail = { status: number };

export function emitLabResponse(status: number) {
  window.dispatchEvent(new CustomEvent<LabResponseDetail>(LAB_RESPONSE, { detail: { status } }));
}
