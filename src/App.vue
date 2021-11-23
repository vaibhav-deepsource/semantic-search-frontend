<template>
  <div class="flex flex-col items-center justify-around p-4">
    <div class="w-max-128">
      <b-field label="Search docs">
        <b-input placeholder="Search..." type="search" v-model="searchQuery" />
        <b-button
          class="ml-2"
          type="is-link is-light"
          @click="search"
          :loading="loading"
          >Search</b-button
        >
      </b-field>

      <div v-if="results" class="flex flex-col space-y-6">
        <card
          v-for="item in results"
          :key="item.document"
          :documentId="item.document"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
export default {
  name: "App",
  components: {
    Card,
  },
  data() {
    return {
      searchQuery: "",
      results: [],
      loading: false,
    };
  },
  methods: {
    async search() {
      this.loading = true;
      const d = {
        documents: [
          "The JavaScript Analyzer analyzes your JavaScript, TypeScript, Angular, Meteor, Ember, and Vue files and raises issues if they dont follow the best practices and methods for building efficient JavaScript Applications.",
          "## Configuration - `.deepsource.toml`\n\nThis section covers configuration specific to the `javascript` analyzer. Please make sure to read the general [configuration guide](/setup-analysis#what-is-deepsourcetoml) first.",
          '### `name`\n\n- **Type**: [String](https://toml.io/en/v1.0.0#string)\n- **Presence**: mandatory\n- **Description**: Shortcode of the analyzer.\n- **Example**:\n\n```toml\nname = "javascript"\n```',
          "### `enabled`\n\n- **Type**: [Boolean](https://toml.io/en/v1.0.0#boolean)\n- **Presence**: mandatory\n- **Description**: Toggle whether this analyzer should be run.\n- **Example**:\n\n```toml\nenabled = true\n```",
          '### `meta`\n\n- **Type**: [Table](https://toml.io/en/v1.0.0#table)\n- **Presence**: optional\n- **Description**: Any supported metadata to pass to the analyzer.\n- **Example**:\n\n```toml\n[analyzers.meta]\n  plugins = ["react"]\n  environment = ["mongo","jquery"]\n  module_system = "es-modules"\n  dialect = "flow"\n```\n\n#### `plugins`\n\n- **Type**: [Array](https://toml.io/en/v1.0.0#array)\n- **Presence**: optional\n- **Description**: The JavaScript Frameworks being used in the project. Currently, we support [React](https://reactjs.org/),[Vue](https://vuejs.org/), [EmberJS](https://emberjs.com/), [Meteor](https://www.meteor.com/), [Angular](https://angular.io/) and [AngularJS](https://angularjs.org/).\n- **Available Values**: `react`, `vue`, `ember`, `meteor`, `angular` and `angularjs`\n- **Default Value**: None\n- **Example**:\n\n```toml\nplugins = ["react"]\n```\n\n<>',
          '### Configuration without `meta`\n\n```toml\nversion = 1\n\ntest_patterns = ["*/test/**"]\n\nexclude_patterns = [\n    "public/**,",\n    "dist/**"\n]\n\n[[analyzers]]\nname = "javascript"\nenabled = true\n```\n\nIf you use JavaScript Frameworks like `React`, `Angular` or `Vue`, we recommend you add meta fields to fine-tune the analyzer',
          '### Configuration with `meta`\n\n```toml\nversion = 1\n\ntest_patterns = ["*/test/**"]\n\nexclude_patterns = [\n    "public/**,",\n    "dist/**"\n]\n\n[[analyzers]]\nname = "javascript"\nenabled = true\n\n  [analyzers.meta]\n  plugins = ["react"]\n  module_system = "es-modules"\n  environment = [\n    "jquery",\n    "mongo"\n  ]\n  dialect = "flow"\n```',
          "## Dependency Calculation\n\nDeepSource uses `package-lock.json` and `yarn.lock` to calculate direct and indirect dependencies. We dont update any of the lock files.\n\nIf you have a lock file and zero (`0`) direct and indirect dependencies are reported, it may be because of the following reasons:\n\n- You have not installed `peerDependencies` correctly.\n- You are using a private node package.",
          "## Configuration - `.deepsource.toml`\n\nThis section covers configuration specific to the `python` analyzer. Please make sure to read the general [configuration guide](/setup-analysis#what-is-deepsourcetoml) first.",
          '### `name`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: mandatory\n- **Description**: Shortcode of the analyzer.\n- **Example**:\n```toml\nname = "python"\n```',
          "### `enabled`\n\n- **Type**: [Boolean](https://github.com/toml-lang/toml#boolean)\n- **Presence**: mandatory\n- **Description**: Toggle whether this analyzer should be run.\n- **Example**:\n```toml\nenabled = true\n```",
          '### `dependency_file_paths`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: List of files that contain the list of external dependencies relative to the repositorys root.\n- **Example**:\n```toml\ndependency_file_paths = [\n  "dev_requirements.txt",\n  "prod_requirements.txt"\n]\n```\n\n<alert>\n\nBy default, the following are automatically detected and scanned for\ndependencies, if found in the repositorys root:\n- `Pipfile`\n- `Pipfile.lock`\n- `poetry.lock`\n- `pyproject.toml` (if containing a `[tool.poetry]` or `[tool.flit]` section)\n- `requirements.txt`\n- `setup.py`\n\nIf your package manager produces a lock file, specify both the requirements file and the lock file here.\n\n</alert>',
          '### `meta`\n\n- **Type**: [Table](https://github.com/toml-lang/toml#table)\n- **Presence**: optional\n- **Description**: Any supported metadata to pass to the analyzer.\n- **Example**:\n```toml\n[analyzers.meta]\n  runtime_version = "3.x.x"\n  max_line_length = 88\n  skip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `runtime_version`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Runtime version of your language in [semver](https://semver.org/).\n- **Available Values**: "2.x.x", "3.x.x"\n- **Default Value**: "3.x.x"\n- **Example**:\n```toml\nruntime_version = "3.x.x"\n```\n\n#### `max_line_length`\n\n- **Type**: [Integer](https://github.com/toml-lang/toml#integer)\n- **Presence**: optional\n- **Description**: Maximum allowed line length (including documentation).\n- **Available Value**: Any integer value greater than or equal to `79`\n- **Default Value**:`88`\n- **Example**:\n```toml\nmax_line_length = 88\n```\n\n#### `skip_doc_coverage`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Specify which artifacts to skip when calculating documentation coverage.\n- **Available Values**: `module`, `magic`, `init` and `class`\n\n  - `module` - Ignore module docstrings\n  - `magic` - Ignore docstrings of magic methods (except "__init__")\n  - `init` - Ignore docstrings of "__init__" methods\n  - `class` - Ignore docstrings of class definitions\n  - `nonpublic` - Ignore docstrings for non-public classes and methods\n- **Default Value**: ["module", "magic", "init"]\n- **Example**:\n```toml\nskip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `type_checker`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Activates the type checking analyzer. Please note: This will only raise type annotation issues.\n- **Available Value**: "mypy"\n- **Default Value**: None\n- **Example**:\n```toml\ntype_checker = "mypy"\n```\n\n#### `additional_builtins`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Additional built-ins added by the user or third-party modules.\n- **Available Value**: An array with additional built-in names.\n- **Default Value**: None\n- **Example**:\n```toml\nadditional_builtins = ["_", "pretty_output"]\n```',
          "## Configuration - `.deepsource.toml`\n\nThis section covers configuration specific to the `python` analyzer. Please make sure to read the general [configuration guide](/setup-analysis#what-is-deepsourcetoml) first.",
          '### `name`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: mandatory\n- **Description**: Shortcode of the analyzer.\n- **Example**:\n```toml\nname = "python"\n```',
          "### `enabled`\n\n- **Type**: [Boolean](https://github.com/toml-lang/toml#boolean)\n- **Presence**: mandatory\n- **Description**: Toggle whether this analyzer should be run.\n- **Example**:\n```toml\nenabled = true\n```",
          '### `dependency_file_paths`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: List of files that contain the list of external dependencies relative to the repository\'s root.\n- **Example**:\n```toml\ndependency_file_paths = [\n  "dev_requirements.txt",\n  "prod_requirements.txt"\n]\n```\n\n<alert>\n\nBy default, the following are automatically detected and scanned for\ndependencies, if found in the repository\'s root:\n- `Pipfile`\n- `Pipfile.lock`\n- `poetry.lock`\n- `pyproject.toml` (if containing a `[tool.poetry]` or `[tool.flit]` section)\n- `requirements.txt`\n- `setup.py`\n\nIf your package manager produces a lock file, specify both the requirements file and the lock file here.\n\n</alert>',
          '### `meta`\n\n- **Type**: [Table](https://github.com/toml-lang/toml#table)\n- **Presence**: optional\n- **Description**: Any supported metadata to pass to the analyzer.\n- **Example**:\n```toml\n[analyzers.meta]\n  runtime_version = "3.x.x"\n  max_line_length = 88\n  skip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `runtime_version`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Runtime version of your language in [semver](https://semver.org/).\n- **Available Values**: "2.x.x", "3.x.x"\n- **Default Value**: "3.x.x"\n- **Example**:\n```toml\nruntime_version = "3.x.x"\n```\n\n#### `max_line_length`\n\n- **Type**: [Integer](https://github.com/toml-lang/toml#integer)\n- **Presence**: optional\n- **Description**: Maximum allowed line length (including documentation).\n- **Available Value**: Any integer value greater than or equal to `79`\n- **Default Value**:`88`\n- **Example**:\n```toml\nmax_line_length = 88\n```\n\n#### `skip_doc_coverage`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Specify which artifacts to skip when calculating documentation coverage.\n- **Available Values**: `module`, `magic`, `init` and `class`\n\n  - `module` - Ignore module docstrings\n  - `magic` - Ignore docstrings of magic methods (except "__init__")\n  - `init` - Ignore docstrings of "__init__" methods\n  - `class` - Ignore docstrings of class definitions\n  - `nonpublic` - Ignore docstrings for non-public classes and methods\n- **Default Value**: ["module", "magic", "init"]\n- **Example**:\n```toml\nskip_doc_coverage = ["module", "magic", "init"]\n```\n\n#### `type_checker`\n\n- **Type**: [String](https://github.com/toml-lang/toml#string)\n- **Presence**: optional\n- **Description**: Activates the type checking analyzer. Please note: This will only raise type annotation issues.\n- **Available Value**: "mypy"\n- **Default Value**: None\n- **Example**:\n```toml\ntype_checker = "mypy"\n```\n\n#### `additional_builtins`\n\n- **Type**: [Array](https://github.com/toml-lang/toml#array)\n- **Presence**: optional\n- **Description**: Additional built-ins added by the user or third-party modules.\n- **Available Value**: An array with additional built-in names.\n- **Default Value**: None\n- **Example**:\n```toml\nadditional_builtins = ["_", "pretty_output"]\n```',
          '## Sample config\n\n```toml\nversion = 1\n\ntest_patterns = [\n  "tests/**",\n  "test_*.py"\n]\n\nexclude_patterns = [\n  "migrations/**",\n  "**/examples/**"\n]\n\n[[analyzers]]\nname = "python"\nenabled = true\ndependency_file_paths = ["requirements/development.txt"]\n\n  [analyzers.meta]\n  runtime_version = "3.x.x"\n  type_checker = "mypy"\n  max_line_length = 88\n  skip_doc_coverage = ["module", "magic", "init"]\n  additional_builtins = ["_", "pretty_output"]\n```',
        ],
        query: this.searchQuery,
      };
      const apiKey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/ada/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(d),
          }
        );
        const data = await response.json();
        this.results = await data.data.sort((a, b) =>
          a.score < b.score ? 1 : -1
        );
        console.log(this.results);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>