<script>
    export default
    {
        name    : "Comp_Single_Card",
        props   : ['current_card'],
    }
</script>

<template>
    <div>
        <div class="image_box">
            <img src="" alt="">
        </div>
    </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    .image_box
    {
        width: calc(100%);
        height: calc(80%);
        border: 1px solid yellow;
    }

</style>