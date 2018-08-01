/* app/controllers/welcome.controller.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
import { ScrapeUrl } from './../models/scrapeUrl';
import { ScrapeUrlEx } from './../scrapeUrlEx';
const fs =  require('fs');

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome

router.get('/', (req: Request, res: Response) => {
    res.send('scrape urls');
});

router.get('/list', (req: Request, res: Response) => {
    res.send(ScrapeUrlEx.GetScrapeUrls());
});

router.get('/generate', (req: Request, res: Response) => {
    const urls = ScrapeUrlEx.GenerateScrapeUrls();
    res.send(urls);
});

router.get('/create', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    const urls = ScrapeUrlEx.GenerateScrapeUrls();
    ScrapeUrlEx.SaveScrapeUrls(urls)
    res.send(urls);
});

router.get('/update', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('scrapeurl update');
});

router.get('/update/:from', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('scrapeurl update from');
});

router.get('/delete', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('scrapeurl delete');
});

router.get('/:mm', (req: Request, res: Response) => {
        // Extract the name from the request parameters
    let { mm } = req.params;

    // Greet the given name
    res.send(`Hello, ${mm}`);
});

// Export the express.Router() instance to be used by server.ts
export const ScrapeUrlController: Router = router;