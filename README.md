# react-layers-stack

![react-layers-stack](https://circleci.com/gh/DAB0mB/react-layers-stack.svg)

A React library for managing view layers using a stack data-structure. The library exposes easy and intuitive methods such as pop() and push() to manage the state of the stack. The unique factor of this library is that it's simple and light weight. It also uses [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to manage transitions between layers, which makes it fast, and familiar. react-layers-stack is battle tested and is used by [LeO](https://www.meetleo.com/) regularly - a company that builds an AI based chat bot for the insurance industry. Here's a hamburger that is made 100% out of react-layers-stack:

<p align="center">
  <img src="https://user-images.githubusercontent.com/7648874/94342277-b7ee6080-0018-11eb-9344-3cbe5bedcfdc.gif">
</p>

### Differences with react-navigation

While [react-navigation](https://reactnavigation.org/) is a great alternative, and definitely a more mature one, react-layers-stack differs in the following aspects:

- It's much liner, there's no 6 types of possible navigators, there's no theming system, there's no router, there's no actions, there's no localization system, and there's no history management. Just a stack, which is purely about transitioning between layers.
- Built on the premise of React hooks from the ground up. There's only a single way to achieve things, and that's only with React hooks.
- Uses [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to manage transitions; it's fast, and familiar.
- There's only 1 NPM package built for a very specific purpose as opposed to a whole multi-purpose mono-repo.
- Very minimalistic and light weight - only 15kb for the entire bundle without any dependencies!

### What can react-layers-stack be used for

Modals, tabs, side menus, popovers, popups, dropdowns, notifications; These are all layer based components that would normally be installed using a dedicated NPM package, but because react-layers-stack provides such a great infrastructure we can implement them quick. This way we can save ourselves the overhead and customize the components exactly to our needs. Additionally, the library is extremely handy for building PWAs ([Progressive Web Apps](https://web.dev/progressive-web-apps/)).

### Limitations

This library is currently only available for the web, and since it uses Web Animations API it's recommended to load a [polyfill](https://github.com/web-animations/web-animations-js) for comparability reasons with older browsers. This library is also very new and may have some missing features. Please, don't hesitate and open a ticket in the [issues](https://github.com/DAB0mB/react-layers-stack/issues) section if you encounter one, and I will address it as soon as I can.

### Example

This repo contains an example React app that can be initialized using `yarn example` and then run using `yarn example start`.

### Installation

react-layers-stack is available in the NPM registry and can be installed using `npm` or `yarn`:

    yarn add react-layers-stack

### Docs

#### Stack

This is the main stack container that will define the boundaries for our layers and provide them with the necessary context. A React element of this component type HAS to be created if we want to use react-layers-stack and its React hooks. Initialization is as simple as the following:

```js
import { Stack } from 'react-layers-stack';

const MyApp = () => {
    return (
        <Stack />
    );
};
```

By providing a render function as children, you can also define a fixed layout that will keep displaying on top of layers, e.g. a header of a navigation bar:

```js
import { Stack } from 'react-layers-stack';

const MyApp = () => {
    return (
        <Stack>
            {stack => (
                <Fragment>
                  <Header />
                  {stack}
                </Fragment>
            )}
        </Stack>
    );
};
```

Internally, the render function is used as the body of a separate component, which means that react-layers-stack hooks can also be used:

```js
import { Stack, usePopLayer } from 'react-layers-stack';

const MyApp = () => {
    return (
        <Stack>
            {stack => {
                // More info about available hooks further in the docs section
                const popLayer = usePopLayer();

                const handleBackClick = useCallback(() => {
                    popLayer();
                }, [popLayer]);

                return (
                    <Fragment>
                      <NavBar onBackClick={handleBackClick} />
                      {stack}
                    </Fragment>
                );
            }}
        </Stack>
    );
};
```

You can also initialize a Stack with a predefined layers state like the following:

```js
import { Stack, createLayer } from 'react-layers-stack';

const MyApp = () => {
    const [layers, setLayers] = useState([
        createLayer(
            <HomePage />
        );
    ]);

    return (
        <Stack layersState={[layers, setLayers]} />
    );
};
```

#### usePushLayer()

This hook will initialize a callback that will push a new layer on top of the stack once invoked. The function accepts the following parameters:

- **children** - The React children that we would like to render.
- **config** - A config with the following fields:
    + **keyframes** - An array of Web Animations keyframes. The array will directly be forwarded to the native element.animate() method as the first argument. See [reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).
    + **timing** - The animation options that will directly be forwarded to the native element.animate() method as the second argument. See [reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).
    + **mask** - Each layer is created with a mask underneath it to prevent events from accidentally bubbling to the parent elements. The mask CSS properties can be modified by providing this config option, so we can change its background or its opacity. By default the opacity will be transitioned from 0 to .5 if non was specified.

Here's an example:

```js
import { usePushLayer } from 'react-layers-stack';

const usePushMyLayer = () => {
    const pushLayer = usePushLayer();

    return useCallback(() => {
        return (
            <MyLayer />
        , {
            keyframes: [
              { left: '-100%' },
              { left: '0' },
            ],
            timing: {
                duration: 500,
            },
            overlay: {
                background: '#000',
            },
        })
    }, [pushLayer]);
};
```

#### usePopLayer()

This hook will initialize a callback that will pop the most recent layer from the top of the stack. The layer will be popped with the the same transition that was used once it got pushed, only in reverse. The pop transition can be overridden by providing a config, similar to the one in pushPushLayer().

#### useWillFocusListener()

This hook will invoke the specified listener when a target layer is about to be on top of the stack, and transition to it as about to start. The hook accepts a callback and an array of input, just like useCallback().

#### useDidFocusListener()

This hook will invoke the specified listener when a target layer is on top of the stack, after its transition has finished and the previous layer got disposed. The hook accepts a callback and an array of input, just like useCallback().

#### useWillBlurListener()

This hook will invoke the specified listener when the target layer, which is currently on top, is about to be replaced with a new layer; transition is about to start. The hook accepts a callback and an array of input, just like useCallback().

#### useDidBlurListener()

This hook will invoke the specified listener when the target layer is just about to be replaced by another layer on top of the stack; transition was indeed finished. The hook accepts a callback and an array of input, just like useCallback().

### License

MIT
