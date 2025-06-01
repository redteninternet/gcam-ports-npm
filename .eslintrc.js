module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // Possible Errors
    "no-console": "off", // Allow console.log for this package
    "no-debugger": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-unreachable": "error",
    "use-isnan": "error",
    "valid-typeof": "error",

    // Best Practices
    curly: "error",
    "default-case": "error",
    eqeqeq: ["error", "always"],
    "no-alert": "error",
    "no-caller": "error",
    "no-empty-function": "warn",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-lone-blocks": "error",
    "no-multi-spaces": "error",
    "no-new": "error",
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-throw-literal": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-return": "error",
    radix: "error",
    yoda: "error",

    // Variables
    "no-delete-var": "error",
    "no-undef": "error",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],

    // Stylistic Issues
    "array-bracket-spacing": ["error", "never"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "keyword-spacing": ["error", { before: true, after: true }],
    "linebreak-style": ["error", "unix"],
    "max-len": [
      "warn",
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", { words: true, nonwords: false }],

    // ES6
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "constructor-super": "error",
    "no-class-assign": "error",
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "error",
    "no-new-symbol": "error",
    "no-this-before-super": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
  },
  overrides: [
    {
      files: ["tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
      env: {
        jest: true,
      },
      rules: {
        "no-unused-expressions": "off", // Allow chai assertions
        "max-len": "off", // Allow longer test descriptions
      },
    },
    {
      files: ["examples/**/*.js"],
      rules: {
        "no-console": "off", // Allow console.log in examples
      },
    },
  ],
};
