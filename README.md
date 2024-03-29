# CERN SIS Author Guide ⚡️

<h2 align="center">
  <img src="https://github.com/cern-sis/cern-authors-guide/blob/master/examples/example.gif" alt="CERN SIS Author Guide" width="600px" />
  <br>
</h2>

## Deploy

Deployment is happening automatically when a commit is pushed on `master` branch.

To view it live, **[click here](https://scientific-info.cern/cern-author-guide)**

---

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites 📋

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer.\
Also you need to have installed [Gatsby CLI](https://www.gatsbyjs.org/docs/quick-start/)

```
node@v16.16.0 or higher
npm@8.18.0 or higher
gatsby-cli@2.8.22 or higher
```

Also, you can use [Yarn](https://yarnpkg.com/) instead of NPM ☝️

```
yarn@v1.21.1 or higher
```

---

## How To Use 🔧

From your command line, first clone the repo:

```bash
# Clone this repository
$ git clone https://github.com/cern-sis/cern-authors-guide

# Go into the repository
$ cd cern-authors-guide

```

Then you can install the dependencies either using NPM or Yarn:

Using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run develop
```

Using Yarn:

```bash
# Install dependencies
$ yarn

# Start development server
$ yarn develop
```

**NOTE**:
If your run into issues installing the dependencies with NPM, use this command:

```bash
# Install dependencies with all permissions
$ sudo npm install --unsafe-perm=true --allow-root
```

Once your server has started, go to this url `http://localhost:8000/` and you will see the website running on a Development Server:

<h2 align="center">
  <img src="https://github.com/cern-sis/cern-authors-guide/blob/master/examples/example.png" alt="CERN SIS Author Guide" width="100%">
</h2>

---

## Instructions:

### Step 1 - STRUCTURE

Go to `/src/mock/data.js` and fill your information, they are 5 objects:

### Hero Section

```javascript
export const heroData = {
  title: '', // Hello, my name is
  name: '', // John
  subtitle: '', // I'm the Unknown Developer.
  cta: '', // Know more
};
```

### About Section

**_Important Note_**: All the images must live inside the `src/images/` folder in order for Gatsby to show the images correctly.

```javascript
export const aboutData = {
  img: 'profile.jpg', // put your profile image (recommended aspect radio: square)
  paragraphOne: '',
  paragraphTwo: '',
  paragraphThree: '',
  resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};
```

### Projects Section

**_Important Note_**: All the images must live inside the `src/images/` folder in order for Gatsby to show the images correctly.

Put as many projects object you want inside the `array`.

```javascript
export const projectsData = [
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cern-sis/cern-authors-guide', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cern-sis/cern-authors-guide', // if no repo, the button will not show up
  },
  ...
];
```

### Contact Section

```javascript
export const contactData = {
  cta: '', // call to action text for the contact section
  btn: '', // text inside the button
  email: '',
};
```

### Footer Section

You can remove or add as many you social-media icons you want.\
Just put an object with the corresponding values inside the networks `array` or remove it from there.

```javascript
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: '', // your twitter url
    },
    {
      id: nanoid(),
      name: 'codepen',
      url: '', // your codepen url
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: '', // your linkedin url
    },
    {
      id: nanoid(),
      name: 'github',
      url: '', // your github url
    },
  ],
};
```

### Required - Disable GitHub buttons

Set `isEnabled` to `false` once you finish setup your portfolio.\
By setting to `false` it will hide the GitHub stars/fork buttons

```javascript
export const githubButtons = {
  isEnabled: true, // true is the default value
};
```

### Step 2 - STYLES

Change the color theme of the website ( choose 2 colors to create a gradient ):

Go to `src/styles/abstracts/_variables.scss` and only change the values on this classes `$main-color` and `$secondary-color` to your prefered HEX color

```scss
// Default values
$main-color: #02aab0;
$secondary-color: #00cdac;
```

**_Note_**: I highly recommend to checkout gradients variations on [UI Gradient](https://uigradients.com/#BrightVault)

---

## Deployment 📦

Once you have done with your setup. You need to put your website online!

I highly recommend to use [Netlify](https://netlify.com) to achieve this on the EASIEST WAY

Or you can use Github pages

## Technologies used 🛠️

- [Gatsby](https://www.gatsbyjs.org/) - Static Site Generator
- [GraphQL](https://graphql.org/) - Query language for APIs
- [React](https://es.reactjs.org/) - Front-End JavaScript library
- [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Front-End UI library
- [Sass](https://sass-lang.com/documentation) - CSS extension language

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 🎁

The website is based on the [Gatsby Simplefolio](https://github.com/cobidev/gatsby-simplefolio) project template
