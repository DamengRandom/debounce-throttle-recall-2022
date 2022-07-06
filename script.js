const input = document.querySelector("input");

const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
});

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

function debounce(cb, delay = 1000) {
  // we want to query or search the unput text after 1 or few seconds, that what debounce does
  let timeout;
  return (...args) => {
    clearTimeout(timeout); // clear timeout every time inout changes !!!!
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// simple version of throttle
// function throttle(cb, delay = 1000) {
//   let shouldWait = false;
//   return (...args) => {
//     if (shouldWait) return;

//     cb(...args);

//     shouldWait = true;

//     setTimeout(() => {
//       shouldWait = false;
//     }, delay);
//   };
// }

// difference between throttle and debounce is throttle run the function immediately instead of a time delay
// its like call function immediately at begining, then call function after 1 or few seconds until reach the end of process (eg: user finishes the input)

// complex version more advanced (with the last input user made !!)
function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);

      waitingArgs = null;

      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);

    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

// debounce: code run callback function after delay
// throttle: code run callback function immediately at begining, and then run callback function again after delay is over

// debounce use case: make a search from database
// throttle use case: resizing, mouse movement tracking and etc

// check with script2.js code see throttle mouse movement tracking example
