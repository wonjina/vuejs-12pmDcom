<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="(link, index) in links"
        :key="link.name+index"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links"
        >{{ link.name }}</a>
      </span>
    </div>
    <v-spacer />
    <span class="font-weight-light copyright">
      12PM.COM
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/' },
      { name: 'About Us', Link: '' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
