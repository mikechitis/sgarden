import { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

import useGlobalState from "../use-global-state.js";

const BookmarkToggle = ({ pageId }) => {
	const bookmarks = useGlobalState((state) => state.bookmarks);
	const toggleBookmark = useGlobalState((state) => state.toggleBookmark);
	
	const isBookmarked = bookmarks.includes(pageId);

	return (
		<>
			<Tooltip title={isBookmarked ? "Remove bookmark" : "Bookmark this page"}>
				<IconButton
					onClick={() => toggleBookmark(pageId)}
					data-testid={`bookmark-toggle-${pageId}`}
					size="medium"
					sx={{
						color: isBookmarked ? "secondary.main" : "action.disabled",
						"&:hover": {
							color: "secondary.main",
						},
					}}
				>
					{isBookmarked ? <Star /> : <StarBorder />}
				</IconButton>
			</Tooltip>
			{isBookmarked && (
				<span
					data-testid={`bookmark-active-${pageId}`}
					style={{ display: "none", position: "absolute", opacity: 0, pointerEvents: "none" }}
				/>
			)}
		</>
	);
};

export default memo(BookmarkToggle);
