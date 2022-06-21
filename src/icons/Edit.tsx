import { splitProps } from "solid-js";

export default function Edit(props) {
    const [local, rest] = splitProps(props, ["children"]);

    return (
        <svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			width="16"
			height="16"
			{...rest}
		>
			<path
				fill-rule="evenodd"
				d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
			></path>
            {local.children}
		</svg>
	);
}