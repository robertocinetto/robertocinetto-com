<template>
  <section class="profile" id="profile">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4 mb-4 text-center">
          <img
            class="profile-img"
            src="@/assets/roberto-cinetto-frontend-web-dev.webp"
            height="150px"
            width="150px"
          />
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <h2 class="mt-0">{{ $t("profile.title") }}</h2>
          <p v-html="$t('profile.description')"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.profile {
  background: $gray-900;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 4px solid $yellow;
}
</style>
