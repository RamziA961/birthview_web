### This directory hosts custom React hooks that can be used in different components with shared functionality.


If you are not familiar with React hooks, please refer to the [documentation](https://react.dev/reference/react).


###### Development / Debugging Notes.
- In dev mode (i.e. before building/transpiling), some hooks will fire twice when they should only fire once. This is the result of components rendering twice in dev mode when React is in strict mode (see [link](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode)).
