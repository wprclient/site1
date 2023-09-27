import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { fetch } from "frontity";
const newHandler = {
  name: "categoryOrPostType",
  priority: 19,
  pattern: "/(.*)?/:slug",
  func: async ({ route, params, state, libraries }) => {
    // 1. try with category.
    try {
      if (route.includes("/author/")) {
        const author = libraries.source.handlers.find(
          handler => handler.name == "author"
        );
        await author.func({ route, params, state, libraries });
      } else {
        const category = libraries.source.handlers.find(
          handler => handler.name == "category"
        );
        await category.func({ route, params, state, libraries });
      }
    } catch (e) {
      // It's not a category
      const postType = libraries.source.handlers.find(
        handler => handler.name == "post type"
      );

      await postType.func({ link: route, params, state, libraries });
    }
  }
};
const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      searchshow: false,
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: true,
        showOnPost: true,
      },
      client_id:null,
      slots:[]
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      searchtoggle: ({ state }) => {
        state.theme.searchshow = !state.theme.searchshow;
      },
      closesearchtoggle: ({ state }) => {
        state.theme.searchshow = false;
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      menuApi: ({ state }) => {
        fetch(`${state.source.url}/wp-json/wp-api-menus/v2/menus/3`)
          .then(response => response.text())
          .then(result => {
            var newdata = JSON.parse(result);
            state.theme.menu = newdata;
          })
          .catch(error => console.log('error', error)); 
      },
      afterCSR: ({ state }) => {
        fetch("https://newwd.demobw.com/webapi/api/common/api")
          .then(response => response.text())
          .then(result => {
            var data = JSON.parse(result)
            state.theme.slots = data.data.slots;
            state.theme.client_id = data.data.client_id;
          })
          .catch(error => console.log('error', error));
      }
    },
  },
  libraries: {
    source: {
      handlers: [newHandler]
    },
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
  },
};

export default marsTheme;
