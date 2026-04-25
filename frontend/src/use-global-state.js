import { create } from "zustand";
import { persist } from "zustand/middleware";

export default create(persist(
	(setState, getState) => ({
		user: {},
		setUser: (user) => setState({ user }),
		defaultPageSize: 5,
		setDefaultPageSize: (defaultPageSize) => setState({ defaultPageSize }),
		darkMode: false,
		setDarkMode: (darkMode) => setState({ darkMode }),
		bookmarks: [],
		toggleBookmark: (pageId) => {
			const { bookmarks } = getState();
			const isBookmarked = bookmarks.includes(pageId);
			if (isBookmarked) {
				setState({ bookmarks: bookmarks.filter((id) => id !== pageId) });
			} else {
				setState({ bookmarks: [...bookmarks, pageId] });
			}
		},
	}),
	{
		name: "sgarden",
	},
));
