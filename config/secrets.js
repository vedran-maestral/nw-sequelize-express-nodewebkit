/**
 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" API keys and passwords so
 * that all features could work out of the box.
 *
 * Use config vars (environment variables) below for production API keys
 * and passwords. Each PaaS (e.g. Heroku, Nodejitsu, OpenShift, Azure) has a way
 * for you to set it up from the dashboard.
 *
 * Another added benefit of this approach is that you can use two different
 * sets of keys for local development and production mode without making any
 * changes to the code.

 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 */

module.exports = {
  desktop: true,
  PORT: 9000,
  db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',
  runtime: "mssql", //"sqlite" or "mssql",
  onlineLocation: "http://localhost:9000", //only used for desktop version navigation
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },
  sqlite: {
      db : 'db/database'
  },
   msSQL : {
     user: '',
     password: '',
     server: '', // You can use 'localhost\\instance' to connect to named instance
     database: 'yourdatabasahere',
     stream: false, // You can enable streaming globally
     options: {
       encrypt: false // Use this if you're on Windows Azure
     }
   },
  mandrill: {
    user: process.env.MANDRILL_USER || '',
    password: process.env.MANDRILL_PASSWORD || ''
  },
  sendgrid: {
    user: process.env.SENDGRID_USER || '',
    password: process.env.SENDGRID_PASSWORD || ''
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '',
    clientSecret: process.env.FACEBOOK_SECRET || '',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },
  api: {
    port: '',
    root: 'http://localhost'
  }
};
