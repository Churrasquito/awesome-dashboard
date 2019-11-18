<template>
  <div class="fullHeightViewport d-flex align-items-center justify-content-center">
    <d-container fluid class="main-content-container px-4">
      <d-row>
        <d-col lg="4" class="mb-4 mx-auto">
          <d-card class="card-small">

            <d-card-header class="border-bottom">
              <h6 class="m-0">Form Example</h6>
            </d-card-header>

            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <d-form class="d-flex flex-column" @submit.prevent="login">
                      <div class="form-group">
                        <label for="feEmailAddress">Email</label>
                        <d-input id="feEmailAddress" type="email" placeholder="Email" v-model="email"/>
                      </div>
                      <div class="form-group">
                        <label for="fePassword">Password</label>
                        <d-input-group seamless>
                          <d-input id="fePassword" :type="hidePassword ? 'password' : 'text'" placeholder="Password" v-model="password" />
                          <d-input-group-text slot="append">
                            <i class="material-icons" @click="hidePassword = !hidePassword" v-text="hidePassword ? 'visibility' : 'visibility_off'"></i>
                          </d-input-group-text>
                        </d-input-group>
                      </div>
                      <d-button type="submit" class="py-3 text-uppercase" style="letter-spacing: 1px;">Login</d-button>
                    </d-form>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>

          </d-card>
        </d-col>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      hidePassword: true,
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.replace('/'), error => console.error(error));
    },
  },
};
</script>
