1. What is the difference between Component and PureComponent? give an example where it might break my app.

Difference is that `Component` doesn't implements `shouldComponentUpdate` method but `PureComponent` implements this method by shallow comparison algorithm. If nothing was changed, `PureComponent` will not rerender. But we can lost last state when changes were in deep nested values. Or we can loose all advantages of `PureComponents` by using render props, when we declare function inside of render method. All nested components should also be `PureComponents` because `shouldComponentUpdate` will skip props update for all newsted components

```typescriptreact
class A extends PureComponent {
  {...}
  render() {
    return (
      // it will be not checked by shallo comparison algorithm
      <span>{this.props.so.deeply.nested.value}</span>
    )
  }
}

class B extends Component {
  {...}
  render() {
    return (
      <div>
        // it will be new function on every render
        <A renderProp={value => (
          <span>{value</span>
        )}/>
      </div>
    );
  }
}
```

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because `shouldComponentUpdate` checks only props and state but context value changes will trigger rerender anyway.

3. Describe 3 ways to pass information from a component to its PARENT.

- Define a callback which can change data in a parent, then send this callback to a child, using props or context
- Using refs and changing ref.current in a child component
- Use a state manager and connect parent and child to the same store or just use a shared global state

4. Give 2 ways to prevent components from re-rendering.

Use PureComponent/React.memo or implement shouldComponentUpdate

5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are syntax that allows to return multiple elements from component without wrapping them in an extra DOM element. Fragments may break application layout and when we get an unexpected amount of child components. Fragments also should be used with `key` attribute when they are in array. Many developers forget about it.

```typescriptreact
const fruits = ['apples', 'oranges', 'bananas'];
function A() {
  return fruits.map((fruit) => (
    <Fragment key={fruit}>
      <span>tasty</span>
      <span>{fruit}</span>
    </Fragment>
  ))
}
```

6. Give 3 examples of the HOC pattern.

- withStyles from material ui
- withTheme from styled-components
- withLogger

```typescriptreact
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

7. what's the difference in handling exceptions in promises, callbacks and async...await.

- `catch` function is used to handle exceptions in promises
- `try {..} catch(e) {...}` block is used to handle exceptions in async functions
- first error callback used to handle exceptions in callbacks

```javascript
const fn = new Promise(() => {...});

fn.then(() => {...}).catch({...})
```

```javascript
const fn = async function() {...};

try {
  const value = await fn()
} catch(e) {...}
```

```javascript
function fn(argument, callback) {
  if (typeof argument !== 'numnber') {
    callback('wrong type of argument')
  }

  const result = number * number;
  callback(, result);
}

function callback(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
};
```

8. How many arguments does setState take and why is it async.

`setState` takes 2 arguments: update function and callback. `setState` is async because React batches state updates, and then makes a single update for several components at once.

9. List the steps needed to migrate a Class to Function Component.

- Replace class signature to function
- Replace `PureComponents` with `memo()`
- Replace constructor state initialization with useState hook
- Replace lifecycle methods with `useEffect` hook(s)
- Replace methods with functions wrapped in `useCallback`
- Make the body of `render()` method to be the body of your functional component

10. List a few ways styles can be used with components.

- inline styles
- css
- css in js
- css modules

11. How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML` attribute, or using a 3rd party HTML parser:

`<span dangerouslySetInnerHTML={{ __html: "<b>some text</b>" }} />`
