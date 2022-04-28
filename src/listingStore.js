import { writable } from "svelte/store";

function createListing() {
  const { subscribe, set, update } = writable({});
  return {};
}
