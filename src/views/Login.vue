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
import { restful } from '../api'
export default {
  data () {
    return {
      source: '/',
      auto_code: ''
    }
  },
  created () {
    this.loginOuth()
  },
  methods: {
    loginOuth () {
      restful
        .fetch('get', 'https://api.hiwors.com/open/auth/authform?client_id=ymyevwpjp6xuza6cptlamb17w6u3j0f15e327689372af8.44470726.open.apps&access_type=offline', null)
        .then(data => {
          console.log('login ->')
          this.auto_code = data
          console.log(typeof this.auto_code)
          console.log(this.auto_code)
        })
        .finally(() => { })
    }
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
