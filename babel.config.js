module.exports = function(api) {
  // Cache the returned value forever and don't call this function again
  api.cache(true);
  
  const presets = [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react"
  ];
  
  const plugins = [
    ["transform-define", {
      // This will replace process.env.NODE_ENV with the actual value at build time
      "process.env.NODE_ENV": process.env.NODE_ENV || "development"
    }]
  ];
  
  return {
    presets,
    plugins
  };
};
