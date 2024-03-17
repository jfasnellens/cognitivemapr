<!--This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
It is distributed under the GPL 3.0 open source license.-->

<template lang="pug">
//- The scrollbar/thumb position can't be relative
//- to the scroll wrapper, because they will scroll with the wrapper
//- Their relative to the .positionWrapper
.positionWrapper
  .scrollWrapper(ref='wrapper', @scroll='onScroll')
    .scrollBarYTrack(v-if='yOverFlow')
      .scrollBarYThumb(ref='yThumb', @mousedown='onDownY')
    .scrollBarXTrack(v-if='xOverFlow')
      .scrollBarXThumb(ref='xThumb', @mousedown='onDownX')
    slot
</template>

<script setup lang="ts">
const props = defineProps({
  direction: { type: String, default: 'both' },
  // can have values "vertical", "horizontal" or "both"
});

const top = ref<number | HTMLElement | undefined>(0);
const topOffset = () => {
  if (typeof top.value === 'number') return top.value;
  if (top.value === undefined) return 0;
  return (top.value as HTMLElement).offsetHeight;
};

// coördinates of mouse click
// used to offset the thumb movement
const Y = ref(0);
const X = ref(0);

// store if the the scrollbars should be displayed
const yOverFlow = ref(false);
const xOverFlow = ref(false);

// a fixed amount of pixels
const minThumbLength = ref(60);
// store the thumb length as a percentage of the wrapper's dimensions
const yThumbLength = ref(1);
const xThumbLength = ref(1);
const yMinLength = ref(1);
const xMinLength = ref(1);

const wrapper = ref<HTMLElement>();
const yThumb = ref<HTMLElement>();
const xThumb = ref<HTMLElement>();

const wrapperHeight = ref<number>(1);
const scrollHeight = ref<number>(1);
const wrapperWidth = ref<number>(1);
const scrollWidth = ref<number>(1);

defineExpose({ top, xOverFlow, yOverFlow, onChange });

//= =================================================================
// Ratio functions
//= =================================================================

/**
 * @returns - How fast the wrapper should scroll in the Y direction
 */
function yRatio() {
  if (yThumbLength.value > yMinLength.value) return 1 / yThumbLength.value;
  else {
    return (
      (scrollHeight.value - topOffset() - (wrapperHeight.value - topOffset())) /
      (wrapperHeight.value - topOffset() - minThumbLength.value)
    );
  }
}
/**
 * @returns - How fast the wrapper should scroll in the X direction
 */
function xRatio() {
  if (xThumbLength.value > xMinLength.value) return 1 / xThumbLength.value;
  else {
    return (scrollWidth.value - wrapperWidth.value) / (wrapperWidth.value - minThumbLength.value);
  }
}

/**
 * Is called after every update
 * Calculates and assignes a new height/width value to the thumbs
 */
function calcThumbLengths() {
  if (wrapper.value !== undefined) {
    if (yThumb.value !== undefined) {
      const yVisible = wrapperHeight.value - topOffset();
      const yFull = scrollHeight.value - topOffset();

      yThumbLength.value = yVisible / yFull;
      yMinLength.value = minThumbLength.value / yVisible;

      yThumb.value.style.height = 100 * Math.max(yThumbLength.value, yMinLength.value) + '%';
    }

    if (xThumb.value !== undefined) {
      xThumbLength.value = wrapperWidth.value / scrollWidth.value;
      xMinLength.value = minThumbLength.value / wrapperWidth.value;

      xThumb.value.style.width = 100 * Math.max(xThumbLength.value, xMinLength.value) + '%';
    }
  }
}

/**
 * called when the wrapper is scrolled and on update
 * Updates the position of the thumbs
 */
function onScroll() {
  if (wrapper.value !== undefined) {
    // The wrapper scrolls a distance multiplied by a ratio based on thumb size
    // The thumb must follow the mouse, so the ratio is devided from the calculated distance
    if (yThumb.value !== undefined) {
      const newThumbY = wrapper.value.scrollTop / (wrapperHeight.value - topOffset());
      const ratio = yRatio();

      if (ratio !== undefined) yThumb.value.style.top = (100 * newThumbY) / ratio + '%';
    }

    if (xThumb.value !== undefined) {
      const newThumbX = wrapper.value.scrollLeft / wrapperWidth.value;
      const ratio = xRatio();

      if (ratio !== undefined) xThumb.value.style.left = (100 * newThumbX) / ratio + '%';
    }
  }
}

//= =================================================================
// onDown functions
//= =================================================================

// Starts listening to the 'mousemove' and 'mouseup' when a thumb is clicked
// The Y or X ref are assigned the point clicked
// pointerEvents is set to 'none', this is used by the onMove functions
/**
 * @param e - used to record clicked Y position
 */
function onDownY(e: MouseEvent) {
  e.preventDefault();
  addEventListener('mousemove', onMoveY);
  addEventListener('mouseup', onUpY);

  if (yThumb.value !== undefined) {
    Y.value = Math.abs(yThumb.value.offsetTop - e.clientY);
    yThumb.value.style.pointerEvents = 'none';
  }
}
/**
 * @param e - used to record clicked X position
 */
