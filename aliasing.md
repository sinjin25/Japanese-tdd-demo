We're using aliasing for this project. So we have the following in place:

package.json
    + Added react-app-rewired and react-app-rewire-alias
    + Changed scripts to point to react-app-rewired instead of react
+ config-overrides.js
    - Used by react-app-rewired to resolve custom aliases for React
+ js-config.json
    - Used to resolve the paths for custom alises for VSC

Aliases:
    - @/* points to src/
    - @@/* points to src/components