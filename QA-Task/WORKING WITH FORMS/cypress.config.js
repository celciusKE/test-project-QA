const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      experimentalMemoryManagement: true,
      numTestsKeptInMemory: 1,
      specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
      chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      
    },
  },
});
