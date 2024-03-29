import { splitProps } from "solid-js";

export default function SortDescending(props) {
    const [local, rest] = splitProps(props, ["children"]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" {...rest}>
            <path
                fill-rule="evenodd"
                d="M0 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75z"
            ></path>
            <path d="M13.5 10h2.25a.25.25 0 01.177.427l-3 3a.25.25 0 01-.354 0l-3-3A.25.25 0 019.75 10H12V3.75a.75.75 0 011.5 0V10z"></path>
            {local.children}
        </svg>
    );
}