<template lang="pug">
  section.section
    .container
      .columns.is-centered
        .column.is-fullwidth.is-8-desktop.has-text-centered
          img(
            alt="Shorten your url",
            src="../assets/undraw.png",
            width="400px",
            height="400px")
          h1.is-size-2-mobile.is-size-2-tablet.is-size-3-mobile 
            span.has-text-primary.has-text-weight-bold (shrivl) 
            | your long url below!
          br
          p.has-text-grey.has-text-left
            | Shrivl is a URL shortening service made as a minor project by Atharva Sharma and Nishank Gupta of CSE 3rd year Batch A, MITS Gwalior. It utilises the Firebase Dynamic Links api to shrink long URLs to short URLs, you can find the complete project source code
            a.has-text-primary.has-text-weight-bold(href="https://github.com/atharva3010/shrivl") 
              | here.
          br
          b-field(
            label="Long URL",
            label-position="on-border")
            b-input.is-large(
              v-model="longURL"
              type="text",
              placeholder="Enter long URL here...",
              expanded,
              size="is-large")
          b-field(
            label="Short URL",
            label-position="on-border",
            v-if="shortURL")
            b-input.is-large(
              id="shortURL",
              v-model="shortURL"
              type="text",
              expanded,
              size="is-large")
            b-button.is-large.is-primary(
              @click="copyLink()",
              oulined)
              | Copy link
          button.button.is-primary.is-large.is-fullwidth(
            @click="shrivlURL()"
          )
            span(v-if="!shortURL") Generate short URL!
            span(v-if="shortURL") Generate another short URL!
            b-icon(
              pack="fas",
              icon="arrow-right",
              size="is-small")
          
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      longURL: "",
      shortURL: ""
    };
  },
  methods: {
    shrivlURL() {
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
              this.shortURL = response.data.shortLink;
              this.$buefy.snackbar.open({
                message: `Short URL is ${response.data.shortLink}`,
                actionText: "Copy link",
                type: "is-primary",
                position: "is-top",
                onAction: () => {
                  this.copyLink();
                  this.$buefy.toast.open({
                    message: "Link copied to clipboard!",
                    queue: false
                  });
                }
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
    },
    copyLink() {
      var copyText = document.getElementById("shortURL");
      copyText.select();
      document.execCommand("copy");
    }
  }
};
</script>