function onDownX(e: MouseEvent) {
  e.preventDefault();
  addEventListener('mousemove', onMoveX);
  addEventListener('mouseup', onUpX);

  if (xThumb.value !== undefined) {
    X.value = Math.abs(xThumb.value.offsetLeft - e.clientX);
    xThumb.value.style.pointerEvents = 'none';
  }
}
//= =================================================================
// onMove functions
//= =================================================================

/**
 * When the mouse is held down and moved,
 * calculates new top/left value for the wrapper
 * value is multiplied by a ratio based on the size of the relevant thumb
 * calling scrollTo triggers the onScroll function above
 * @param e - used to get the client Y position
 */
function onMoveY(e: MouseEvent) {
  if (
    wrapper.value !== undefined &&
    yThumb.value !== undefined &&
    yThumb.value.style.pointerEvents === 'none'
  ) {
    const ratio = yRatio();
    if (ratio !== undefined) {
      const toScrollTo = (e.clientY - Y.value) * ratio;

      wrapper.value.scrollTo({
        top: toScrollTo,
        behavior: 'instant',
      });
    }
  }
}
/**
 * @param e - used to get the client X position
 */
function onMoveX(e: MouseEvent) {
  if (
    wrapper.value !== undefined &&
    xThumb.value !== undefined &&
    xThumb.value.style.pointerEvents === 'none'
  ) {
    const ratio = xRatio();
    if (ratio !== undefined) {
      const toScrollTo = (e.clientX - X.value) * ratio;

      wrapper.value.scrollTo({
        left: toScrollTo,
        behavior: 'instant',
      });
    }
  }
}

//= =================================================================
// onUp functions
//= =================================================================

/**
 * removes the eventListeners and resets the pointerEvents back to 'initial'
 */
function onUpY() {
  removeEventListener('mousemove', onMoveY);
  removeEventListener('mouseup', onUpY);

  if (yThumb.value !== undefined) yThumb.value.style.pointerEvents = 'initial';
}

/**
 * removes the eventListeners and resets the pointerEvents back to 'initial'
 */
function onUpX() {
  removeEventListener('mousemove', onMoveX);
  removeEventListener('mouseup', onUpX);

  if (xThumb.value !== undefined) xThumb.value.style.pointerEvents = 'initial';
}

//= =================================================================
// update/initialize functions
//= =================================================================

/**
 * is called when mounted, updated and on window resize
 * checks if there is overflow
 * updates the scroll thumb size and position
 */
function onChange() {
  wrapperHeight.value = wrapper.value ? wrapper.value.offsetHeight : 1;
  scrollHeight.value = wrapper.value ? wrapper.value.scrollHeight : 1;
  wrapperWidth.value = wrapper.value ? wrapper.value.offsetWidth : 1;
  scrollWidth.value = wrapper.value ? wrapper.value.scrollWidth : 1;

  if (xThumb.value === null) xThumb.value = undefined;
  if (yThumb.value === null) yThumb.value = undefined;

  if (wrapper.value !== undefined) {
    if (props.direction === 'horizontal' || props.direction === 'both') {
      wrapper.value.style.overflowX = 'scroll';
      xOverFlow.value = wrapperWidth.value < scrollWidth.value;
    }
    if (props.direction === 'vertical' || props.direction === 'both') {
      wrapper.value.style.overflowY = 'scroll';
      yOverFlow.value = wrapperHeight.value < scrollHeight.value;
    }
  }

  calcThumbLengths();
  onScroll();
}

onMounted(() => {
  onChange();
  window.addEventListener('resize', onChange);
});
onUnmounted(() => {
  window.removeEventListener('resize', onChange);
});
onUpdated(() => onChange());
</script>

<style lang="scss">
.positionWrapper {
  position: relative;

  width: 100%;
  height: 100%;
}
.scrollWrapper {
  max-width: 100%;
  max-height: 100%;

  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  overflow: hidden;
}
.scrollWrapper::-webkit-scrollbar {
  display: none;
}

.scrollBarYTrack,
.scrollBarXTrack {
  position: absolute;
  background-color: transparent;
  z-index: 1;
}
.scrollBarYTrack {
  width: 0.5em;
  right: -0.5em;
}
.scrollBarXTrack {
  height: 0.5em;
  bottom: -0.5em;
}

.scrollBarYThumb,
.scrollBarXThumb {
  position: absolute;

  background-color: var(--dflt-nav-color);
  border: 1px solid var(--dflt-bor2-color);
}
.scrollBarYThumb {
  width: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.scrollBarYThumb:hover {
  background-color: var(--dflt-hvr-color);
}
.scrollBarYThumb:active {
  background-color: var(--dflt-act-color);
}

.scrollBarXThumb {
  height: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.scrollBarXThumb:hover {
  background-color: var(--dflt-hvr-color);
}
.scrollBarXThumb:active {
  background-color: var(--dflt-act-color);
}

.scrollBarYTrack,
.scrollBarYThumb {
  top: v-bind('topOffset() + "px"');
  bottom: 0;
}

.scrollBarXTrack,
.scrollBarXThumb {
  right: 0;
  left: 0;
}
</style>
