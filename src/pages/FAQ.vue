<template>
      <!--Section: Contact v.2-->
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
            <div class="container-fluid text-center">
                <div class="innerpage-heading">
                    <h3 class="page-heading">Complaint Desk</h3>
                    <hr class="page-heading-line">
                    <p>Find answers to your questions below.</p>
                </div><!-- end innerpage-heading -->
                <div class="no-back">
                  <div class="row">
                    <div class="col-sm-12 offset-lg-2 col-lg-8">
                      <VueFaqAccordion :items="myItems" />
                    </div>
                  </div>
                </div>
            </div><!-- end container-fluid -->
        </div>                
    </section>
</template>

<script>
import { client } from "../api";
import VueFaqAccordion from 'vue-faq-accordion';
export default {
  name: "faq",
  components: {
    VueFaqAccordion
  },
  beforeMount() {
     client
        .getItems('faq')
        .then(res => {
          if (Array.isArray(res.data)){
            res.data.forEach( item => this.myItems.push({title: item.question, value: item.answer}));
          }
        })
        .catch(err => {
          this.status = `Could't process your request, please try again`;
        });
  },
  data() {
    return {
      myItems: []
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>