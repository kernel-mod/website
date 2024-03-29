
import { splitProps } from "solid-js";

export default function TriangleDown(props) {
    const [local, rest] = splitProps(props, ["children"]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" {...rest}>
            <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
            {local.children}
        </svg>
    );
}