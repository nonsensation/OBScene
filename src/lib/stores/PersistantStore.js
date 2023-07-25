import { persistBrowserLocal } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"

const theme = persistBrowserLocal(writable("light"), "myapp-theme")