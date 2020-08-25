<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 text-center copyright">
          <p>© 2013 - {{ new Date().getFullYear() }} Roberto Cinetto. All rights reserved. Vicolo Po, 8 - 35020 - Casalserugo (PD) - Italy. P.IVA: 04719050280</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-comp",
};
</script>

<style lang="scss" scoped>
.footer {
  background: $gray-900;
}

.copyright {
  font-size: 0.9rem;
}
</style>
