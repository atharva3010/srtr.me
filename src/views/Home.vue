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
          h1.is-size-1-desktop.is-size-2-tablet.is-size-3-mobile
            span.is-family-code.has-text-primary.has-text-weight-bold {shrivl} 
            | your long 
            span.has-text-weight-bold.has-text-primary URL(s)
          br
          p.has-text-grey.has-text-left
            span.has-text-primary.has-text-weight-bold Shrivl 
            | is a 
            span.has-text-primary.has-text-weight-bold URL shortening service 
            | made as a minor project by 
            span.has-text-primary.has-text-weight-bold Atharva Sharma 
            | and 
            span.has-text-primary.has-text-weight-bold Nishank Gupta 
            | of 
            span.has-text-primary.has-text-weight-bold CSE 3rd year, Batch-A, MITS Gwalior. 
            | It utilises the Firebase Dynamic Links api to shrink long URLs to short URLs, you can find the complete project source code
            a.has-text-primary.has-text-weight-bold(href="https://github.com/atharva3010/shrivl") 
              | here.
          br
          b-field(
            label="Long URL",
            label-position="on-border",
            custom-class="has-text-primary")
            b-input(
              v-model="longURL"
              type="text",
              placeholder="Enter long URL here...",
              expanded,
              size="is-medium")
          b-field(
            label="Short URL",
            label-position="on-border",
            custom-class="has-text-primary"
            v-if="shortURL")
            b-input(
              id="shortURL",
              v-model="shortURL"
              type="text",
              expanded,
              size="is-medium")
            b-tooltip(
              position="is-top",
              label="Copy link")
              b-button.is-medium(
                @click="copyLink()",
                aria-label="Copy link",)
                b-icon(
                  pack="far",
                  icon="copy",
                  size="is-small")

          button.button.is-primary.is-medium.is-fullwidth.is-size-5-mobile(
            @click="shrivlURL()"
          )
            span(v-if="!shortURL") Generate short URL!
            span(v-if="shortURL") Shrivl another URL!
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
            `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.VUE_APP_API_KEY}`,
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
      this.$buefy.toast.open({
        message: "Link copied to clipboard!",
        queue: false
      });
    }
  }
};
</script>
