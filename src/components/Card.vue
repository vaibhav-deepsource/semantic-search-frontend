<template>
  <div v-if="currentDoc" class="card">
    <header class="card-header">
      <a class="card-header-title" :href="currentDoc.metadata">{{
        currentDoc.metadata
      }}</a>
    </header>
    <div class="card-content">
      <div class="content" v-html="renderMd"></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
export default {
  name: "Card",
  props: {
    documentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      documents: [
        {
          text: "The JavaScript Analyzer analyzes your JavaScript, TypeScript, Angular, Meteor, Ember, and Vue files and raises issues if they don't follow the best practices and methods for building efficient JavaScript Applications.",
          metadata: "https://deepsource.io/docs/analyzer/javascript",
        },
        {
          text: "## Configuration - `.deepsource.toml`\n\nThis section covers configuration specific to the `javascript` analyzer. Please make sure to read the general [configuration guide](/setup-analysis#what-is-deepsourcetoml) first.",
          metadata:
            "https://deepsource.io/docs/analyzer/javascript#configuration---deepsourcetoml",
        },
        {
          text: '### `name`\n\n- **Type**: [String](https://toml.io/en/v1.0.0#string)\n- **Presence**: mandatory\n- **Description**: Shortcode of the analyzer.\n- **Example**:\n\n```toml\nname = "javascript"\n```',
          metadata: "https://deepsource.io/docs/analyzer/javascript#name",
        },
        {
          text: "### `enabled`\n\n- **Type**: [Boolean](https://toml.io/en/v1.0.0#boolean)\n- **Presence**: mandatory\n- **Description**: Toggle whether this analyzer should be run.\n- **Example**:\n\n```toml\nenabled = true\n```",
          metadata: "https://deepsource.io/docs/analyzer/javascript#enabled",
        },
        {
          text: '### `meta`\n\n- **Type**: [Table](https://toml.io/en/v1.0.0#table)\n- **Presence**: optional\n- **Description**: Any supported metadata to pass to the analyzer.\n- **Example**:\n\n```toml\n[analyzers.meta]\n  plugins = ["react"]\n  environment = ["mongo","jquery"]\n  module_system = "es-modules"\n  dialect = "flow"\n```\n\n#### `plugins`\n\n- **Type**: [Array](https://toml.io/en/v1.0.0#array)\n- **Presence**: optional\n- **Description**: The JavaScript Frameworks being used in the project. Currently, we support [React](https://reactjs.org/),[Vue](https://vuejs.org/), [EmberJS](https://emberjs.com/), [Meteor](https://www.meteor.com/), [Angular](https://angular.io/) and [AngularJS](https://angularjs.org/).\n- **Available Values**: `react`, `vue`, `ember`, `meteor`, `angular` and `angularjs`\n- **Default Value**: None\n- **Example**:\n\n```toml\nplugins = ["react"]\n```\n\n<alert>\n\nIf you use frameworks like React with ES6 modules, we recommend you set `module_system` to `"es-modules"`.\n\n</alert>\n\n#### `dependency_file_paths`\n\n- **Type**: [Array](https://toml.io/en/v1.0.0#array)\n- **Presence**: optional\n- **Description**: A list of paths to files (e.g. `package.json` or `tsconfig.json`) relative to the repository\'s root that specify external dependencies. The analyzer uses this to report dependency metrics and improve analysis accuracy.\n- **Example**:\n\n```toml\ndependency_file_paths = [\n  "src/client/package.json",\n  "src/server/package.json",\n  "app/package.json"\n]\n```\n\n<alert>\n\nIf you want to analyze a monorepo on DeepSource, we recommend defining the `package.json` paths for each package for better analysis results.\n\nBy default, the analyzer automatically detects and scans the `package.json` file if found in the repository\'s root.\n\n</alert>\n\n#### `environment`\n\n- **Type**: [Array](https://toml.io/en/v1.0.0#array)\n- **Presence**: optional\n- **Description**: The global variables related to the environments used that need to be predefined for the project.\n- **Available Values**:\n  `nodejs`, `browser`, `jest`, `mocha`, `jasmine`, `jquery`, `mongo`, `cypress`\n\n  - `nodejs` - Adds Node.js global variables and Node.js scoping\n  - `browser` - Adds Browser specific global variables\n  - `jest` - Adds Jest global variables\n  - `mocha` - Adds Mocha testing global variables\n  - `jasmine` - Adds Jasmine testing global variables for version 1.3 and 2.0\n  - `jquery` - Adds jQuery global variables\n  - `mongo` - Adds MongoDB global variables\n  - `cypress` - Adds Cypress global variables\n- **Default Values**: ["nodejs", "browser"]\n- **Example**:\n\n```toml\nenvironment = ["nodejs","browser","jest"]\n```\n\n<alert>\n\nThe analyzer can automatically detect `nodejs`, `browser`, `jest`, `mocha`, `jasmine` and, `cypress` at the moment.\n\nIf your project uses Jquery or MongoDB, please mention them explicitly.\n\n</alert>\n\n#### `module_system`\n\n- **Type**: [String](https://toml.io/en/v1.0.0#string)\n- **Presence**: optional\n- **Description**: The type of modules used in the project.\n- **Available Values**: `commonjs`, `es-modules` and `amd`\n\n  - `commonjs` - The CommonJS Module System. (`require` / `exports`)\n  - `es-modules` - ES Modules (`import` / `export`)\n  - `amd` - Asynchronous Module Definition (`define` / `require`)\n\n- **Default Value**: "commonjs"\n- **Example**:\n\n```toml\nmodule_system = "es-modules"\n```\n\n#### `dialect`\n\n- **Type**: [String](https://toml.io/en/v1.0.0#string)\n- **Presence**: optional\n- **Description**: The dialect of JavaScript used in the project. Currently, we support [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/).\n- **Available Value**: `typescript` and `flow`\n- **Default Value**: "typescript"\n- **Example**:\n\n```toml\ndialect = "flow"\n```\n\n#### `style_guide`\n\n- **Type**: [String](https://toml.io/en/v1.0.0#string)\n- **Presence**: optional\n- **Description**: A style guide is a set of standards that outline how code should be written and organized. Setting this will ensure that you follow established conventions, and will also allow the analyzer to raise issues for any style guide violations.\n- **Available Values**: `airbnb`, `google` and `standard`\n\n  - `airbnb` - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)\n  - `google` - [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)\n  - `standard` - [Standard JavaScript Style Guide](https://github.com/standard/standard)\n\n- **Default Value**: None\n- **Example**:\n\n```toml\nstyle_guide = "airbnb"\n```\n',
          metadata: "https://deepsource.io/docs/analyzer/javascript#meta",
        },
        {
          text: '### Configuration without `meta`\n\n```toml\nversion = 1\n\ntest_patterns = ["*/test/**"]\n\nexclude_patterns = [\n    "public/**,",\n    "dist/**"\n]\n\n[[analyzers]]\nname = "javascript"\nenabled = true\n```\n\nIf you use JavaScript Frameworks like `React`, `Angular` or `Vue`, we recommend you add meta fields to fine-tune the analyzer',
          metadata:
            "https://deepsource.io/docs/analyzer/javascript#configuration-without-meta",
        },
        {
          text: '### Configuration with `meta`\n\n```toml\nversion = 1\n\ntest_patterns = ["*/test/**"]\n\nexclude_patterns = [\n    "public/**,",\n    "dist/**"\n]\n\n[[analyzers]]\nname = "javascript"\nenabled = true\n\n  [analyzers.meta]\n  plugins = ["react"]\n  module_system = "es-modules"\n  environment = [\n    "jquery",\n    "mongo"\n  ]\n  dialect = "flow"\n```',
          metadata:
            "https://deepsource.io/docs/analyzer/javascript#configuration-with-meta",
        },
        {
          text: "## ESLint Rules & Plugins\n\nThe DeepSource JavaScript analyzer fully supports all the ESLint core JavaScript rules. Along with that, it currently supports the following ESLint plugins:\n\n- **Node**\n  - [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)\n- **TypeScript**\n  - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)\n- **React**\n  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)\n  - [@babel/eslint-plugin](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)\n- **Vue**\n  - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)\n- **Flow**\n  - [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)\n- **Ember**\n  - [eslint-plugin-ember](https://github.com/ember-cli/eslint-plugin-ember)\n- **Meteor**\n  - [eslint-plugin-meteor](https://github.com/dferber90/eslint-plugin-meteor)\n- **Angular**\n  - [@angular-eslint/eslint-plugin](https://github.com/angular-eslint/angular-eslint)\n  - [@angular-eslint/eslint-plugin-template](https://github.com/angular-eslint/angular-eslint/tree/master/packages/eslint-plugin-template)\n- **AngularJS**\n  - [eslint-plugin-angular](https://github.com/EmmanuelDemey/eslint-plugin-angular)\n- **Security**\n  - [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)",
          metadata:
            "https://deepsource.io/docs/analyzer/javascript#eslint-rules--plugins",
        },
        {
          text: "## Dependency Calculation\n\nDeepSource uses `package-lock.json` and `yarn.lock` to calculate direct and indirect dependencies. We don't update any of the lock files.\n\nIf you have a lock file and zero (`0`) direct and indirect dependencies are reported, it may be because of the following reasons:\n\n- You have not installed `peerDependencies` correctly.\n- You are using a private node package.",
          metadata:
            "https://deepsource.io/docs/analyzer/javascript#dependency-calculation",
        },
        {
          text: "## Configuration - `.deepsource.toml`\n\nThis section covers configuration specific to the `python` analyzer. Please make sure to read the general [configuration guide](/setup-analysis#what-is-deepsourcetoml) first.",
          metadata:
            "https://deepsource.io/docs/analyzer/python#configuration---deepsourcetoml",
        },
        {
          text: '### `name`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: mandatory\n- **Description**: Shortcode of the analyzer.\n- **Example**:\n```toml\nname = "python"\n```',
          metadata: "https://deepsource.io/docs/analyzer/python#name",
        },
        {
          text: "### `enabled`\n\n- **Type**: [Boolean](https://github.com/toml-lang/toml#boolean)\n- **Presence**: mandatory\n- **Description**: Toggle whether this analyzer should be run.\n- **Example**:\n```toml\nenabled = true\n```",
          metadata: "https://deepsource.io/docs/analyzer/python#enabled",
        },
        {
          text: '### `dependency_file_paths`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: List of files that contain the list of external dependencies relative to the repository\'s root.\n- **Example**:\n```toml\ndependency_file_paths = [\n  "dev_requirements.txt",\n  "prod_requirements.txt"\n]\n```\n\n<alert>\n\nBy default, the following are automatically detected and scanned for\ndependencies, if found in the repository\'s root:\n- `Pipfile`\n- `Pipfile.lock`\n- `poetry.lock`\n- `pyproject.toml` (if containing a `[tool.poetry]` or `[tool.flit]` section)\n- `requirements.txt`\n- `setup.py`\n\nIf your package manager produces a lock file, specify both the requirements file and the lock file here.\n\n</alert>',
          metadata:
            "https://deepsource.io/docs/analyzer/python#dependency_file_paths",
        },
        {
          text: '### `meta`\n\n- **Type**: [Table](https://github.com/toml-lang/toml#table)\n- **Presence**: optional\n- **Description**: Any supported metadata to pass to the analyzer.\n- **Example**:\n```toml\n[analyzers.meta]\n  runtime_version = "3.x.x"\n  max_line_length = 88\n  skip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `runtime_version`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Runtime version of your language in [semver](https://semver.org/).\n- **Available Values**: "2.x.x", "3.x.x"\n- **Default Value**: "3.x.x"\n- **Example**:\n```toml\nruntime_version = "3.x.x"\n```\n\n#### `max_line_length`\n\n- **Type**: [Integer](https://github.com/toml-lang/toml#integer)\n- **Presence**: optional\n- **Description**: Maximum allowed line length (including documentation).\n- **Available Value**: Any integer value greater than or equal to `79`\n- **Default Value**:`88`\n- **Example**:\n```toml\nmax_line_length = 88\n```\n\n#### `skip_doc_coverage`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Specify which artifacts to skip when calculating documentation coverage.\n- **Available Values**: `module`, `magic`, `init` and `class`\n\n  - `module` - Ignore module docstrings\n  - `magic` - Ignore docstrings of magic methods (except "__init__")\n  - `init` - Ignore docstrings of "__init__" methods\n  - `class` - Ignore docstrings of class definitions\n  - `nonpublic` - Ignore docstrings for non-public classes and methods\n- **Default Value**: ["module", "magic", "init"]\n- **Example**:\n```toml\nskip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `type_checker`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Activates the type checking analyzer. Please note: This will only raise type annotation issues.\n- **Available Value**: "mypy"\n- **Default Value**: None\n- **Example**:\n```toml\ntype_checker = "mypy"\n```\n\n#### `additional_builtins`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Additional built-ins added by the user or third-party modules.\n- **Available Value**: An array with additional built-in names.\n- **Default Value**: None\n- **Example**:\n```toml\nadditional_builtins = ["_", "pretty_output"]\n```',
          metadata: "https://deepsource.io/docs/analyzer/python#meta",
        },
        {
          text: '## Sample config\n\n```toml\nversion = 1\n\ntest_patterns = [\n  "tests/**",\n  "test_*.py"\n]\n\nexclude_patterns = [\n  "migrations/**",\n  "**/examples/**"\n]\n\n[[analyzers]]\nname = "python"\nenabled = true\ndependency_file_paths = ["requirements/development.txt"]\n\n  [analyzers.meta]\n  runtime_version = "3.x.x"\n  type_checker = "mypy"\n  max_line_length = 88\n  skip_doc_coverage = ["module", "magic", "init"]\n  additional_builtins = ["_", "pretty_output"]\n```',
          metadata: "https://deepsource.io/docs/analyzer/python#sample-config",
        },
      ],
    };
  },
  computed: {
    currentDoc: function () {
      return this.documents[this.documentId];
    },
    renderMd: function () {
      return marked(this.currentDoc.text);
    },
  },
};
</script>