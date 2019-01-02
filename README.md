# Chirper Project

This repo is a code-along with the first project in the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

Most of the commits in this repository correspond to videos in the program.

## Project Setup

* clone the Project - `git@github.com:udacity/reactnd-chirper-app.git`
* install the dependencies - `npm install`

## Contributing

Because this is a code-along project and the commits correspond to specific videos in the program, we will not be accepting pull requests.

If you feel like there's a major problem, please open an issue to discuss the problem and potential resolution.

## License

MIT

## Depencencies

To use action and reducers we need to install `redux`dependency and `react-redux` to provide the store to the application

```
yarn add react-redux redux
```
## About React - Redux

Redux applications have a single store. We have to pass the Root Reducer to our ```createStore()``` function in order for the store to know what pieces of state it should have. The point of creating a store is to allow components to be able to access it without having to pass the data down through multiple components.

The ```Provider``` component (which comes from the react-redux package) makes it possible for all components to access the store via the ```connect()``` function.

### Middleware

```
yarn add redux-thunk
```

#### Thunk middleware

Here’s our middleware wiring:
```js
export default applyMiddleware(
  thunk,
  logger
);
```
Each thing returned by an action creator - be it an action or a function - will go through our thunk middleware. This is the source code for the thunk middleware:

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```
If the thunk middleware sees an action, that action will be sent to the next middleware in line - the logger middleware. If it sees a function, the thunk middleware will call that function. That function can contain side effects - such as API calls - and dispatch actions, simple Javascript objects. These dispatched actions will again go to all of the middleware. The thunk middleware will see that it’s a simple action and pass the action on to the next middleware, the logger.

## Components

In order to get access to ```dispatch```we need to connect our app component:

```jsx
import { connect } from 'react-redux';

...

export default connect()(App)
```

Using the ```connect()``` function upgrades a component to a container. Containers can read state from the store and dispatch actions. Read more about our ability to customize our container’s relationship with the store in the ```react-redux``` API documentation. Make sure to go through the excellent examples that are provided in the linked documentation to gain a deeper understanding of Redux.

### Connect

The signature of the connect function looks like this:

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

```mapStateToProps``` - If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

> The signature of the mapStateToProps function is ```mapStateToProps(state, [ownProps])```
- `state` is the state inside the store
- `ownProps` are the properties that have been passed to this component from a parent component

> the ```mapStateToProps``` function be called too whenever the component receives new props.

```mapDispatchToProps``` - If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)

## BrowserRouter Component

yarn add react-router-dom

```BrowserRouter``` listens for changes in the URL and makes sure that the correct screen shows up when the URL changes.

Doing this:
```
<BrowserRouter>
   <App />
</BrowserRouter>
```
will allow us to

- use the other components browser-router-dom comes with inside of our app
- listen to the URL so that whenever the url changes, the routing components will be notified of the change

### Link Component

```
<Link to="/about">About</Link>
```

Users navigate through React apps with the help of the Link Component.

The Link component talks to the BrowserRouter and tells it to update the URL. By passing a to property to the Link component, you tell your app which path to route to.

What if you wanted to pass state to the new route? Instead of passing a string to Links to prop, you can pass it an object like this:

```
<Link to={{
 pathname: '/courses',
 search: '?sort=name',
 hash: '#the-hash',
 state: { fromDashboard: true }
}}>
 Courses
</Link>
```