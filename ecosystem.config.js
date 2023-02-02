module.exports = {
  apps: [{
    name: 'gmail-smart-web-service',
    script: 'index.js',
    watch: true,
    node_args: ["--inspect=0.0.0.0:7000", "--no-experimental-fetch", "--trace-deprecation", "--trace-warnings"],
    ignore_watch : ['node_modules', '.tmp', 'swagger', 'coverage', '.nyc_output', '.git'],
    watch_options: {
      usePolling: true,
    }
  }]
};
