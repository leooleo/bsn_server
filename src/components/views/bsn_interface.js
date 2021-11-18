export default {
    data() {
      return {
        isBsnActive: false,
        bsnStatus: "load"
      };
    },
    created() {
      /* eslint-disable no-console */
  
      this.axios
        .get("https://bsnapi.herokuapp.com/isBsnActive")
        .then(response => {
          this.isBsnActive = response.data;
          this.bsnStatus = "alive";
        })
        .catch(error => {
          console.log(error);
          this.bsnStatus = "dead";
        });
    },
    methods: {
      start() {
        this.bsnStatus = "starting";
        this.axios.get("https://bsnapi.herokuapp.com/startBsn").then(response => {
          if (response.data == "started") {
            this.isBsnActive = true;
            this.bsnStatus = "alive";
          }
        });
      },
      stop() {
        this.axios.get("https://bsnapi.herokuapp.com/stopBsn").then(response => {
          if (response.data == "stopped") {
            this.isBsnActive = false;
          }
        });
      },
      monitor() {
        document.location.href = "#/monitor";
      }
    }
  };