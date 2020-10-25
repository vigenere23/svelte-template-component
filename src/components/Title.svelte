<h1 class="title">
  <slot />
</h1>

<style lang="scss">
  @import '../styles/colors';
  @import '../styles/fonts';

  .title {
    font-family: $special-font;
    font-size: 72px;
    color: $secondary-text;
  }
</style>
