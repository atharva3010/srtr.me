<template lang="pug">
  section.section
    .columns.is-centered
      .column.is-fullwidth.is-8-desktop.has-text-centered
        img(alt="MITS logo" src="../assets/logo.png")
        h1.is-size-2-mobile.is-size-2-tablet.is-size-3-mobile 
          | Create your short url below!
        hr
        b-field
          b-input.is-large(
            v-model="longURL"
            type="text",
            placeholder="Enter Long URL here...",
            expanded,
            size="is-large")
        button.button.is-primary.is-large(
          @click="shortURL()"
        )
          | Generate Short URL!
        
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      longURL: ""
    };
  },
  mounted() {},
  methods: {
    shortURL() {
      return new Promise((resolve, reject) => {
        this.$http
          .post(
            `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyD9_9Pqb8JRzeDDr79_Bk_4-utGgyaZUmU`,
            {
              dynamicLinkInfo: {
                domainUriPrefix: "https://cse.page.link",
                link: this.longURL
              },
              suffix: {
                option: "SHORT"
              }
            }
          )
          .then(
            response => {
              this.$buefy.toast.open({
                message: `Short URL is ${response.data.shortLink}`,
                type: "is-success"
              });
              resolve(response.data);
            },
            error => {
              this.$buefy.toast.open({
                message: error,
                type: "is-danger"
              });
              reject(error);
            }
          );
      });
    }
  }
};
</script>
