<template>
  <div class="enter-wrapper">
    <div class="enter">
      <div class="buttons">
        <ul>
          <li>
            <button
              :class="`btn btn-info ${tab == 'login' ? 'active' : ''}`"
              @click="changeTab('login')"
            >
              Login
            </button>
          </li>
          <li>
            <button
              :class="`btn btn-info ${tab == 'register' ? 'active' : ''}`"
              @click="changeTab('register')"
            >
              Register
            </button>
          </li>
        </ul>
      </div>
      <div class="forms">
        <div v-if="tab === 'login'" class="login-form">
          <h4>Login Form</h4>
          <form @submit.prevent="onLoginSubmit">
            <div>
              <label for="username">Username</label>
              <input
                v-model="username"
                class="form-control"
                type="text"
                id="username"
              />
            </div>

            <div>
              <label for="password">Password</label>
              <input
                v-model="password"
                class="form-control"
                type="password"
                id="password"
              />
            </div>

            <div class="submit">
              <input
                class="form-control btn btn-primary"
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
        <div v-if="tab === 'register'" class="register-form">
          <h4>Register Form</h4>
          <form @submit.prevent="onRegisterSubmit">
            <div>
              <label for="username">Username</label>
              <input
                v-model="username"
                class="form-control"
                type="text"
                id="username"
              />
            </div>

            <div>
              <label for="password">Password</label>
              <input
                v-model="password"
                class="form-control"
                type="password"
                id="password"
              />
            </div>

            <div class="submit">
              <input
                class="form-control btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/_helpers/router";
import services from "@/_services";

export default {
  data() {
    return {
      tab: "login",
      username: "",
      password: "",
      returnUrl: "",
    };
  },
  created() {
    // redirect to home if already logged in
    if (services.authenticationService.currentUserValue) {
      return router.push("/dashboard");
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/dashboard";
  },

  methods: {
    changeTab(tab) {
      this.tab = tab;
      this.password = "";
    },
    onLoginSubmit() {
      this.$emit("set-loading");
      let self = this;
      services.authenticationService
        .login(this.username, this.password)
        .then(() => {
          self.$emit("logged-in");
          self.$emit("unset-loading");
          this.$snotify.success(`Welcome home ${self.username}`);
          router.push(self.returnUrl);
        })
        .catch((error) => {
          self.$emit("unset-loading");
          this.$snotify.error(error.message);
        });
    },
    onRegisterSubmit() {
      this.$emit("set-loading");
      let self = this;
      fetch("/api/auth/register", {
        method: "post",
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then(() => {
          self.$emit("unset-loading");
          this.$snotify.success(
            `Dear ${self.username}! You successfully registered`
          );
          self.tab = "login";
        })
        .catch((error) => {
          self.$emit("unset-loading");
          this.$snotify.error(error.message);
        });
    },
  },
};
</script>

<style scoped>
.enter-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  background: url('../../assets/images/enter.svg'), #ec5866;
  background-size: 35%;
  background-repeat: no-repeat;
  background-position: left 10% bottom 10%;
}

.enter {
  width: 50%;

  max-width: calc(13rem * 3);
  margin: 2rem;
}

.enter .buttons {
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}

.enter .buttons ul {
  margin: 0;
  display: flex;
  list-style: none;
}

.enter .buttons ul li {
  display: flex;
  list-style: none;
  width: 100%;
}

.enter .buttons ul li button {
  background: #d6adad;
  color: #ec5866;
  border-bottom: 0;
  border-color: #ec5866;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.enter .buttons ul li button:focus {
  box-shadow: none;
}

.enter .buttons ul li button.active {
  background: white;
  color: #666;
}

.enter .forms {
  background: white;
  padding: 2rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.5rem 1rem -0.2rem rgba(0, 0, 0, 0.3);
}

.enter .forms h4 {
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #4e5f4f;
}

.enter .forms .submit {
  margin-top: 1rem;
}

.enter .forms .submit input {
  margin-top: 1rem;
  background: #ec5866;
  border: none;
}

.red {
  color: rgb(194, 45, 45);
}
</style>