

#### Import an SVG in Svelte

```
{@html sports_hockey}

<script>
    import sports_hockey from '$lib/assets/icons/sports_hockey.svg?raw'
</script>
```



## Credits

- https://github.com/MacFJA/svelte-persistent-store
- https://github.com/obs-websocket-community-projects/obs-websocket-js
- https://carbon-components-svelte.onrender.com/
- 7 Segment Font https://www.keshikan.net/fonts-e.html
- Dexie https://dexie.org/
- https://github.com/Polarisation/indexeddb-export-import#readme
- Logo Ninja https://pixabay.com/illustrations/ninja-logo-icon-sport-ninja-logo-7210338/
- Logo Lion https://pixabay.com/illustrations/cat-lion-animal-wildlife-wild-941821/
- Flip Card Timer: https://zoel-countdowntimer.vercel.app/
- Zod https://zod.dev/

#### Project Structure

- _(app)_-Layout: everything that is displayed and can be interacted with
- _(preview)_-Layout: for use in OBS (transparent background) or as preview in browser (checkerboard-background, full width)
- Overlays: /overlay/[overlayName]?scale=100
- Example: http://localhost:5173/overlay/Scoreboard_Floorball_Goal_v2/?scale=100
- overlayName: name of the overlay (currently in $lib/overlays as .svelte file)
- scale in percent (default: 100)

## TODO

- **Overlays:**
- somehow tag overlays by sport
- filter overlays
- multiple parameters (alignment)

