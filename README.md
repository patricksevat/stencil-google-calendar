![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Stencil Google Calendar Webcomponent

This is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that displays your Google Calendar events.

This Web Component is built using [StencilJS](https://stenciljs.com/).

# Usage

```html5
<zijderoute-calendar
  service-account-email="{YOUR_GOOGLE_SERVICE_ACCOUNT_EMAIL_ADRESS}"
  calendar-id="{YOUR_GOOGLE_CALENDAR_EMAIL_ADRESS}"
  token-sign-url="{YOUR_BACK_END_URL}"
  include-public-events=""
/>
```

`token-sign-url` defaults to http://localhost:3000 which is used by the `npm run start-server` example
`include-public-events` defaults to `''` which means false. Please by advised that `"false"` will evaluate to true

### service-account-email

Unfortunately, it is not possible to just simply enter your email adress to access your calendar events.

In order to access your calendar events you must set up a [Google Service Account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount). 
This might seem as a hassle at first sight, but if you have ever used a Google API Key (for Maps or any other Google service), it is actually pretty easy.

Once you created a service account be sure to copy the email adress and save the JSON file with your private key.

*Note:* You do **not** need to generate an API key for Google Calendar.

### calendar-id

The `calendar-id` is the (Google) email address whose calendar you'd like to access.

In order to actually access the calendar events you need to [share your calendar with your `service-account-email`](https://support.google.com/calendar/answer/37082?hl=en).

### token-sign-url

This is your back-end route which generates a signed RS-256 [JWT](https://jwt.io/) using your `service-account`'s private key.

A very simple examples to do this using NodeJS and Express can be found under `/server`. Here you can also find the schema the JWT payload has to adhere to.

*NOTE: Please add your own `/server/secrets.json` containing your "PRIVATE_KEY" if you'd like to use this example*

*NOTE: When adding your `/server/secrets.json` PRIVATE_KEY please do not remove any '\n' from the string*

### Adding this component to your project

### Script tag

TODO replace link
- Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-component --save`
- Put a script tag similar to this `<script src='node_modules/my-component/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

# Development

`yarn install`

`npm run start-server`

(in a different terminal) `npm start`

See [stencil-component-starter/readme.md](https://github.com/ionic-team/stencil-component-starter) for more documentation such as generating a new production build.

