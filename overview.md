# Project Structure Overview
```
devops-work-item-template-provider
|   overview.md
|   package-lock.json
|   package.json
|   readme.md
|   tsconfig.json
|   azure-devops-extension.json
|   webpack.config.js
|   webpack.prod.config.js
|--src
    |   modules
    |   shared
```

## Details
|Path|Description|Link|
|-|-|-|
|overview.md|This file, an overview of the project.||
|package-lock.json|The package-lock. json is a lockfile that holds information on the dependencies or packages installed for a node. js project, including their exact version numbers.|https://www.knowledgehut.com/blog/web-development/package-json-vs-package-lock-json|
|package.json|The package. json file contains descriptive and functional metadata about a project, such as a name, version, and dependencies. The file provides the npm package manager with various information to help identify the project and handle dependencies.|https://phoenixnap.com/kb/package-json|
|readme.md|Reamde file deployed with application||
|tsconfig.json|The tsconfig.json file specifies the root files and the compiler options required to compile the project.||
|azure-devops-extension.json|Extension manifest file: Every extension has a JSON manifest file that defines basic information about the extension. The file also defines how it can extend and enhance the experience.|https://learn.microsoft.com/en-us/azure/devops/extend/develop/manifest?view=azure-devops|
|webpack.config.js|Webpack configuration file, controls how the project is compilled.|https://webpack.js.org/guides/getting-started/|
|webpack.prod.config.js|Webpack configuration file for a production build, controls how the project is compilled. Note this is currently not used.|https://webpack.js.org/guides/getting-started/|
|images|Contains images copied to the output directory||
|src/modules|Contains any number of segregated extension contributions (components). Each directory should contain a .html, .js and .json file|
|src/shared|TS files shared by 1 or more components|

# Developing Pre-Requisites
1. Run `npm install` on initial clone 

# Developing
1. Run `npm run build:dev` to compile
2. Run `npm run package:dev` to create a package which can be pushed to marketplace
3. Run `npm run dev` to dev (but VSS does not work, visual inspection only)
4. Push changes to the publisher connection: https://marketplace.visualstudio.com/manage/publishers/codeboost
5. Immediately view the changes on a user story in the devops space

# Useful Reading
|Description|Link|
|-|-|
|General get started link|https://learn.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops|
|Custom control get started link|https://learn.microsoft.com/en-us/azure/devops/extend/develop/custom-control?view=azure-devops|
|Sample repository|https://github.com/microsoft/vsts-extension-samples|
|Possible extension points|https://learn.microsoft.com/en-us/azure/devops/extend/reference/targets/overview?view=azure-devops|
|Link types when linking one task to another|https://learn.microsoft.com/en-us/azure/devops/boards/queries/link-type-reference?view=azure-devops|
|Newer Azure SDK|https://github.com/Microsoft/azure-devops-extension-sdk|
|Newer Azure SDK documentation|https://developer.microsoft.com/en-us/azure-devops/|
|Newer Azure Sample|https://github.com/microsoft/azure-devops-extension-sample|