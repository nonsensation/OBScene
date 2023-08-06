<style lang="postcss">
    @import "material-symbols";
</style>

{#each sports as sport }
    {sport.name}<span class="material-symbols-rounded">{sport.material_icon}</span>
{/each}

<script>
    const sports = [
        {
            name: "Floorball",
            material_icon: "sports_hockey" ,
        },
        {
            name: "Football",
            material_icon: "sports_soccer" ,
        },
        {
            name: "Handball",
            material_icon: "sports_handball" ,
        },
        {
            name: "Tennis",
            material_icon: "sports_tennis" ,
        },
        {
            name: "Volleyball",
            material_icon: "sports_volleyball" ,
        },
    ]
</script>
