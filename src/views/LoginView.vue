<template>
    <base-layout>
        <div class="login-wrapper">
            <LoginForm class="form" />
            <ImageSwiper class="swiper" />
        </div>
    </base-layout>
</template>

<script>
export default {

};
</script>

<style scoped>
.login-wrapper {
    height: 300px;
    display: flex;
    justify-content: center;
    align-content: center;
}

.ep-main {
    display: flex;
    justify-content: center;
}

.swiper {
    width: 300px;
    height: 300px;
}
</style>
