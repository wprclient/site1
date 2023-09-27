const settings = {
  "name": "generatepress-pro",
  "state": {
    "frontity": {
      "url": "https://beebom.com/",
      "title": "WP with React Demo",
      "description": "WP with React Demo Website"
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [],
          "featured": {
            "showOnList": true,
            "showOnPost": false
          }
        }
      }
    }, 
    {
      "name": "@frontity/wp-source",
      "state": { 
        "source": {
          "url": "https://beebom.com/",
          "params": {
            "per_page": 9,
            "type": ["post", "page"],
          },
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/head-tags",
    "@frontity/wp-comments",
    "@frontity/yoast",
    {
      name: "@frontity/google-analytics",
      state: {
        googleAnalytics: {
          // trackingId: "UA-311655314",
        },
      },
    },
    {
      name: "@frontity/google-tag-manager-analytics",
      state: {
        googleTagManagerAnalytics: {
          // containerId: "G-D44D3408K9",
        },
      },


    }
    // ,
    // {
    //   name: "frontity-microsoft-clarity",
    //   state: {
    //     microsoftClarity: {
    //       // trackingCode: "emc50vc0un"
    //     }
    //   }
    // }
  ]
};

export default settings;
