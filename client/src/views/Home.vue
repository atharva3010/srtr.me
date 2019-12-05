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
          h1.title.is-family-monospace.is-size-1-desktop.is-size-2-tablet.is-size-3-mobile
            span.is-family-code.has-text-primary.has-text-weight-bold {shrink} 
            span.has-text-grey-dark your long 
            span.has-text-weight-bold.has-text-primary URL(s)

          div.fields
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
              b-tooltip(
                v-if="longURL"
                position="is-top",
                label="Clear URL")
                b-button.is-medium(
                  @click="clearFields()",
                  aria-label="Clear URL",)
                  b-icon(
                    pack="fas",
                    icon="times",
                    size="is-small")
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
          .columns.reverse-row-order 
            .column
              b-button.is-primary.is-medium.is-fullwidth.is-size-5-mobile(
                @click="shortURL ? copyLink() : shrinkURL()",
                :loading="isLoading")
                span(v-if="!shortURL") Shrink URL!
                span(v-if="shortURL") Copy Link!
                b-icon(
                  v-if="!shortURL",
                  pack="fas",
                  icon="arrow-right",
                  size="is-small")
                b-icon(
                  v-if="shortURL",
                  pack="far",
                  icon="copy",
                  size="is-small")
            .column(v-if="shortURL")
              b-button.is-primary.is-medium.is-fullwidth.is-size-5-mobile(
                @click="clearFields()",
                outlined)
                span Shrink another URL
                b-icon(
                  pack="fas",
                  icon="arrow-right",
                  size="is-small")

          p.has-text-grey-dark.has-text-left
            span.has-text-weight-bold srtr.me 
            | is a free and open source  
            span.has-text-weight-bold URL shortening service. 
            //- | made by 
            //- a.has-text-weight-bold.has-text-primary(href="https://github.com/atharva3010") Atharva Sharma.
            br
            | You can find the complete project source code 
            a.has-text-weight-bold.has-text-primary(href="https://github.com/atharva3010/srtr.me") here. 
            br
            | The existing URL shortening services run on a freemium model, are bloated and very slow. Thus, the idea of creating a completely free and easy to use URL shortening service was born.
          
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      longURL: "",
      shortURL: "",
      isLoading: false
    };
  },
  methods: {
    shrinkURL() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        this.$http
          .post(`/api/url/shorten`, {
            longUrl: this.longURL
          })
          .then(
            response => {
              this.isLoading = false;
              this.shortURL = response.data.shortUrl;
              this.$buefy.snackbar.open({
                message: `Short URL is ${response.data.shortUrl}`,
                type: "is-primary",
                position: "is-bottom",
                actionText: "Copy link",
                onAction: () => {
                  this.copyLink();
                }
              });
              resolve(response.data);
            },
            error => {
              this.isLoading = false;
              this.$buefy.snackbar.open({
                message: error,
                type: "is-danger",
                position: "is-bottom",
                actionText: "Retry",
                onAction: () => {
                  this.clearFields();
                }
              });
              reject(error);
            }
          );
      });
    },
    clearFields() {
      this.longURL = "";
      this.shortURL = "";
    },
    copyLink() {
      var copyText = document.getElementById("shortURL");
      copyText.select();
      document.execCommand("copy");
      this.$buefy.snackbar.open({
        message: "Link copied!",
        queue: false,
        type: "is-primary",
        position: "is-bottom",
        actionText: "Shrink another URL",
        onAction: () => {
          this.clearFields();
        }
      });
    }
  }
};
</script>

<style scoped>
.fields {
  padding-top: 24px;
  padding-bottom: 24px;
}
.section {
  padding-top: 12px;
  padding-bottom: 12px;
}
@media only screen and (min-width: 769px) {
  .reverse-row-order {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
