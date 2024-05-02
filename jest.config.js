module.exports = {
    testEnvironment: 'jsdom',
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript", "@babel/react"
      ]
}