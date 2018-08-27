/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as morgan from 'morgan'; 
   
// Import Controllers from controllers entry point
import {WelcomeController} from './controllers';
import {ScrapeUrlController} from './controllers';
import {ScrapeController} from './controllers';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = process.env.PORT || 3000;

// Mount the WelcomeController at the /welcome route
app.use('/welcome', WelcomeController);
app.use('/api/scrapeurl', ScrapeUrlController);
app.use('/api/scrape', ScrapeController);

console.log("server!");

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});