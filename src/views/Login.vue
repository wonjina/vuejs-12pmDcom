<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-flex
          column
          class="container grid-list-xl layout flex custon-column"
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="grey"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    class=""
                    label="id"
                    name="id"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    class=""
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data () {
    return { source: '/' }
  },
  created () {
    this.access_token = this.$route.query.token
    console.log('login page ->')
    console.log(this.$route.params)
    console.log(this.$route)
    this.$router.push('/')
  }
}
</script>
<style lang="scss">
  .custom-margin{
    margin-right: 85px;
    margin-left: 60px;
  }
  .custom-width{
      width: 50%;
  }
  .custon-column {
    max-width: 701px;
  }
</style>
