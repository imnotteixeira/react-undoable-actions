
import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
fetchMock.dontMock();

// Popper.js workaround
global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
    },
});
